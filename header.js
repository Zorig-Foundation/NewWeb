// const toggleButton = document.getElementsByClassName(".toggle-button")[0];
// const navbarLinks = document.getElementsByClassName("header ul")[0];

// toggleButton.addEventListener("click", () => {
//   navbarLinks.classList.toggle("active");
// });

const toggleBtn = document.querySelector(".toggle-button");
const toggleBtnIcon = document.querySelector(".toggle-button i");
const dropDownMenu = document.querySelector("header ul");
toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("active");
  const isOpen = dropDownMenu.classList.contains("active");
  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
