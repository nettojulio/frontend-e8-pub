import editarIcon from '../../assets/lapis.svg';
import deleteIcon from '../../assets/lixeira.svg';
import plusIcon from '../../assets/plus.png';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import ModalConfirmDelete from '../ModalConfirmDelete';
import ModalAddOrder from '../ModalAddOrder';
import ModalAddUser from '../ModalAddUser';
import useRequests from '../../hooks/useRequests';
import './styles.css';
import { useEffect, useState } from 'react';

const Table = () => {
  const { setCurrentUser, currentUser } = useUsersContext();
  const [users, setUsers] = useState([]);
  const request = useRequests();

  useEffect(() => {
    const fetchData = async () => {
      const response = await request.get(process.env.REACT_APP_USERS_API_URL,'usuarios', '8082');
      if (response) {
        setUsers(response.content);

      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const {
    setOpenModalAdd,
    openModalDelete,
    setOpenModalDelete,
    setOpenModalAddOrder,
    openModalAddOrder,
    openModalAdd,
  } = useGlobalContext();

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setOpenModalAdd(true);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setOpenModalDelete(true);
  };

  const handleInsertOrder = (user) => {
    setCurrentUser(user);
    setOpenModalAddOrder(true);
    console.log(currentUser);
  };

  return (
    <div className='container-table'>
      <div className='table-head'>
        <strong>Nome</strong>
        <strong>CPF</strong>
        <strong>Telefone</strong>
        <strong>Email</strong>
        <strong>Data de Nascimento</strong>
      </div>
      <div className='table-body'>
        {users && users.map((item) => (
          <div key={item.id} className='table-line'>
            <span>{item.nome}</span>
            <span>{item.cpf}</span>
            <span>{item.telefone}</span>
            <span>{item.email}</span>
            <span>{new Date(item.dataNascimento).toLocaleDateString()}</span>
            <div className='action-icons'>
              <img
                className='plus-icon'
                onClick={() => handleInsertOrder(item)}
                src={plusIcon}
                alt='cadastrar pedido'
              />
              <img
                onClick={() => handleEditUser(item)}
                src={editarIcon}
                alt='editar usuário'
              />
              <img
                onClick={() => handleDeleteUser(item)}
                src={deleteIcon}
                alt='excluir usuário'
              />
            </div>
          </div>
        ))}
        {openModalAdd && <ModalAddUser />}
        {openModalDelete && <ModalConfirmDelete />}
        {openModalAddOrder && <ModalAddOrder />}
      </div>
    </div>
  );
};

export default Table;
