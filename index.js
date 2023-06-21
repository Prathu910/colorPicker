const form = document.getElementById("colorForm");
const colorInput = document.getElementById("colorType");
const color = document.querySelector("input");
const colorDivs = document.querySelectorAll(".color-value");
const colorText = document.querySelectorAll("p");

makeApiCall(color.value.slice(1), colorInput.value);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const seedColor = color.value.slice(1);
  const colorType = colorInput.value;
  makeApiCall(seedColor, colorType);
});

function makeApiCall(seedColor, colorType) {
  const colorsFromAPI = [];
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorType}`)
    .then((res) => res.json())
    .then((data) => {
      const contrast = data.seed.contrast.value; // Either Black or White => #000000 OR #ffffff
      data.colors.forEach((color) => {
        colorsFromAPI.push(color.hex.value);
      });
      renderColor(colorsFromAPI, contrast);
    });
}

function renderColor(colorsFromAPI, contrast) {
  console.log(contrast);
  document.body.style.backgroundColor = color.value;
  colorDivs.forEach((div, index) => {
    div.style.color = contrast;
    div.style.backgroundColor = colorsFromAPI[index];
  });
  colorText.forEach((text, index) => {
    text.style.color = contrast;
    text.textContent = colorsFromAPI[index];
  });
}

colorDivs.forEach((div) => {
  div.addEventListener("mouseenter", (e) => {
    const hexColorText = div.nextElementSibling;
    div.textContent = hexColorText.textContent;
  });
  div.addEventListener("mouseleave", () => {
    div.textContent = "";
  });
  div.addEventListener("click", () => {
    navigator.clipboard.writeText(div.textContent);
    div.textContent = "Copied";
  });
});
