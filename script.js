const socket = new WebSocket("ws://localhost:3000");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username");

socket.onmessage = function(event) {
  const data = event.data;

  try {
    const json = JSON.parse(data);
    if (json.MessageInfo) {
      const p = document.createElement("p");
      p.textContent = `${json.UserName}: ${json.MessageInfo}`;
      chatBox.appendChild(p);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  } catch {
    const p = document.createElement("p");
    p.textContent = data;
    p.style.color = "gray";
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
};

sendBtn.onclick = () => {
  const msg = messageInput.value.trim();
  const name = usernameInput.value.trim() || "익명";

  if (msg.length === 0) return;

  const data = {
    UserName: name,
    MessageInfo: msg
  };

  socket.send(JSON.stringify(data));
  messageInput.value = "";
};
