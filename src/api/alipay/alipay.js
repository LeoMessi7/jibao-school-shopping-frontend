/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/13
 */

import axiosInstance from "../index.js"

const axios = axiosInstance



export function alipayRecharge(amount) {
  return axios({
    method: 'POST',
    url: '/goAlipay',
    headers: {
      'Content-Type': 'application/json'
    },
    params:{
      amount: amount
    }
  })
}
