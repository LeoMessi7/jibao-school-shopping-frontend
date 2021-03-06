/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function updateAvatar(image){
  let formData = new FormData()
  formData.append("avatar", image)
  return axios({
    method: 'POST',
    url: '/user/info/updateAvatar',
    headers: {
      'Content-Type':'multipart/form-data'
    },
    data: formData
  })
}

export function changePassword(password){
  const map = {password: password}
  return axios({
    method: 'POST',
    url: '/user/info/changePassword',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
export function saveUseInfo(major,campus){
  const map = {major: major,campus:campus}
  return axios({
    method: 'POST',
    url: '/user/info/update',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function getBalance(){
  return axios({
    method: 'POST',
    url: '/user/info/getBalance',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
