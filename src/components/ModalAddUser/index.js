import { useEffect, useState } from 'react';
import closeIcon from '../../assets/close.svg';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import './styles.css';

const ModalAddUser = () => {
  const defaultValues = { name: '', email: '', phone: '' };
  const { setOpenModalAdd, openModalAdd } = useGlobalContext();
  const { loadUsersData, currentUser } = useUsersContext();
  const requests = useRequests();
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (!currentUser) {
      setForm(defaultValues);
      return;
    }

    const { nome, email, telefone, cpf, data_nascimento } = currentUser;
    setForm({
      name: nome,
      email,
      phone: telefone,
      cpf: cpf,
      data_nascimento: data_nascimento,
    });

    //eslint-disable-next-line
  }, [openModalAdd, currentUser]);

  const handleChange = (target) => {
    setForm({ ...form, [target.id]: target.value });
    console.log(form);
  };

  const addUser = async (body) => {
    return await requests.post('contatos', body, true);
  };

  const editUser = async (body) => {
    return await requests.put('contatos', body, currentUser.id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      return;
    }

    const body = {
      nome: form.name,
      email: form.email,
      telefone: form.phone,
    };

    const response = currentUser ? await editUser(body) : await addUser(body);

    if (response) {
      loadUsersData();
      setOpenModalAdd(false);
    }
  };

  return (
    <div className='container-modal'>
      <div className='modal-insert'>
        <img
          onClick={() => setOpenModalAdd(false)}
          className='close'
          src={closeIcon}
          alt='close modal'
        />
        <h1>{currentUser ? 'Editar usuário' : 'Novo usuário'}</h1>
        <form action='submit'>
          <input
            type='text'
            id='name'
            placeholder='Nome'
            value={form.name}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='cpf'
            placeholder='CPF'
            value={form.cpf}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='phone'
            placeholder='Email'
            value={form.email}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='phone'
            placeholder='Telefone'
            value={form.phone}
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type='text'
            id='data_nascimento'
            placeholder='Data de nascimento'
            value={form.data_nascimento}
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

export default ModalAddUser;
