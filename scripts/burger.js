// burger menu
(function burgerActions() {
  const burger = document.querySelector('.burger');
  const body = document.querySelector('body');
  const burgerMenu = document.querySelector('.burger-menu');

  const burgerToggle = () => {
    burger.classList.toggle('show');
    burgerMenu.classList.toggle('show');
    document.body.classList.toggle('scroll-off');
  };

  burger.addEventListener('click', burgerToggle);

  setTimeout(function () {
    const headerInner = document.querySelector('.header__inner');
    headerInner.classList.add('show');
  }, 500);
})();

//burger height
(function calcBurgerMenu() {
  const header = document.querySelector('.header').getBoundingClientRect().height;
  let vh = (window.innerHeight - header) * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
})();
