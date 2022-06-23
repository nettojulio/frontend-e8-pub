import toast from '../toast/index';
import useGlobalContext from './useGlobalContext';

function useRequests() {
  const { token } = useGlobalContext();

  async function get(route, port, size, page) {
    try {
      const response = await fetch(`http://localhost:${port}/${route}?size=${size}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }
      return data;
    } catch (error) {
      toast.messageError(error.message);
    }
  }

  async function getOne(route, id, port) {
    try {
      const response = await fetch(`http://localhost:${port}/${route}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error) {
      toast.messageError(error.message);
    }
  }

  async function post(route, body, withToken, port) {
    const config = withToken
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
    try {
      const response = await fetch(`http://localhost:${port}/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error) {
      toast.messageError(error.message);
    }
  }

  async function del(route, id, port) {
    try {
      const response = await fetch(`http://localhost:${port}/${route}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error) {
      toast.messageError(error.message);
    }
  }

  async function put(route, body, id, port) {
    try {
      const response = await fetch(`http://localhost:${port}/${route}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error) {
      toast.messageError(error.message);
    }
  }

  return {
    get,
    getOne,
    post,
    del,
    put,
  };
}

export default useRequests;
