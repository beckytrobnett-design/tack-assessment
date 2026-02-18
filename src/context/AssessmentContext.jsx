import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { calculateOrientation } from '../services/scoring';

const STORAGE_KEY = 'tack-assessment';

function loadStored() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Could not load assessment from storage:', e);
  }
  return null;
}

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const [responses, setResponses] = useState(() => {
    const stored = loadStored();
    return stored?.responses ?? [];
  });
  const [results, setResults] = useState(() => {
    const stored = loadStored();
    return stored?.results ?? null;
  });
  const [email, setEmail] = useState(() => {
    const stored = loadStored();
    return stored?.email ?? '';
  });
  const [lastRoute, setLastRoute] = useState(() => {
    const stored = loadStored();
    return stored?.lastRoute ?? null;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (responses.length === 0 && !results) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          responses,
          results,
          email,
          lastRoute: lastRoute || undefined,
        })
      );
    } catch (e) {
      console.warn('Could not save assessment to storage:', e);
    }
  }, [responses, results, email, lastRoute]);

  const setResponse = useCallback((questionIndex, answer) => {
    setResponses((prev) => {
      const next = [...prev];
      next[questionIndex] = answer;
      return next;
    });
  }, []);

  const completeAssessment = useCallback(() => {
    const scoringResult = calculateOrientation(responses);
    setResults(scoringResult);
    return scoringResult;
  }, [responses]);

  const resetAssessment = useCallback(() => {
    setResponses([]);
    setResults(null);
    setEmail('');
    setLastRoute(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }, []);

  const recordRoute = useCallback((path) => {
    setLastRoute(path);
  }, []);

  const value = {
    responses,
    setResponse,
    results,
    completeAssessment,
    resetAssessment,
    email,
    setEmail,
    lastRoute,
    recordRoute,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return ctx;
}
