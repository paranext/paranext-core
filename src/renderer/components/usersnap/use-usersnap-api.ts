import { useContext } from 'react';
import { UsersnapContext } from './usersnap-context';

export function useUsersnapApi() {
  return useContext(UsersnapContext);
}
