window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY >= 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const textArray = [
    "Fullstack",
    "Backend",
    "REST API",
    "Laravel",
    "NodeJS"
  ];
  
  const typingSpeed = 100;
  const deletingSpeed = 75;
  const delayBetweenWords = 2000;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  const aniTextElement = document.getElementById('aniText');
  const cursorElement = document.getElementById('cursor');

  if(aniTextElement){
    aniTextElement.textContent = '';
  }
  
  
  function typeTextLoop() {
    const currentText = textArray[textIndex];
    cursorElement.classList.remove('blink');
  
    if (!isDeleting && charIndex < currentText.length) {
      aniTextElement.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeTextLoop, typingSpeed);
    } 

    else if (isDeleting && charIndex > 0) {
      aniTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeTextLoop, deletingSpeed);
    } 

    else if (charIndex === currentText.length) {

      cursorElement.classList.add('blink');
      setTimeout(() => {
        isDeleting = true;
        typeTextLoop();
      }, delayBetweenWords);
    } 

    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(typeTextLoop, typingSpeed);
    }
  } 
  




function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function scrollAnimateBeat() {
  const elements = document.querySelectorAll('.scroll-beat');
  elements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('animate__animated', 'animate__heartBeat');
    }
  });
}

function scrollAnimateFill() {
  const elements = document.querySelectorAll('.scroll-fill');
  elements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('filled');
    }
  });
}


window.addEventListener('scroll', scrollAnimateBeat);
window.addEventListener('scroll', scrollAnimateFill);


window.onload = function() {
  setTimeout(function(){
      document.getElementById('preLoader').classList.add('loaded');
      if(aniTextElement){
        typeTextLoop();
      }      
      AOS.init();
      scrollAnimateBeat();
      scrollAnimateFill();
  }, 2000)
};


document.getElementById('menu-trigger').addEventListener('click', function() {
  document.getElementById('menu').classList.remove('hidden');
});

document.getElementById('menu-close').addEventListener('click', function() {
  document.getElementById('menu').classList.add('hidden');
});




const smoothLinks = document.querySelectorAll('.s-link');

smoothLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('menu').classList.add('hidden');
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Scroll smoothly to the target element
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  });
});