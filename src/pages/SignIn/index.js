import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import './styles.css';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', senha: '' });
  const requests = useRequests();
  const history = useHistory();
  const { token, setToken, loading, setLoading } = useGlobalContext();

  useEffect(() => {
    if (token) {
      history.push('/Home');
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await requests.post('login', form, false, '8080');
    setLoading(false);

    if (response) {
      setToken(response.token);
      history.push('/Home');
    }
  };
  return (
    <>
      <div className='container-login'>
        <div className='login'>
          <span>Bem vindo</span>
          <h1>Faça login como administrador</h1>
          <form onSubmit={handleSubmit} action='submit'>
            <input
              id='email'
              type='text'
              placeholder='E-mail'
              autoComplete='off'
              onChange={(event) => handleChange(event)}
              value={form.email}
            />
            <input
              id='senha'
              type='password'
              placeholder='Senha'
              onChange={(event) => handleChange(event)}
              value={form.senha}
            />
            <button className='btn-login'>LOGIN</button>
          </form>
        </div>
        {loading && (
          <CircularProgress
            style={{
              color: 'green',
              position: 'absolute',
              right: '48%',
              bottom: '25rem',
              opacity: '0.4',
            }}
          />
        )}
        <div className='to-signUp'>
          <span>Não tem cadastro?</span>
          <Link to='/signUp'>Clique aqui!</Link>
        </div>
      </div>
    </>
  );
};
export default SignIn;
