export const UserType = {
  DOCTOR: 'DOCTOR',
  STAFF: 'STAFF',
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];
