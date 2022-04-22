export interface BaseUser {
    id: string;
    name: string;
    accessToken: string | null;
    credentials: {
      username: string;
      password: string;
    }
  }
  
  export interface Administrator extends BaseUser {
    roles: string[];
  }
  
  export interface Ordinary extends BaseUser {
    tasks: string[];
  }
  
  export interface Authentication<T extends BaseUser> {
    signIn(user: T): Promise<T>;
    signOut(user: T): void;
  }