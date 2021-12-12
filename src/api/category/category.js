/*
 * @Author Zixuan Wang
 * @Description feedback api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function getCategory(){
  return axios({
    method: 'POST',
    url: '/getCategory',
    headers: {
      'Content-Type':'application/json'
    },
  })
}

export function addCategory(category, sub_category, description){
  const map = {category: category, sub_category: sub_category, description: description}
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/goods/info/addCategory',
    headers: {
      'Content-Type': 'application/json'
    },
    params: map
  })
}
