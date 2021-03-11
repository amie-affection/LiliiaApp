// burger menu
(function burgerActions() {
  const burger = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".burger-menu");

  const closePopUp = () => {
    const product = document.querySelectorAll(".products");
    const slider = document.querySelector(".slider");
    const popup = document.querySelector(".popup");
    const wrapper = document.querySelector(".popup__wrapper");
    const buffer = document.querySelector(".popup__buffer");

    slider.classList.remove("blur");
    product.forEach((el) => el.classList.remove("blur"));
    popup.classList.remove("open");
    wrapper.classList.remove("open");
    buffer.classList.remove("open");
    document.body.classList.remove("scroll-off");
  };

  const burgerToggle = () => {
    burger.classList.toggle("show");
    burgerMenu.classList.toggle("show");

    //close pop-up if open
    closePopUp();
  };

  burger.addEventListener("click", burgerToggle);

  setTimeout(function () {
    const headerInner = document.querySelector(".header__inner");
    headerInner.classList.add("show");
  }, 500);
})();

//burger height
(function calcBurgerMenu() {
  const header = document.querySelector(".header").getBoundingClientRect()
    .height;
  let vh = (window.innerHeight - header) * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
})();
