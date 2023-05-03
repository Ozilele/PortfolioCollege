const header = document.querySelector('.header__content');
const links_li = document.querySelectorAll('.nav__item');
const nav_el = document.querySelector('nav');

const jsEnHeader = document.querySelector(".header__content");
const nonJSLinks = document.querySelector('.disabled_js-items');
const nonJSHeader = document.querySelector(".disabled_js-header");

const gallerySection = document.querySelector('.gallery_section');
const galleryImgWrapper = gallerySection.querySelector('.img_wrapper');

const modal = document.querySelector(".modal__window");
const overlay = document.querySelector(".overlay");

// Btns
const burgerBtn = document.querySelector('.burger__btn');
const closeMenuBtn = document.querySelector('.close__btn');

const btnGalleryPrev = document.querySelector(".btn_prev");
const btnGalleryNext = document.querySelector(".btn_next");
const closeModalBtn = document.querySelector(".close_modal");

const links_a = [];
const imagesArr = [];

let currImg = 0;
let maxIndex = 2;
let imgInModal;

jsEnHeader.style.display = "flex";
nonJSHeader.style.display = "none";
nonJSLinks.style.display = "none";

// Styling links in header
links_li.forEach((link) => {
  const a_link = link.querySelector("a");
  links_a.push(a_link);

  a_link.addEventListener('click', () => {
    links_a.forEach((a) => {
      a.classList.remove("active");
      a.classList.add("inactive");
    });
    nav_el.classList.add("hidden");
    a_link.classList.remove("inactive");
    a_link.classList.add("active");
  });
});

burgerBtn.addEventListener('click', () => {
  nav_el.classList.toggle("hidden");
});

closeMenuBtn.addEventListener('click', () => {
  nav_el.classList.add("hidden");
})  


// Gallery assignment
const handleLoadImg = (url, i) => {
  return new Promise((resolve, reject) => {
    let currImg = new Image();
    currImg.onload = resolve(url);
    currImg.onerror = reject(url);
    currImg.src = url;
    currImg.style.translateX = `${i*100}%`;
    currImg.alt = `${url}_alt`;
  });
};

const imgWrapperDivs = [];

const onSuccess = (url) => {
  const id = url.slice(-5, -4);
  const htmlToBeInserted = `<div class="gallery_img gallery_img_${id}"></div>`
  galleryImgWrapper.insertAdjacentHTML('beforeend', htmlToBeInserted);

  const parentEl = galleryImgWrapper.querySelector(`.gallery_img_${id}`);
  let newImg = document.createElement("img");
  newImg.src = url;
  newImg.alt = `${url}_alt`;
  parentEl.style.transform = `translateX(${id*100}%)`;
  parentEl.appendChild(newImg);

  newImg.addEventListener('click', handleImageClick);

  imgWrapperDivs.push(parentEl);
}

const onError = (url) => {
  console.log("Error loading image of url: " + url);
}

for(let i = 0; i < 3; i++) { // Promise all
  let promise = handleLoadImg(`./img/gallery_img_${i}.jpg`);
  promise.then(onSuccess).catch(onError);
}

btnGalleryPrev.addEventListener('click', () => {
  if(currImg == 0) {
    currImg = maxIndex;
  } else {
    currImg--;
  }
  galleryImgWrapper.querySelectorAll('.gallery_img').forEach((div, index) => {
    div.style.transform = `translateX(${(index - currImg) * 100}%)`;
  });
});

btnGalleryNext.addEventListener("click", () => {
  if(currImg == maxIndex) {
    currImg = 0;
  } else {
    currImg++;
  }
  galleryImgWrapper.querySelectorAll('.gallery_img').forEach((div, index) => {
    div.style.transform = `translateX(${(index - currImg) * 100}%)`;
  });
});


const handleImageClick = (img) => {
  imgInModal = document.createElement("img");
  imgInModal.src = img.srcElement.currentSrc;
  imgInModal.alt = `${imgInModal.src}_alt`;
  modal.appendChild(imgInModal);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const resetModalWindow = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.removeChild(imgInModal);
}

closeModalBtn.addEventListener('click', resetModalWindow);

overlay.addEventListener('click', resetModalWindow);

// galleryImgWrapper.querySelectorAll('.gallery_img').forEach((img, i) => {
//   img.addEventListener('click', () => {
//     console.log("Siema Eniu");
//     const modal = gallerySection.querySelector(".modal__window");
//     modal.classList.remove("hidden");
//   });
// });