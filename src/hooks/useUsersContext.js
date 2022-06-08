import { useContext } from 'react';
import UsersContext from '../context/UsersContext';

const useUsersContext = () => {
  return useContext(UsersContext);
};

export default useUsersContext;
