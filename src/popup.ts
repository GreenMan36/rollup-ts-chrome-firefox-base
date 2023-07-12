console.log("Hello from popup.ts");

const github = document.getElementById("github");
console.log(github);
const button = document.createElement("button");
button.innerHTML =
  '<img src="https://avatars.githubusercontent.com/u/5887406?v=4" width="20" height="20" />';

button.onclick = () => {
  window.open("https://github.com/GreenMan36");
};

github?.appendChild(button);

console.log(github);
