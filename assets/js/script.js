window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY >= 200) {
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
  
  const typingSpeed = 100; // Speed of typing
  const deletingSpeed = 75; // Speed of deleting
  const delayBetweenWords = 2000; // Delay before deleting
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  const aniTextElement = document.getElementById('aniText');
  const cursorElement = document.getElementById('cursor');
  
  // Clear the default text before typing starts
  aniTextElement.textContent = ''; // Clears any default text
  
  function typeTextLoop() {
    // Get the current word to be typed
    const currentText = textArray[textIndex];
  
    // Stop blinking while typing or deleting
    cursorElement.classList.remove('blink');
  
    // Typing
    if (!isDeleting && charIndex < currentText.length) {
      aniTextElement.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeTextLoop, typingSpeed);
    } 
    // Deleting
    else if (isDeleting && charIndex > 0) {
      aniTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeTextLoop, deletingSpeed);
    } 
    // When typing finishes, add a delay and then start deleting
    else if (charIndex === currentText.length) {
      // Add blinking during the break between typing and deleting
      cursorElement.classList.add('blink');
      setTimeout(() => {
        isDeleting = true;
        typeTextLoop();
      }, delayBetweenWords);
    } 
    // When deleting finishes, move to the next word and start typing again
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length; // Loop through the text array
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
      typeTextLoop();
      AOS.init();
      scrollAnimateBeat();
      scrollAnimateFill();
  }, 2000)
};