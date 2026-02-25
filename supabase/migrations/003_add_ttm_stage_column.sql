-- Add ttm_stage column to assessment_responses
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query
-- ttmStage values: action, contemplation, maintenance, precontemplation, preparation, builder

ALTER TABLE assessment_responses
ADD COLUMN IF NOT EXISTS ttm_stage TEXT;
