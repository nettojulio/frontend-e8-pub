import { useState } from 'react';
import { useLocalStorage } from 'react-use';

const useGlobalProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [loading, setLoading] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAddOrder, setOpenModalAddOrder] = useState(false);

  return {
    token,
    setToken,
    removeToken,
    loading,
    setLoading,
    openModalAdd,
    setOpenModalAdd,
    openModalDelete,
    setOpenModalDelete,
    openModalAddOrder,
    setOpenModalAddOrder,
  };
};

export default useGlobalProvider;
