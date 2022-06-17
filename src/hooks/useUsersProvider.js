import { useEffect, useState } from 'react';
import useGlobalContext from './useGlobalContext';
import useRequests from './useRequests';

const useUsersProvider = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const { token } = useGlobalContext();
  const requests = useRequests();

  useEffect(() => {
    if (token) {
      loadUsersData();
    }
    //eslint-disable-next-line
  }, []);

  const loadUsersData = async () => {
    const response = await requests.get('clientes', '8082');
    setUsers(response);
  };

  return {
    users,
    setUsers,
    loadUsersData,
    currentUser,
    setCurrentUser,
  };
};

export default useUsersProvider;
