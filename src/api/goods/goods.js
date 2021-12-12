/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function searchGoods(key_word){
  const map = {key_word: key_word}
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/goods/search',
    headers: {
      isToken: false
    },
    params: map
  })
}

export function uploadGoods(description, name,sub_category, price, image){
  const map = {description: description, name: name, sub_category: sub_category, price: price, image: image}
  return axios({
    method: 'POST',
    url: 'goods/upload',
    headers: {
      'Content-Type': 'application/json'
    },
    params: map
  })
}

export function modifyGoods(id,description, name,sub_category, price, image){
  const map = {gid:id,description: description, name: name, sub_category: sub_category, price: price, image: image}
  return axios({
    method: 'POST',
    url: 'goods/update',
    headers: {
      'Content-Type': 'application/json'
    },
    params: map
  })
}

export function withdrawGoods(gid){
  const map = {gid: gid}
  return axios({
    method: 'POST',
    url: '/goods/withdraw',
    headers: {
      'Content-Type': 'application/json'
    },
    params: map
  })
}

export function getPurchase(){
  return axios({
    method: 'POST',
    url: 'goods/getPurchase',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}


export function getUpload() {
  return axios({
    method: 'POST',
    url: 'goods/getUpload',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {}
  })
}
