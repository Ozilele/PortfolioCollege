
export const renderImage = (path : string, i : number) => {
  return new Promise((resolve, reject) => {
    let currImg : HTMLImageElement = new Image();
    currImg.src = path;
    currImg.alt = `${path}_alt`;
    currImg.onload = () => {
      currImg.style.transform = `translateX(${i * 100}%)`;
      resolve(path);
    }
    currImg.onerror = () => {
      reject(path);
    }
  });
};

export const handleSuccessLoad = (url : string, galleryImgWrapper : HTMLElement) => {
  const id : number = parseInt(url.slice(-5, -4));
  const htmlToBeInserted : string = `<div class="gallery_img gallery_img_${id}"></div>`
  galleryImgWrapper.insertAdjacentHTML('beforeend', htmlToBeInserted);

  const imageDivElement : HTMLDivElement = galleryImgWrapper.querySelector(`.gallery_img_${id}`);
  let newImg : HTMLImageElement = document.createElement("img");
  newImg.src = url;
  newImg.alt = `${url}_alt`;
  imageDivElement.style.transform = `translateX(${id * 100}%)`;
  imageDivElement.appendChild(newImg);
  return newImg;
}