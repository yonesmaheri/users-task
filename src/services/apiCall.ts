import axios from "axios";


const apiCall = axios.create({
  baseURL:'https://reqres.in/api',
  headers:{
    'x-api-key':'reqres-free-v1'
  }
})

export default apiCall;