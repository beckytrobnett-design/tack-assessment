-- Add waitlist column to assessment_responses
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query

ALTER TABLE assessment_responses
ADD COLUMN IF NOT EXISTS waitlist BOOLEAN NOT NULL DEFAULT false;
