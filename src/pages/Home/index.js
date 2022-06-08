import logout from '../../assets/logout.svg';
import ModalAddUser from '../../components/ModalAddUser';
import Table from '../../components/Table';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import toast from '../../toast';
import './styles.css';

const Home = () => {
  const { removeToken, openModalAdd, setOpenModalAdd } = useGlobalContext();
  const { setCurrentUser } = useUsersContext();

  const handleLogout = () => {
    toast.messageSuccess('Até logo!');
    removeToken();
  };
  const handleAddUser = () => {
    setOpenModalAdd(true);
    setCurrentUser(false);
  };

  return (
    <div className='container-home'>
      <header>
        <h1>CADASTRE UM PEDIDO</h1>
        <img onClick={handleLogout} src={logout} alt='log out' />
      </header>
      <div className='container-users'>
        <button onClick={handleAddUser} className='btn-add-user'>
          Adicionar usuário
        </button>
        <Table />
      </div>
      {openModalAdd && <ModalAddUser />}
    </div>
  );
};

export default Home;
