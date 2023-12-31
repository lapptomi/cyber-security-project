export interface User {
  id: string;
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

export type Credentials = Omit<User, 'id' | 'role'>;

export interface Comment {
  id: string;
  comment: string;
}
