const fileImageInput = document.querySelector("#image-file");
const topTextInput = document.querySelector("#top-text");
const bottomTextInput = document.querySelector("#bottom-text");
const canvas = document.querySelector("#meme");
const saveButton = document.querySelector(".save-btn");

let image;

fileImageInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(fileImageInput.files[0]);
  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

const updateMemeCanvas = (canvas, image, topText, bottomText) => {
  const ctx = canvas.getContext("2d");
  const width = image ? image.width : "";
  const height = image ? image.height : "";
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  canvas.width = width;
  canvas.height = height;
  if (image) {
    ctx.drawImage(image, 0, 0);
  }

  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = fontSize + "px PT Serif sans-serif";

  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
};

saveButton.addEventListener("click", () => {
  // Convert the canvas to png image
  const imgData = canvas.toDataURL("image/png");

  // Create a download link for the image
  const link = document.createElement("a");
  link.download = "myImageWithText.png";
  link.href = imgData;

  // Trigger the download
  link.click();
});
