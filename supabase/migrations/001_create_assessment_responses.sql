-- TACK Assessment Responses Table
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query

-- Create table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  primary_orientation TEXT,
  orientation_scores JSONB,
  score_details JSONB
);

-- Enable Row Level Security (RLS)
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

-- With RLS enabled and NO permissive policies, anon and authenticated roles
-- have zero access. Your Vercel API uses SUPABASE_SERVICE_ROLE_KEY, which
-- bypasses RLS entirely (service role has full access). Never expose the
-- service role key to the frontend — it must stay server-side only.

-- Optional: Create index for querying by email or created_at
CREATE INDEX IF NOT EXISTS idx_assessment_responses_email ON assessment_responses(email);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_created_at ON assessment_responses(created_at DESC);
