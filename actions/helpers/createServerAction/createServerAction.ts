import { User } from '@/db/schema';
import { getUser, serverActionDb } from '@/db/supabase';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ZodSchema, z } from 'zod';

export const createServerAction =
  <Schema extends ZodSchema, Params extends unknown[], Return>(
    schema: Schema,
    action: (
      user: User,
      data: z.infer<Schema>,
      ...params: Params
    ) => Promise<Return>,
    { path, tag }: { path?: string; tag?: string } = {},
  ): ((data: z.infer<Schema>, ...params: Params) => Promise<Return>) =>
  async (data, ...params) => {
    const validatedData: z.infer<Schema> = schema.parse(data);
    const user = await getUser(serverActionDb);

    const result = await action(user, validatedData, ...params);

    if (path) {
      revalidatePath(path);
    }

    if (tag) {
      revalidateTag(tag);
    }

    return result;
  };
