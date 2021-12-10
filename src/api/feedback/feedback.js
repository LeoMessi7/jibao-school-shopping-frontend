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
    url: 'http://127.0.0.1:8081/feedback',
    headers: {
      isToken: false
    },
    params: map
  })
}
