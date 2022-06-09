import useUsersContext from '../../hooks/useUsersContext';
import { usersMock, ordersMock } from '../../mocks';
import useRequests from '../../hooks/useRequests';
import './styles.css';
import { useEffect, useState } from 'react';

const Table = () => {
  const { users } = useUsersContext();
  const [oders, setOrders] = useState([]);
  const request = useRequests();

  useEffect(() => {
    const fetchData = async () => {
      const response = await request.get('pedidos');
      setOrders(response);
    };
    //fetchData();
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
        {ordersMock.map((item) => (
          <div key={item.id} className='table-line'>
            <span>
              {usersMock.filter((user) => user.id === item.usuarioId)[0].nome}
            </span>
            <span>{item.valorTotal}</span>
            <span>{item.dataPedido}</span>
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
