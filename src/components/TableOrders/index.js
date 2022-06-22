import useRequests from '../../hooks/useRequests';
import './styles.css';
import { useEffect, useState } from 'react';

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const request = useRequests();

  useEffect(() => {
    const fetchData = async () => {
      const ordersResponse = await request.get('pedidos', '8081');
      if (ordersResponse) {
        console.log(ordersResponse.content);
        setOrders(ordersResponse.content);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchUsers = async() => {
      const usersResponse = await request.get('usuarios', '8082');
      if (usersResponse) {
        setUsers(usersResponse.content);
      }
    }
    fetchUsers();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='container-table'>
      <div className='table-head'>
        <strong>Nome do Cliente</strong>
        <strong>Valor Total</strong>
        <strong>Data do Pedido</strong>
        <strong>Descrição</strong>
        <strong>Status</strong>
      </div>
      <div className='table-body'>
        {orders.map((item) => (
          <div key={item.id} className='table-line'>
            <span>
              {users.filter((user) => user.id === item.usuarioId)[0].nome}
            </span>
            <span>{item.valorTotal}</span>
            <span>{new Date(item.dataPedido).toLocaleDateString()}</span>
            <span>{item.descricao}</span>
            <span
              className={
                item.status === 'Pendente'
                  ? 'status-pendente'
                  : 'status-concluido'
              }>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
