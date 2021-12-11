/*
 * @Author Zixuan Wang
 * @Description feedback api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function feedback(content){
  const map = {content: content}
  return axios({
    method: 'POST',
    url: '/feedback',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
