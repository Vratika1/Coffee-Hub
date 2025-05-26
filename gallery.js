document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.sec1 .img img');
    const enlargeContainer = document.querySelector('.enlargeImg_cont');
    const enlargedImg = document.createElement('img');
    enlargedImg.className = 'enlarged-image';

    const downloadBtn = document.createElement('a');
    downloadBtn.className = 'download-btn';
    downloadBtn.innerHTML = `<i class="fa fa-download"></i>`;
    downloadBtn.setAttribute('download', 'image.jpg');

    const closeBt = document.createElement('button');
    closeBt.className = 'close-bt';
    closeBt.innerHTML = `<i class="fas fa-times"></i>`;

    enlargeContainer.appendChild(enlargedImg);
    enlargeContainer.appendChild(downloadBtn);
    enlargeContainer.appendChild(closeBt);

    images.forEach((image) => {
        image.addEventListener('click', () => {
            const imageSrc = image.src;
            enlargedImg.src = imageSrc;
            downloadBtn.href = imageSrc;
            enlargeContainer.classList.add('visible');
        });
    });

    closeBt.addEventListener('click', (e) => {
        e.stopPropagation();
        enlargeContainer.classList.remove('visible');
    });

    enlargeContainer.addEventListener('click', (e) => {
        if (e.target === enlargeContainer) {
            enlargeContainer.classList.remove('visible');
        }
    });
});
