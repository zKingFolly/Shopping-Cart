const addBtns = document.querySelectorAll(".add");
const cart = document.getElementById("ul");
let addArr = [...addBtns];
addArr.forEach((value) => {
  value.addEventListener("click", (e) => {
    let container = e.target.parentElement;
    let img = container.querySelector("img").src;
    let name = container.querySelector(".name").textContent.trim();
    let price = container.querySelector(".price").textContent.trim();
    console.log(img, name, price);
  });
});
