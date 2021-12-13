
import {getChat} from "../api/user/chat";
import {getPurchase} from "../api/goods/goods";

var ws=null;

export let current_to_name = "all";
export let my_name = null;
export let avatar_url = null;

export let goodsList = null;


export let message = [
{
  to: 'all',
  avatar: '../../../static/touxiang/1.jpg',
  content:[]
},
]





export function addChatUser(user_name, avatar){
  let flag = 1
  for(let i =0; i<message.length;i++){
    if(message[i].to === user_name){
      flag = 0
      break;
    }
  }
  if(flag){
    let content = []
    getChat(user_name).then(res =>{
      let chat_list = res.data.chat
      let length = res.data.chat.length
      for(let i = 0; i < length; i++){
        content.push({
          from: chat_list[i].from_username,
          to: chat_list[i].to_username,
          content: chat_list[i].content,
          date: chat_list[i].date
        })
      }

      message.push({
        to: user_name,
        avatar: 'http://127.0.0.1:8081/'+ avatar,
        content:content
      })

    }).catch(function (error) {
      message.push({
        to: user_name,
        avatar: 'http://127.0.0.1:8081/'+ avatar,
        content:content
      })
      console.log(error)
    });
  }
}


export function addMessage(from_username, to_username, content, avatar_url){

  let flag = 1
  for(let i =0; i<message.length;i++){
    if(message[i].to === from_username){
      flag = 0
      message[i].content.push(
        {
          from: from_username,
          to: to_username,
          content: content,
          date: new Date(),
        }
      )
      break;
    }
  }
  if(flag){


    let content = [{
      from: from_username,
      to: to_username,
      content: content,
      date: new Date(),
    }]
    getChat(from_username).then(res =>{
      let chat_list = res.data.chat
      let length = res.data.chat.length
      for(let i = 0; i < length; i++){
        content.push({
          from: chat_list[i].from_username,
          to: chat_list[i].to_username,
          content: chat_list[i].content,
          date: chat_list[i].date
        })
      }
      message.push({
        to: from_username,
        avatar: avatar_url,
        content:content
      })
    }).catch(function (error) {
      message.push({
        to: from_username,
        avatar: avatar_url,
        content:content
      })
      console.log(error)
    });


  }
}

export function set_name(name){
  my_name = name
}
export function set_avatar_url(url){
  avatar_url = url;
}


export function change_to(to){
  current_to_name = to;
}

export function send(from, to, content){
  let message = {
    "avatar_url": avatar_url,
    "content":content,
    "from_username":from,
    "to_username":to
  };
  return JSON.stringify(message)
}

export function setGoodsList(goods_list){
  goodsList = goods_list
}

export function sendMessage(content){
  for(let i =0; i<message.length;i++){
    if(message[i].to === current_to_name){
      message[i].content.push(
        {
          from: my_name,
          to: current_to_name,
          content: content,
          date: new Date(),
        }
      )
      break;
    }
  }
}


export default {
  send,
  message,
  current_to_name,
  my_name,
  avatar_url,
  addMessage,
  goodsList,
  set_avatar_url,
  sendMessage,
  change_to,
  addChatUser,
}
