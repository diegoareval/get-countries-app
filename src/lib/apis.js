import Axios from "axios"

const getHeaders = (withAuthorization = false) => {
    const authorization = withAuthorization
      ? {
        Authorization: '',
        }
      : {}
  
    return {
      ...authorization,
      'Content-Type': 'application/json',
    }
  }
  const API_BASE = 'https://restcountries.eu/rest/v2/'
  export const fetchInfo = async (complement = 'all') => {
    return Axios.get(`${API_BASE}${complement}`, {
      headers: getHeaders(),
    })
      .then((response) => {
        if (response.data) {
          return {
            data: response.data,
            status: true
          }
        } else {
          return {
            status:false,
            message:  "could not fetch news",
          }
        }
      })
      .catch((error) => {
          return {
            status:false,
            message:  "could not fetch news",
          }
      })
  }