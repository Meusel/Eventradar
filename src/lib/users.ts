export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  profileStatus: 'public' | 'private';
};

const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice',
    avatarUrl: 'https://github.com/shadcn.png',
    profileStatus: 'public',
  },
  {
    id: 'user-2',
    name: 'Ben',
    avatarUrl: 'https://github.com/benn.png',
    profileStatus: 'public',
  },
  {
    id: 'user-3',
    name: 'Chris',
    avatarUrl: 'https://github.com/chris.png',
    profileStatus: 'private',
  },
  {
    id: 'user-4',
    name: 'Dana',
    avatarUrl: 'https://github.com/dana.png',
    profileStatus: 'public',
  },
  {
    id: 'user-5',
    name: 'Eva',
    avatarUrl: 'https://github.com/eva.png',
    profileStatus: 'private',
  },
    {
    id: 'user-6',
    name: 'Frank',
    avatarUrl: 'https://github.com/frank.png',
    profileStatus: 'public',
  },
];

export const getUserById = (id: string) => users.find((u) => u.id === id);

export const getUsersByIds = (ids: string[]) => users.filter((u) => ids.includes(u.id));
