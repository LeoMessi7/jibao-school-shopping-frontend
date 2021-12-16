


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

export function addCategory(category, subCategory,description){
  const map = {category:category, sub_category: subCategory,description:description}
  return axios({
    method: 'POST',
    url: '/administrator/addCategory',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function updateCategory(cid,category, subCategory,description){
  const map = {cid:cid,category:category, sub_category: subCategory,description:description}
  return axios({
    method: 'POST',
    url: '/administrator/updateCategory',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function getCategory(){
  return axios({
    method: 'POST',
    url: '/administrator/getCategory',
    headers: {
      'Content-Type':'application/json'
    },
  })
}

export function deleteCategory(subCategory){
  const map = {sub_category: subCategory}
  return axios({
    method: 'POST',
    url: '/administrator/deleteCategory',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
