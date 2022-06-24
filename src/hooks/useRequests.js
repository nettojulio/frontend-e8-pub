import useGlobalContext from './useGlobalContext';

function useRequests() {
  const { token } = useGlobalContext();

  async function get(url, route, port, size, page) {
    try {
      const response = await fetch(`${url}:${port}/${route}?size=${size}&page=${page}`, {
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
      
    }
  }

  async function getOne(url, route, id, port) {
    try {
      const response = await fetch(`${url}:${port}/${route}/${id}`, {
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
     
    }
  }

  async function post(url, route, body, withToken, port) {
    const config = withToken
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
    try {
      const response = await fetch(`${url}:${port}/${route}`, {
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
      
    }
  }

  async function del(url, route, id, port) {
    try {
      const response = await fetch(`${url}:${port}/${route}/${id}`, {
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
      
    }
  }

  async function put(url, route, body, id, port) {
    try {
      const response = await fetch(`${url}:${port}/${route}/${id}`, {
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
