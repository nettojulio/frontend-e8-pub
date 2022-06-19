import { useState } from 'react';
import closeIcon from '../../assets/close.svg';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import './styles.css';

const ModalAddOrder = () => {
  const { setOpenModalAddOrder } = useGlobalContext();
  const { currentUser } = useUsersContext();
  const requests = useRequests();

  const [form, setForm] = useState({
    usuarioId: currentUser.id,
    valorTotal: '',
    dataPedido: new Date(),
    descricao: '',
    status: "Pendente",
    usuarioName: currentUser.nome,
    usuarioEmail: currentUser.email
  });

  const handleChange = (target) => {
    setForm({ ...form, [target.id]: target.value });
    console.log(form);
  };

  const addOrder = async (body) => {
    return await requests.post('pedidos', body, true, '8081');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.valorTotal || !form.dataPedido || !form.descricao) {
      return;
    }

    const response = await addOrder({
      ...form,
      valorTotal: Number(form.valorTotal),
    });
    console.log({
      ...form,
      valorTotal: Number(form.valorTotal),
    })
    if (response) {
      setOpenModalAddOrder(false);
    }
  };

  return (
    <div className='container-modal'>
      <div className='modal-insert'>
        <img
          onClick={() => setOpenModalAddOrder(false)}
          className='close'
          src={closeIcon}
          alt='close modal'
        />
        <h1>Cadastrar Pedido</h1>
        <form action='submit'>
          <input
            type='text'
            id='usuarioNome'
            placeholder='Nome do usuário'
            value={currentUser.nome}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='usuarioEmail'
            placeholder='Email'
            value={currentUser.email}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='valorTotal'
            placeholder='Valor Total'
            value={form.valorTotal}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='dataPedido'
            placeholder='Data do pedido'
            value={form.dataPedido}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='descricao'
            placeholder='Descrição'
            value={form.descricao}
            onChange={(e) => handleChange(e.target)}
          />
          <button onClick={handleSubmit} className='btn-add'>
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddOrder;
