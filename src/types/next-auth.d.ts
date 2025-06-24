import { DefaultUser } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: 'USER' | 'TRAINER';
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'USER' | 'TRAINER';
  }
}
