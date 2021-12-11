var ws=null;

export let current_to_name = "robert";
export let my_name = null;
export let avatar_url = null;
export let message = [
{
  to: 'robert',
  avatar: '../../../static/touxiang/1.jpg',
  content:[]
},

  {
    to: '456',
    avatar: '../../../static/touxiang/1.jpg',
    content:[]
  }
]


export function addChatUser(user_name, avatar){
  alert(avatar)
  let flag = 1
  for(let i =0; i<message.length;i++){
    if(message[i].to === user_name){
      flag = 0
      break;
    }
  }
  if(flag){
    alert('http://127.0.0.1:8081/'+ avatar)
    message.push({
      to: user_name,
      avatar: 'http://127.0.0.1:8081/'+ avatar,
      content:[]
    })
    console.log(message)
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
    message.push({
      to: from_username,
      avatar: 'http://127.0.0.1:8081/'+ avatar_url,
      content:[{
        from: from_username,
        to: to_username,
        content: content,
        date: new Date(),
      }]
    })
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
    "content":content,
    "from_username":from,
    "to_username":to
  };
  return JSON.stringify(message)
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
  set_avatar_url,
  sendMessage,
  change_to,
  addChatUser,
}
