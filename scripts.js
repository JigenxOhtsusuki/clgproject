let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlides() {
    slideIndex++;
    slides.style.transition = 'transform 1s ease-in-out';
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;

    if (slideIndex === totalSlides - 1) {
        setTimeout(() => {
            slides.style.transition = 'none';
            slides.style.transform = 'translateX(0)';
            slideIndex = 0;
        }, 1000); // match the transition duration
    }
}

setInterval(showSlides, 10000); // Change slide every 10 seconds
