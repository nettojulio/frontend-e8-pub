import { useState } from 'react';

const useUsersProvider = () => {
  const [currentUser, setCurrentUser] = useState(false);

  return {
    currentUser,
    setCurrentUser,
  };
};

export default useUsersProvider;
