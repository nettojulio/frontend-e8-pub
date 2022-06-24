import { useEffect, useState } from 'react';
import closeIcon from '../../assets/close.svg';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import { format, parse } from 'date-fns';
import './styles.css';
import toast from '../../toast';

const ModalAddUser = () => {
  const defaultValues = { nome: '', email: '', telefone: '', dataNascimento: '', cpf: '' };
  const { setOpenModalAdd, openModalAdd } = useGlobalContext();
  const { currentUser } = useUsersContext();
  const requests = useRequests();
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (!currentUser) {
      setForm(defaultValues);
      return;
    }

    const { nome, email, telefone, cpf, dataNascimento } = currentUser;
    setForm({
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      dataNascimento: format(new Date(dataNascimento), 'dd/MM/yyyy')
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

    if (!form.nome || !form.email || !form.telefone) {
      return;
    }
    const formatDataForm = {...form, dataNascimento: parse(form.dataNascimento, 'dd/MM/yyyy', new Date())};
    const response = currentUser ? await editUser(formatDataForm) : await addUser(formatDataForm);
    if (response) {
      toast.messageSuccess('Sucesso!');
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
            id='nome'
            placeholder='Nome'
            value={form.nome}
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
            id='telefone'
            placeholder='Telefone'
            value={form.telefone}
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
