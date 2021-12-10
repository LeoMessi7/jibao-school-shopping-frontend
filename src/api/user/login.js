/*
 * @Autor: LOTEAT
 * @Description:
 * @Date: 2021-12-09 18:22:16
 */
/**
 * @author Yuanhao Pei
 * @description 登录api
 * @date 2021/12/8
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function loginGet(email, password, captcha_code){
  const map = {email: email, password: password, captcha_code: captcha_code}
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/login/checkAccount',
    headers: {
      isToken: false
    },
    params: map
  })
}

export function getImageCaptcha(){
  return axios({
    method: 'GET',
    url: 'http://localhost:8081/getImageCaptcha',
    headers: {
      isToken: false
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
    url: 'http://localhost:8081/register/checkAccount',
    headers: {
      isToken: false
    },
    params: map
  })
}

export function checkEmailCaptcha(email, captcha_input){
  const map = {email: email, captcha_input: captcha_input}
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/register/checkEmailCaptcha',
    headers: {
      isToken: false
    },
    params: map
  })
}
