import logout from '../../assets/logout.svg';
import Table from '../../components/TableOrders';
import { Link } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import toast from '../../toast';
import './styles.css';

const Orders = () => {
  const { removeToken } = useGlobalContext();

  const handleLogout = () => {
    toast.messageSuccess('Até logo!');
    removeToken();
  };

  return (
    <div className='container-home'>
      <header>
        <h1>PEDIDOS</h1>
        <img onClick={handleLogout} src={logout} alt='log out' />
      </header>
      <div className='container-users'>
        <Link to={'/home'} className='users-link'>
          {'<<'} voltar para usuários{' '}
        </Link>
        <Table />
      </div>
    </div>
  );
};

export default Orders;
