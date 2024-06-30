export type UserType = 'gogo' | 'google' | 'facebook' | 'discord' | 'apple';

export interface UserInterface {
  id: number;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  pfp?: string;
  user_type: UserType;
  access_token?: string;
  refresh_token?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
