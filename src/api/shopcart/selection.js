
import axiosInstance from "../index.js"

const axios = axiosInstance

export function getShopcart(){
  return axios({
    method: 'POST',
    url: '/goods/getSelection',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}


export function deleteShopcart(gid){
  const map = {gid: gid}
  console.log(map)
  return axios({
    method: 'POST',
    url: '/goods/deleteSelection',
    headers: {
      'Content-Type': 'application/json'
    },
    params: map
  })
}


export function buyAll(gid_list, total){
  let formData = new FormData()
  formData.append("gid_list", gid_list)
  formData.append("total", total)
  return axios({
    method: 'POST',
    url: '/goods/buyAll',
    headers: {
      'Content-Type':'multipart/form-data'
    },
    data: formData
  })

}
