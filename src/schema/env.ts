import { z } from "zod";

export const Env = z.object({
  EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(10)
});

export const env = Env.parse(process.env);
