import "./burger.js";

window.scroll({behavior: 'smooth'})

// bottom-menu parser from sections
function createBottomMenu() {
  const root = document.querySelector(".bottom__menu-inner");
  const products = document.querySelectorAll(".products");

  products.forEach((el) => {
    const title = el
      .querySelector(".products__title-text").innerText;
    const item = `
        <li class="bottom__menu-item" data-tap='${el.id}'>
          <a class="bottom__menu-link" href="#${el.id}">${title}</a>
        </li>
    `;
    root.innerHTML += item;
  });
}
createBottomMenu();

// //wave methods
// const wave = {
//   wave: document.querySelector(".wave-wrap"),
//   size: function () {
//     const elWidth = document.querySelector(".tap-bar__item").clientWidth;
//     this.wave.style.width = elWidth + "px";
//   },
//   position: function () {
//     const activeElement = document.querySelector(".tap-bar__item.tap");
//     this.wave.style.left = activeElement.offsetLeft + "px";
//   },
// };
// wave.size();

// // scroll methods
// const scroll = {
//   bars: document.querySelectorAll(".tap-bar__item"),
//   products: document.querySelectorAll(".products"),

//   remove: function () {
//     this.bars.forEach((el) => el.classList.remove("tap"));
//   },

//   chose: function (num) {
//     this.remove();
//     this.bars[num].classList.add("tap");
//     wave.position();
//   },

//   scrollBar: function () {
//     scroll.products.forEach((el, index) => {
//       const elSize = el.getBoundingClientRect();
//       const docHeight = document.documentElement.clientHeight;
//       const coordinate = window.pageYOffset + docHeight / 1.5;
//       const topElCord = elSize.top + pageYOffset;
//       const botElCord = elSize.top + pageYOffset + elSize.height;

//       if (coordinate > topElCord && coordinate < botElCord) {
//         scroll.chose(index);
//       }
//     });
//   },
// };
// document.addEventListener("scroll", scroll.scrollBar);

// tap scroll to
(function scrollTo() {
  const tapBar = document.querySelectorAll(".bottom__menu-item");
  const products = document.querySelectorAll(".products");

  const goToHeader = (event) => {
    event.preventDefault();
    const element = event.target.getAttribute("data-tap");

    products.forEach((el) => {
      if (el.id == element) {
        const topElCord = el.getBoundingClientRect().top + pageYOffset;
        window.scrollTo({ top: topElCord - 75, left: 0, behavior: "smooth" });
      }
    });
  };

  tapBar.forEach((el) =>
    el
      .addEventListener("click", goToHeader)
      // .classList.add("products__title-active")
  );
})();

// product pop-up
function productPopUp() {
  const products = document.querySelectorAll(".product__item");
  const product = document.querySelectorAll(".products");
  const slider = document.querySelector(".slider");
  const popup = document.querySelector(".popup");
  const backBtn = document.querySelector(".popup__btns .back");
  const buffer = document.querySelector(".popup__buffer");

  const popUpState = (action) => {
    slider.classList[action]("blur");
    product.forEach((el) => el.classList[action]("blur"));
    popup.classList[action]("open");
    buffer.classList[action]("open");
    document.body.classList[action]("scroll-off");
  };

  const creatProductCard = (obj) => {
    const popUpItem = document.querySelector(".popup__product");

    const card = {
      img: obj.querySelector(".product__item-img>img").src,
      name: obj.querySelector(".product__item-title>span").innerText,
      price: obj.querySelector(".product__item-price").innerText,
      description: obj.querySelector(".product__item-description").innerText,
    };

    const popUpLayout = `
         <div class="popup__item-img">
         <p class="popup__item-name">${card.name}</p>
          <img src="${card.img}" onerror="this.style.display='none'" alt="">
          </div>
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
    popUpState("add");

    backBtn.addEventListener("click", () => {
      popUpState("remove");
    });
    buffer.addEventListener("click", () => {
      popUpState("remove");
    });
  };

  products.forEach((el) => el.addEventListener("click", popUp));
}
productPopUp();
