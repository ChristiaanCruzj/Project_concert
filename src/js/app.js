document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    fixedNavegation();
    createGallery();
    scrollNav();
}

function fixedNavegation() {
    const nav = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if( aboutFestival.getBoundingClientRect().bottom < 0 ) {
            nav.classList.add('fijo');
            body.classList.add('body-scroll'); // don't jump
        } else {
            nav.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const links = document.querySelectorAll('.main-nav'); 
    links.forEach( link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({ behavior: "smooth"});
        });
    });
}

function createGallery() {
    const gallery = document.querySelector('.image-gallery');
    
    for( let i=1; i <= 12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif" >
            <source srcset="build/img/thumb/${i}.webp" type="image/webp" >
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="image gallery">
        `;
        image.onclick = function() {
            showImage(i);
        };
        gallery.appendChild(image);
    }
}

function showImage(id) {
    // console.log('mostrando...', id);
    const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif" >
            <source srcset="build/img/grande/${id}.webp" type="image/webp" >
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="image gallery">
        `;
// created the overlay with image
        const overlay = document.createElement('DIV');
        overlay.appendChild(image);
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fix-body'); // you can move scrol when you close every picture (out of picture or "X")
            overlay.remove();
        }
// close the modal
        const closeModal = document.createElement('P');
        closeModal.textContent = 'X';
        closeModal.classList.add('btn-close');
        //action close Modal
        closeModal.onclick = function() { 
            const body = document.querySelector('body');
            body.classList.remove('fix-body'); // you can move scroll when you close every picture into the "X"
            overlay.remove();
        }
        overlay.appendChild(closeModal);
// add into html
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fix-body'); // don't give scroll when you see every picture
}