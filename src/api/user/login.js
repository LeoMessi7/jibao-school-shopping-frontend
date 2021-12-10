/*
 * @Author Yuanhao Pei
 * @Description Login and register api
 * @Date 2021/12/9
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function loginGet(email, password, captcha_code){
  const map = {email: email, password: password, captcha_code: captcha_code}
  return axios({
    method: 'POST',
    url: '/login/checkAccount',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function getImageCaptcha(){
  return axios({
    method: 'GET',
    url: '/getImageCaptcha',
    headers: {
      'Content-Type':'application/json'
    },
    //withCredentials : true,
    responseType: 'arraybuffer',
    timeout: 20000
  })
}

export function checkAccount(email, password, name){
  const map = {name: name, password: password, email: email}
  return axios({
    method: 'POST',
    url: '/register/checkAccount',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function checkEmailCaptcha(email, captcha_input){
  const map = {email: email, captcha_input: captcha_input}
  return axios({
    method: 'POST',
    url: '/register/checkEmailCaptcha',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
