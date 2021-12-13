/*
 * @Author Zixuan Wang
 * @Description feedback api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function feedback(user_name, content, fid){
  const map = {user_name: user_name, content: content, fid:fid}
  return axios({
    method: 'POST',
    url: '/administrator/feedback',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}


export function getFeedback(){
  return axios({
    method: 'POST',
    url: '/administrator/get/feedback',
    headers: {
      'Content-Type':'application/json'
    },
    params: {}
  })
}
