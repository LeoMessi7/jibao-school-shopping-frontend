

import axiosInstance from "../index.js"

const axios = axiosInstance

export function getChat(seller_name){
  const map = {seller_name: seller_name}
  return axios({
    method: 'POST',
    url: '/get/chat',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function saveChat(from, to, content){
  const map = {from_username: from, to_username:to, content: content}
  return axios({
    method: 'POST',
    url: '/add/chat',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

