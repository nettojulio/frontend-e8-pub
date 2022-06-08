import editarIcon from '../../assets/lapis.svg';
import deleteIcon from '../../assets/lixeira.svg';
import plusIcon from '../../assets/plus.png';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import ModalConfirmDelete from '../ModalConfirmDelete';
import './styles.css';

const Table = () => {
  const { users, setCurrentUser } = useUsersContext();
  const { setOpenModalAdd, openModalDelete, setOpenModalDelete } =
    useGlobalContext();

  const usersMock = [
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
    {
      id: 1,
      nome: 'Quezia B',
      cpf: '147258369',
      telefone: '9999-9999',
      email: 'quezia@email.com',
      data_nascimento: '12/12/12',
    },
  ];

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
        {usersMock.map((item) => (
          <div key={item.id} className='table-line'>
            <span>{item.nome}</span>
            <span>{item.cpf}</span>
            <span>{item.telefone}</span>
            <span>{item.email}</span>
            <span>{item.data_nascimento}</span>
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
        {openModalDelete && <ModalConfirmDelete />}
      </div>
    </div>
  );
};

export default Table;
