export const renderImage = (path, i) => {
    return new Promise((resolve, reject) => {
        let currImg = new Image();
        currImg.src = path;
        currImg.alt = `${path}_alt`;
        currImg.onload = () => {
            currImg.style.transform = `translateX(${i * 100}%)`;
            resolve(path);
        };
        currImg.onerror = () => {
            reject(path);
        };
    });
};
export const handleSuccessLoad = (url, galleryImgWrapper) => {
    const id = parseInt(url.slice(-5, -4));
    const htmlToBeInserted = `<div class="gallery_img gallery_img_${id}"></div>`;
    galleryImgWrapper.insertAdjacentHTML('beforeend', htmlToBeInserted);
    const imageDivElement = galleryImgWrapper.querySelector(`.gallery_img_${id}`);
    let newImg = document.createElement("img");
    newImg.src = url;
    newImg.alt = `${url}_alt`;
    imageDivElement.style.transform = `translateX(${id * 100}%)`;
    imageDivElement.appendChild(newImg);
    return newImg;
};
