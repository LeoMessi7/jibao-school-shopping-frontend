


import axiosInstance from "../index.js"

const axios = axiosInstance

export function adminLogin(email, password){
  const map = {email:email, password: password}
  return axios({
    method: 'POST',
    url: '/administrator/login',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
