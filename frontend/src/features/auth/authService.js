import axios from 'axios'

const API_URL = '/api/user/'

// Register User
const register = async (userDate) => {
   const response = await axios.post(API_URL, userDate);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}


// Login User
const login = async (userDate) => {
   const response = await axios.post(API_URL + 'login', userDate);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}


// Logout User
const logout = () => {
   localStorage.removeItem('user');
}


const authService = {
   register,
   login,
   logout
}

export default authService