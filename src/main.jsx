import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AssessmentProvider } from './context/AssessmentContext';
import { Welcome } from './pages/Welcome';
import { Assessment } from './pages/Assessment';
import EmailCapture from './pages/EmailCapture';
import { Results } from './pages/Results';
import { Privacy } from './pages/Privacy';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
      <AssessmentProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results/email" element={<EmailCapture />} />
          <Route path="/results" element={<Results />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AssessmentProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
