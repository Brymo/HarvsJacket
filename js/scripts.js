const photoCount = 25;
const pics = document.getElementById("pictures");

for(let i = 1; i <= 25; i++){
    const newElement = document.createElement("div");
    newElement.className = "image";
    newElement.style.backgroundImage = `url(images/${i}.jpg)`;
    pics.appendChild(newElement);
}