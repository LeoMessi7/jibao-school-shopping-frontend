
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


export function deleteShopcart(gid){
  const map = {gid: gid}
  console.log(map)
  return axios({
    method: 'POST',
    url: '/goods/deleteSelection',
    headers: {
      'Content-Type': 'application/json'
    },
    params: map
  })
}
