import { User } from '@/db/schema';
import { getUser, serverActionDb } from '@/db/supabase';
import { ZodSchema, z } from 'zod';

export const createServerAction =
  <Schema extends ZodSchema, Params extends any[], Return>(
    schema: Schema,
    action: (
      user: User,
      data: z.infer<Schema>,
      ...params: Params
    ) => Promise<Return>,
  ): ((data: z.infer<Schema>, ...params: Params) => Promise<Return>) =>
  async (data, ...params) => {
    const validatedData = schema.parse(data);
    const user = await getUser(serverActionDb);

    return action(user, validatedData, ...params);
  };
