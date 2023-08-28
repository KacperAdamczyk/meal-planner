import { User } from '@/db/schema';
import { getUser, serverActionDb } from '@/db/supabase';
import { revalidatePath } from 'next/cache';
import { ZodSchema, z } from 'zod';

export const createServerAction =
  <Schema extends ZodSchema, Params extends any[], Return>(
    schema: Schema,
    action: (
      user: User,
      data: z.infer<Schema>,
      ...params: Params
    ) => Promise<Return>,
    path?: string,
  ): ((data: z.infer<Schema>, ...params: Params) => Promise<Return>) =>
  async (data, ...params) => {
    const validatedData = schema.parse(data);
    const user = await getUser(serverActionDb);

    const result = await action(user, validatedData, ...params);

    if (path) {
      revalidatePath(path);
    }

    return result;
  };
