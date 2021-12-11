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
