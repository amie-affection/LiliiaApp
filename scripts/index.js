import './burger.js';

window.scroll({ behavior: 'smooth' });

document.addEventListener('DOMContentLoaded', function () {
  let node = document.querySelector('.preload-transitions');
  node.classList.remove('preload-transitions');
});

// bottom-menu parser from sections
function createBottomMenu() {
  const root = document.querySelector('.bottom__menu-inner');
  const products = document.querySelectorAll('.products');

  products.forEach((el) => {
    const title = el.querySelector('.products__title-text').innerText;
    const item = `
        <li class="bottom__menu-item" data-tap='${el.id}'>
          <a class="bottom__menu-link" href="#${el.id}">${title}</a>
        </li>
    `;
    root.innerHTML += item;
  });
  const item = document.querySelector('.bottom__menu-item');
  item.classList.add('active');
}
createBottomMenu();

// scroll methods
const scroll = {
  bars: document.querySelectorAll('.bottom__menu-item'),
  products: document.querySelectorAll('.products'),

  remove: function () {
    this.bars.forEach((el) => el.classList.remove('active'));
  },

  chose: function (num) {
    this.remove();
    this.bars[num].classList.add('active');
  },

  scrollBar: function () {
    scroll.products.forEach((el, index) => {
      const elSize = el.getBoundingClientRect();
      const docHeight = document.documentElement.clientHeight;
      const coordinate = window.pageYOffset + docHeight / 1.5;
      const topElCord = elSize.top + pageYOffset;
      const botElCord = elSize.top + pageYOffset + elSize.height;

      if (coordinate > topElCord && coordinate < botElCord) {
        scroll.chose(index);
      }
    });
  },
};
document.addEventListener('scroll', scroll.scrollBar);

// tap scroll to
(function scrollTo() {
  const tapBar = document.querySelectorAll('.bottom__menu-item');
  const products = document.querySelectorAll('.products');

  const goToHeader = (event) => {
    event.preventDefault();
    const element = event.target.getAttribute('data-tap');

    products.forEach((el) => {
      if (el.id == element) {
        const topElCord = el.getBoundingClientRect().top + pageYOffset;
        window.scrollTo({ top: topElCord - 225, left: 0, behavior: 'smooth' });
      }
    });
  };

  tapBar.forEach((el) => el.addEventListener('click', goToHeader));
})();

// product pop-up
function productPopUp() {
  const products = document.querySelectorAll('.product__item');
  const popup = document.querySelector('.popup');
  const close = document.querySelector('.popup__close');
  const buffer = document.querySelector('.popup__buffer');

  const popUpState = (action) => {
    popup.classList[action]('open');
    buffer.classList[action]('open');
    document.body.classList[action]('scroll-off');
  };

  const creatProductCard = (obj) => {
    const popUpItem = document.querySelector('.popup__product');

    const card = {
      img: obj.querySelector('.product__item-img>img').src,
      name: obj.querySelector('.product__item-title>span').innerText,
      price: obj.querySelector('.product__item-price').innerText,
      description: obj.querySelector('.product__item-description').innerText,
    };

    const popUpLayout = `
         <div class="popup__item-img">
          <img src="${card.img}" onerror="this.style.display='none'" alt="">
          </div>
          <h3 class="popup__item-name">${card.name}</h3>
            <div class="popup__item-text">
              <h3 class="popup__item-title">Menu du jour</h3>
              <p class="popup__item-description">
              <span>${card.description}</span>
              </p>
              </div>
                        <div class="popup__adds">


            <div class="popup__add popup__add-ingredient">
              <h3>Accompagnement</h3>
              <ul class="popup__options">
                <li class="popup__option">Fresh Potetos</li>
                <li class="popup__option">Rice</li>
              </ul>
            </div>

            <div class="popup__add popup__add-ingredient">
              <h3>Sauces</h3>
              <ul class="popup__options popup__sauces">
                <li class="popup__option popup__sauce">Brown sauce</li>
                <li class="popup__option popup__sauce">Brown sauce</li>
                <li class="popup__option popup__sauce">Brown sauce</li>
                <li class="popup__option popup__sauce">Brown sauce</li>
                <li class="popup__option popup__sauce">Butter sauce</li>
              </ul>
            </div>

            <div class="popup__add popup__add-ingredients">
              <h3>Extra</span></h3>
              <ul class="popup__options popup__ingredients">
                <li class="popup__option popup__ingredient">Shrimp +3.-</li>
                <li class="popup__option popup__ingredient">Extra egg +2.-</li>
              </ul>
            </div>
          </div>
           <p class="popup__item-price">${card.price}</p>

    `;

    popUpItem.innerHTML = popUpLayout;
  };

  const popUp = (event) => {
    creatProductCard(event.target);
    popUpState('add');

    close.addEventListener('click', () => {
      popUpState('remove');
    });
    buffer.addEventListener('click', () => {
      popUpState('remove');
    });
  };

  products.forEach((el) => el.addEventListener('click', popUp));
}
productPopUp();
