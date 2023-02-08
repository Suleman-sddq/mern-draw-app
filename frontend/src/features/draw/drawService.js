import axios from "axios"

const API_URL = '/api/draw/'


// Add Draw to DB
const addDraw = async (drawData) => {
   const response = await axios.post(API_URL, drawData)

   if (response.data) {
      return response.data
   }
}

// Delete Draw from DB by given id
const deleteDraw = async (goalId) => {
   const response = await axios.delete(API_URL + goalId)

   if (response.data) {
      return response.data
   }
}

// Get All pending draws
const getAllDraws = async () => {
   const response = await axios.get(API_URL);

   if (response.data) {
      return response.data
   }
}

// Get All pending draws
const getAllDrawsList = async () => {
   const response = await axios.get(API_URL + 'getAll');

   if (response.data) {
      return response.data
   }
}


// Get Current Draws
const getCurrent = async () => {
   const response = await axios.get(API_URL + 'getCurrentDraw');

   if (response.data) {
      return response.data
   }
}

//Announce winner
const announce = async (data) => {
   const response = await axios.patch(API_URL + data.id, { drawStatus: data.drawStatus });

   if (response.data) {
      return response.data
   }
}



const drawService = {
   addDraw,
   getAllDraws,
   getAllDrawsList,
   deleteDraw,
   getCurrent,
   announce
}

export default drawService