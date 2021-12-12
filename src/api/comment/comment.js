/*
 * @Author Zixuan Wang
 * @Description feedback api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function commentCheck(seller_name){
  const map = {seller_name: seller_name}
  return axios({
    method: 'POST',
    url: '/comment/check',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
export function comment(seller_name,content,mark){
  const map = {seller_name: seller_name,content:content,mark:content}
  return axios({
    method: 'POST',
    url: '/comment',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
