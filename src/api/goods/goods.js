/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance



export function searchRandomGoods(){
  return axios({
    method: 'POST',
    url: '/randomSearch',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export function searchGoods(key_word){
  const map = {key_word: key_word}
  return axios({
    method: 'POST',
    url: '/search',
    params: map
  })
}

export function uploadGoods(description, name, sub_category, price, image){
  let formData = new FormData()
  formData.append("description", description)
  formData.append("name", name)
  formData.append("sub_category", sub_category)
  formData.append("price", price)
  formData.append("image", image)
  console.log(image)
  return axios({
    method: 'POST',
    url: 'goods/upload',
    headers: {
      'Content-Type':'multipart/form-data'
    },
    data: formData
  })
}

export function modifyGoods(id, description, name, sub_category, price, image){
  let formData = new FormData()
  formData.append("gid", id)
  formData.append("description", description)
  formData.append("name", name)
  formData.append("sub_category", sub_category)
  formData.append("price", price)
  formData.append("image", image)
  return axios({
    method: 'POST',
    url: 'goods/update',
    headers: {
      'Content-Type':'multipart/form-data'
    },
    data: formData
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
    url: 'getPurchase',
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
