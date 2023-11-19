import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

import { initTRPC } from '@trpc/server';
import { UserService } from '../user/service';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
