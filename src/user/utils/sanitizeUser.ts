import type { User } from '@prisma/client';

export const sanitizeUser = (
  user: User,
): Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  createdAt: number;
  updatedAt: number;
} => {
  const { createdAt, updatedAt, ...rest } = user;

  delete rest.password;
  const sanitized = {
    ...rest,
    createdAt: createdAt.getTime(),
    updatedAt: updatedAt.getTime(),
  };

  return sanitized;
};
