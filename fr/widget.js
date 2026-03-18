let sessionId = localStorage.getItem("session_id");

if(!sessionId){
sessionId = Math.random().toString(36).substring(2);
localStorage.setItem("session_id", sessionId);
}

const button = document.createElement("button");
button.innerText = "Chat";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.background = "#2b7cff";
button.style.color = "white";
button.style.border = "none";
button.style.padding = "12px 18px";
button.style.borderRadius = "20px";
button.style.cursor = "pointer";

document.body.appendChild(button);

const chat = document.createElement("div");

chat.style.position = "fixed";
chat.style.bottom = "80px";
chat.style.right = "20px";
chat.style.width = "320px";
chat.style.height = "420px";
chat.style.background = "white";
chat.style.borderRadius = "10px";
chat.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
chat.style.display = "none";
chat.style.flexDirection = "column";
chat.style.fontFamily = "Arial";

chat.innerHTML = `
<div style="background:#2b7cff;color:white;padding:12px;border-radius:10px 10px 0 0;">
Evod AI Support
</div>

<div id="messages" style="flex:1;overflow:auto;padding:10px;"></div>

<div style="display:flex;border-top:1px solid #eee;">
<input id="message" placeholder="Type a message..." style="flex:1;border:none;padding:10px">
<button onclick="sendMessage()" style="background:#2b7cff;color:white;border:none;padding:10px 15px">Send</button>
</div>
`;

document.body.appendChild(chat);

button.onclick = () => {
chat.style.display = chat.style.display === "none" ? "flex" : "none";
};

function addMessage(text,type){

let messages = document.getElementById("messages");

let bubble = document.createElement("div");

bubble.style.maxWidth = "70%";
bubble.style.margin = "5px";
bubble.style.padding = "8px 12px";
bubble.style.borderRadius = "12px";
bubble.style.fontSize = "14px";

if(type==="user"){
bubble.style.background="#2b7cff";
bubble.style.color="white";
bubble.style.marginLeft="auto";
}else{
bubble.style.background="#f1f1f1";
bubble.style.color="black";
}

let time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

bubble.innerHTML = text + `<div style="font-size:10px;margin-top:3px;opacity:0.6">${time}</div>`;

messages.appendChild(bubble);

messages.scrollTop = messages.scrollHeight;

}

async function sendMessage(){

let input = document.getElementById("message");
let text = input.value;

if(text==="") return;

addMessage(text,"user");

input.value="";

let res = await fetch("http://127.0.0.1:8000/reply",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text:text,
session_id:sessionId
})
});

let data = await res.json();

addMessage(data.reply,"bot");
function showTyping(){

    let messages = document.getElementById("messages");
    
    let typing = document.createElement("div");
    typing.id = "typing";
    
    typing.style.background="#f1f1f1";
    typing.style.padding="8px 12px";
    typing.style.borderRadius="12px";
    typing.style.margin="5px";
    typing.style.maxWidth="60%";
    typing.style.fontSize="13px";
    
    typing.innerText = "AI is typing...";
    
    messages.appendChild(typing);
    
    messages.scrollTop = messages.scrollHeight;
    
    }
}
