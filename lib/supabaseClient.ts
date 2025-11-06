// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cmgupruzbxsvnubwhjgr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZ3VwcnV6Ynhzdm51YndoamdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTUxODcsImV4cCI6MjA3Nzc3MTE4N30.eDmVCVxwekreAN2zsIm0CX7M_Q_sQ7VTQMLxfnU1MhU"
)


//export const supabase = createClient(
//  process.env.NEXT_PUBLIC_SUPABASE_URL!,
//  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//);
