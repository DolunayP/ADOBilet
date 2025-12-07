import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://knfikbninazvqgemdigr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZmlrYm5pbmF6dnFnZW1kaWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzMxNDYsImV4cCI6MjA3NzY0OTE0Nn0.7YXFQcNui1hbgzrDJmr4LVOuKMRXUqWj3g5C7AnU3xY";

export default createClient(supabaseUrl, supabaseKey);
