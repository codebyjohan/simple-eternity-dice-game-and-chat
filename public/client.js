const socket = io();
const userForm = document.querySelector("#user-form");
const userInput = document.querySelector("#user-input");
const userContianer = document.querySelector("#user-container");
const diceContainer = document.querySelector("#dice-container");
const diceButton = document.querySelector("#dice-button");
const diceResult = document.querySelector("#dice-result");
const messageContainer = document.querySelector("#message-container");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const textMessages = document.querySelector("#text-messages");
const welcomeMessage = document.querySelector("#welcome-message");
let userName;
let randomDice;
let diceClick = 0;
let total = 0;

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  userName = userInput.value;
  welcomeMessage.textContent = `Welcome ${userName}!`;
  userContianer.classList.add("hidden");
  messageContainer.classList.remove("hidden");
  diceContainer.classList.remove("hidden");
});

diceButton.addEventListener("click", () => {
  diceResult.classList.remove("hidden");
  diceClick++;
  randomDice = Math.floor(Math.random() * 6 + 1);
  total += randomDice;
  socket.emit("rollDice", {
    user: userName,
    result: randomDice,
    click: diceClick,
    total: total,
  });
});

messageForm.addEventListener("submit", (event) => {
  textMessages.classList.remove("hidden");
  event.preventDefault();
  socket.emit("textMessage", { user: userName, message: messageInput.value });
  messageInput.value = "";
});

socket.on("newRollDice", function (dice) {
  let diceItem = document.createElement("li");
  diceItem.textContent = `${dice.user} : Dice roll No. ${dice.click} = ${dice.result} | Total score: ${dice.total}`;
  diceResult.appendChild(diceItem);
});

socket.on("newTextMessage", function (msg) {
  let chatItem = document.createElement("li");
  chatItem.textContent = `${msg.user} : ${msg.message}`;
  textMessages.appendChild(chatItem);
});
