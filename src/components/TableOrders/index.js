import useRequests from '../../hooks/useRequests';
import './styles.css';
import { useEffect, useState } from 'react';
import iconNext from '../../assets/icon-next.png';
import iconPrev from '../../assets/icon-prev.png';
import { formatToMoney } from "../../utils/utils";

const Table = () => {
  const [orders, setOrders] = useState([]);
  const request = useRequests();
  const [pagination, setPagination] = useState({ totalPages: '', ordersPerPage: 10, currentPage: 1, totalOrders: '', isLast: false, isFirst: true })

  useEffect(() => {
    const fetchData = async () => {
      const ordersResponse = await request.get(`${process.env.REACT_APP_ORDERS_API_URL}`,'pedidos', '8081', pagination.ordersPerPage, pagination.currentPage);
      if (ordersResponse) {
        setOrders(ordersResponse.content);
        setPagination({...pagination, totalPages: ordersResponse.totalPages, totalOrders: ordersResponse.totalElements, isLast: ordersResponse.last, isFirst: ordersResponse.first })
      }
    }
    fetchData();
   
    //eslint-disable-next-line
}, [pagination.currentPage]);

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


  return (
    <>
    <div className='container-table'>
      <div className='table-head'>
        <strong>Nome do Cliente</strong>
        <strong>Valor Total</strong>
        <strong>Data do Pedido</strong>
        <strong>Descrição</strong>
        <strong>Status</strong>
      </div>
      <div className='table-body'>
        {orders && orders.map((item) => (
          <div key={item.id} className='table-line'>
            <span>
              {item.usuarioId}
            </span>
            <span>{formatToMoney(item.valorTotal)}</span>
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
      <div className='pagination-buttons'>
        <button onClick={prevPage}><img src={iconPrev} alt='próxima página' /></button>
        <button onClick={nextPage}><img src={iconNext} alt='página anterior' /></button>
      </div>
    </>
  );                                                                                
};

export default Table;
