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
import iconNext from '../../assets/icon-next.png';
import iconPrev from '../../assets/icon-prev.png';


const Table = () => {
  const { setCurrentUser } = useUsersContext();
  const [pagination, setPagination] = useState({ totalPages: '', usersPerPage: 10, currentPage: 1, totalUsers: '', isLast: false, isFirst: true })
  const [users, setUsers] = useState([]);
  const request = useRequests();
  
  const {
    setOpenModalAdd,
    openModalDelete,
    setOpenModalDelete,
    setOpenModalAddOrder,
    openModalAddOrder,
    openModalAdd,
  } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await request.get(`${process.env.REACT_APP_USERS_API_URL}`,'usuarios', '8082', pagination.usersPerPage, pagination.currentPage);
      if (response) {
        setUsers(response.content);

      }
    };
    fetchData();
    //eslint-disable-next-line
  }, [openModalAdd, openModalDelete]);

  const prevPage = () => {
    if (pagination.isFirst) {
      return;
    }
    setPagination({...pagination, currentPage: pagination.currentPage - 1});
    
  }

  const nextPage = () => {
    if (pagination.isLast) {
      return;
    }
    setPagination({...pagination, currentPage: pagination.currentPage + 1});
  }


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
            <div className='pagination-buttons'>
      <button onClick={prevPage}><img src={iconPrev} alt='próxima página' /></button>
      <button onClick={nextPage}><img src={iconNext} alt='página anterior' /></button>
      </div>
    </div>
  );
};

export default Table;
