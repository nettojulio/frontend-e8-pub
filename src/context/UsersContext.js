import { createContext } from 'react';
import useUsersProvider from '../hooks/useUsersProvider';

const UsersContext = createContext({});

export function UsersProvider(props) {
  const usersProvider = useUsersProvider();

  return (
    <UsersContext.Provider value={usersProvider}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersContext;
