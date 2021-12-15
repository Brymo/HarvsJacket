const photoCount = 25;
const pics = document.getElementById("pictures");

for (let i = 1; i <= 15; i++) {
  const newElement = document.createElement("button");
  newElement.className = "image";
  newElement.style.backgroundImage = `url(images/${i}.jpg)`;
  newElement.onclick = createOverlayOnClick(`${i}.jpg`);
  pics.appendChild(newElement);
}

for (let i = 16; i <= 25; i++) {
  const newElement = document.createElement("button");
  newElement.className = "image";
  newElement.style.backgroundImage = `url(images/${i}.png)`;
  newElement.onclick = createOverlayOnClick(`${i}.png`);
  pics.appendChild(newElement);
}

function createOverlayOnClick(imageName) {
  return () => {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const overlayImage = document.createElement("div");
    overlayImage.className = "overlayImage";
    overlayImage.style.backgroundImage = `url(images/${imageName})`;

    const closeOverlayButton = document.createElement("h3");
    closeOverlayButton.innerText = "CLOSE X";
    closeOverlayButton.addEventListener("click", () => {
      document.body.removeChild(overlayContentContainer);
      document.body.removeChild(overlay);
    });

    const overlayContentContainer = document.createElement("div");
    overlayContentContainer.className = "overlayContentContainer";
    overlayContentContainer.appendChild(overlayImage);
    overlayContentContainer.appendChild(closeOverlayButton);

    document.body.appendChild(overlay);
    document.body.appendChild(overlayContentContainer);
  };
}
