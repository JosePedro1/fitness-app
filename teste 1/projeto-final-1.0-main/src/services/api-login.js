import axios from 'axios';

const API_URL = 'http://localhost:3000';


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true, 
    });

    if (response.status === 200) {
      localStorage.setItem('user_id', response.data.user.user_id);
      localStorage.setItem('email', response.data.user.email);

      console.log('Login bemsucedido');
    }

    return response.data;
  } catch (error) {
    console.error('Erro no logn', error);
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/validate`, {
      withCredentials: true, 
    });

    if (response.status === 200 && response.data.valid) {
      console.log('token valido via cooki');
      return true;
    } else {
      console.log('token invalido');
      return false;
    }
  } catch (error) {
    console.error('erro na validação do token', error);
    return false;
  }
};


export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, null, {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log('logout bemsucedido');
    }
  } catch (error) {
    console.error('erro no logout', error);
  } finally {
    removeAuthToken();
    window.location.href = 'http://localhost:4200/login'; 
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('email');
  console.log('Dados de autenticação removidos.');
};
