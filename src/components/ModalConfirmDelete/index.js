import closeIcon from '../../assets/close.svg';
import useUsersContext from '../../hooks/useUsersContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import './styles.css';

const ModalConfirmDelete = () => {
  const { setOpenModalDelete } = useGlobalContext();
  const { currentUser, loadUsersData } = useUsersContext();
  const requests = useRequests();

  const handleDelete = async () => {
    const response = await requests.del('clientes', currentUser.id, '8082');

    if (response) {
      loadUsersData();
      setOpenModalDelete(false);
    }
  };

  return (
    <div className='container-modal-delete'>
      <div className='modal-delete'>
        <img
          onClick={() => setOpenModalDelete(false)}
          className='close'
          src={closeIcon}
          alt='close'
        />
        <h1>Confirmar a exclusão?</h1>
        <h2>{`Deseja excluir o usuário "${currentUser.nome}"?`}</h2>
        <button onClick={handleDelete} className='btn-confirm-delete'>
          Confirmar
        </button>
        <button
          onClick={() => setOpenModalDelete(false)}
          className='btn-cancel-delete'>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
