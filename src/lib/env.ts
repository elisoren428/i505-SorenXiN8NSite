import {z} from 'zod';

const envSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;
