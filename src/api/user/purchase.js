/*
 * @Author Yuanhao Pei
 * @Description goods service api
 * @Date 2021/12/10
 */

import axiosInstance from "../index.js"

const axios = axiosInstance

export function purchase(gid){
  const map = {gid: gid}
  return axios({
    method: 'POST',
    url: 'http://localhost:8081/user/info/purchase',
    headers: {
      isToken: false
    },
    params: map
  })
}
