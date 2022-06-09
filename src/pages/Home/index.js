import logout from '../../assets/logout.svg';
import Table from '../../components/TableUsers';
import { Link } from 'react-router-dom';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import toast from '../../toast';
import './styles.css';

const Home = () => {
  const { removeToken, setOpenModalAdd } = useGlobalContext();
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
        <div className='first-section'>
          <button onClick={handleAddUser} className='btn-add-user'>
            Adicionar usuário
          </button>
          <Link to={'/orders'} className='orders-link'>
            Consultar Pedidos {'>>'}{' '}
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default Home;
