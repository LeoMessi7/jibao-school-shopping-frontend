/*
 * @Author Yuanhao Pei
 * @Description Login and register api
 * @Date 2021/12/9
 */



import axios from "axios";

const service = axios.create({
  withCredentials:  true,
  timeout:  5000
})


export function loginGet(email, password, captcha_code){
  const map = {email: email, password: password, captcha_code: captcha_code}
  return service({
    method: 'POST',
    url: 'http://localhost:8081/login/checkAccount',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function getImageCaptcha(){
  return service({
    method: 'GET',
    url: 'http://localhost:8081/getImageCaptcha',
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
  return service({
    method: 'POST',
    url: 'http://localhost:8081/register/checkAccount',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}

export function checkEmailCaptcha(email, captcha_input){
  const map = {email: email, captcha_input: captcha_input}
  return service({
    method: 'POST',
    url: 'http://localhost:8081/register/checkEmailCaptcha',
    headers: {
      'Content-Type':'application/json'
    },
    params: map
  })
}
