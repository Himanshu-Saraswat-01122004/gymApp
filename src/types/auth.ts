import { AdapterUser } from 'next-auth/adapters'

export interface AuthUser extends AdapterUser {
  role: 'USER' | 'TRAINER'
}
