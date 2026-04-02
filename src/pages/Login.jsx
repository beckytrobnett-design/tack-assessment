import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError("That email and password combination didn't work. Try again.");
        return;
      }
      navigate('/chat');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-bg flex flex-col items-center justify-center px-6 py-6 md:py-8">
      <div className="max-w-[680px] w-full">
        <Card padding="lg" className="space-y-6">
          <img
            src="https://tack.tondreaupoint.com/logos/logo-stacked-light.png"
            alt=""
            className="w-48 mx-auto mb-8"
          />
          <h1 className="font-display text-h2 font-medium text-sage-dark">
            Welcome back.
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-body font-medium text-sage-dark mb-2">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your email address"
                autoComplete="email"
                className="w-full px-4 py-4 text-body rounded-lg border-2 border-sage-accent-muted focus:border-sage-accent focus:ring-2 focus:ring-sage-accent focus:ring-offset-2 outline-none transition-colors min-h-tap bg-sage-bg-card"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-body font-medium text-sage-dark mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="password"
                autoComplete="current-password"
                className="w-full px-4 py-4 text-body rounded-lg border-2 border-sage-accent-muted focus:border-sage-accent focus:ring-2 focus:ring-sage-accent focus:ring-offset-2 outline-none transition-colors min-h-tap bg-sage-bg-card"
              />
              {error && (
                <p id="login-error" className="mt-2 text-small text-error">
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" fullWidth size="lg" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sage-text-light">
            <Link to="/assessment" className="text-small text-sage-cta hover:underline">
              New here? Start the assessment →
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
