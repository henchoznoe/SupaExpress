import type { User } from '@supabase/supabase-js';
import 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
