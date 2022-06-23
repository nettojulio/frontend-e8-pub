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

    const { nome, email, telefone, cpf, dataNascimento } = currentUser;
    setForm({
      name: nome,
      email: email,
      phone: telefone,
      cpf: cpf,
      dataNascimento: dataNascimento,
    });

    //eslint-disable-next-line
  }, [openModalAdd, currentUser]);

  const handleChange = (target) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const addUser = async (body) => {
    return await requests.post(`${process.env.REACT_APP_USERS_API_URL}`,'usuarios', body, true, '8082');
  };

  const editUser = async (body) => {
    return await requests.put(`${process.env.REACT_APP_USERS_API_URL}`,'usuarios', body, currentUser.id, '8082');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      return;
    }

    const response = currentUser ? await editUser(form) : await addUser(form);

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
            id='email'
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
            id='dataNascimento'
            placeholder='Data de nascimento'
            value={form.dataNascimento}
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
