/*
 * @Author Zixuan Wang
 * @Description feedback api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"
import axios from "axios";

const service = axios.create({
  baseURL:  "http://localhost:8081",
  withCredentials:  true,
  timeout:  5000
})

export function feedback(content){
  const map = {content: content}
  console.log(map)
  return service({
    method: 'POST',
    url: 'http://localhost:8081/feedback',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
