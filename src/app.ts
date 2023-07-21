import { renderLinks } from "./helpers/render-links-helper.js";
import { renderImage, handleSuccessLoad } from "./helpers/render-image-helper.js";
const links_li : NodeListOf<HTMLElement> = document.querySelectorAll('.nav__item');
const nav_el : HTMLElement = document.querySelector('nav');
const gallerySection : HTMLElement  = document.querySelector('.gallery_section');
const galleryImgWrapper : HTMLElement = gallerySection.querySelector('.img_wrapper');
const modal : HTMLElement = document.querySelector(".modal__window");
const overlay : HTMLDivElement  = document.querySelector(".overlay");

// Btns
const burgerBtn : HTMLButtonElement = document.querySelector('.burger__btn');
const closeMenuBtn : HTMLButtonElement = document.querySelector('.close__btn');
const btnGalleryPrev : HTMLButtonElement = document.querySelector(".btn_prev");
const btnGalleryNext : HTMLButtonElement = document.querySelector(".btn_next");
const closeModalBtn : HTMLButtonElement = document.querySelector(".close_modal");

const links_a : HTMLAnchorElement[] = [];
let currImg : number = 0;
let maxIndex : number = 2;
let imgInModal : HTMLImageElement;

// Styling links in header
links_li.forEach((link : HTMLAnchorElement) => {
  const a_link : HTMLAnchorElement = link.querySelector("a");
  links_a.push(a_link);
  a_link.addEventListener('click', () => renderLinks(links_a, a_link, nav_el));
});

burgerBtn.addEventListener('click', () => {
  nav_el.classList.toggle("hidden");
});

closeMenuBtn.addEventListener('click', () => {
  nav_el.classList.add("hidden");
});  

const handleImageClick = (img : HTMLImageElement) => {
  imgInModal = document.createElement("img");
  imgInModal.src = img.src;
  imgInModal.alt = `${imgInModal.src}_alt`;
  modal.appendChild(imgInModal);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const renderGallery = () => {
  for(let i = 0; i < 3; i++) { // Promise all
    let imageToRender = renderImage(`./img/gallery_img_${i}.jpg`, i);
    imageToRender.then((path : string) => {
      const renderedImage : HTMLImageElement = handleSuccessLoad(path, galleryImgWrapper);
      renderedImage.addEventListener('click', () => handleImageClick(renderedImage));
    }).catch((err) => console.log("Error loading image of url: " + err));
  }
}

btnGalleryPrev.addEventListener('click', () => {
  if(currImg == 0) {
    currImg = maxIndex;
  } else {
    currImg--;
  }
  galleryImgWrapper.querySelectorAll('.gallery_img').forEach((imageDivElement : HTMLDivElement, index : number) => {
    imageDivElement.style.transform = `translateX(${(index - currImg) * 100}%)`;
  });
});

btnGalleryNext.addEventListener("click", () => {
  if(currImg == maxIndex) {
    currImg = 0;
  } else {
    currImg++;
  }
  galleryImgWrapper.querySelectorAll('.gallery_img').forEach((imageDivElement : HTMLDivElement, index : number) => {
    imageDivElement.style.transform = `translateX(${(index - currImg) * 100}%)`;
  });
});

const resetModalWindow = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.removeChild(imgInModal);
}

renderGallery();
closeModalBtn.addEventListener('click', resetModalWindow);
overlay.addEventListener('click', resetModalWindow);

