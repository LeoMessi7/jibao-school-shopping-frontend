
import axiosInstance from "../index.js"

const axios = axiosInstance

export function getShopcart(){
  return axios({
    method: 'POST',
    url: '/goods/getSelection',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}


export function deleteShopcart(){
  return axios({
    method: 'POST',
    url: '/goods/getSelection',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}
