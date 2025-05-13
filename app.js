// app.js

document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchMessage");
  const updateButton = document.getElementById("updateMessage");
  const deleteButton = document.getElementById("deleteMessage");
  const messageDisplay = document.getElementById("messageDisplay");

  const removeDisplay = () => {
    const message = document.querySelector("#messageDisplay");
    message.remove();
  };

  const renderDisplay = (data) => {
    const message = document.createElement("div");
    const container = document.querySelector(".container");
    message.id = "messageDisplay";
    message.textContent = data;
    container.appendChild(message);
  };

  // 서버로부터 메시지 가져오기
  fetchButton.addEventListener("click", async () => {
    removeDisplay();
    try {
      const res = await axios.get("http://localhost:3000");
      renderDisplay(res.data.message || "메시지가 없습니다");
    } catch (error) {
      console.error("메시지 가져오기 오류:", error);
    }
  });

  // 서버에 메시지 업데이트 요청 보내기
  updateButton.addEventListener("click", async () => {
    const newMessage = prompt("새로운 메시지를 입력하세요:");
    if (newMessage) {
      try {
        const res = await axios.put("http://localhost:3000", newMessage, {
          headers: { "Content-type": "text/plain" },
        });
        removeDisplay();
        renderDisplay(res.data.message);
      } catch (error) {
        console.error("메시지 업데이트 오류:", error);
      }
    }
  });

  // 서버에 메시지 삭제 요청 보내기
  deleteButton.addEventListener("click", async () => {
    try {
      const res = await axios.delete("http://localhost:3000");
      removeDisplay();
      renderDisplay(res.data.message);
    } catch (error) {
      console.error("메시지 삭제 오류:", error);
    }
  });
});
