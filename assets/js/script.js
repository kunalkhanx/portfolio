// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY >= 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// END OF NAVBAR SCROLL EFFECT

// TEXT TYPING ANIMATION
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
  
// END OF TEXT TYPING ANIMATION

// OTHER ANIMATIONS
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
  document.body.classList.add('overflow-hidden')
});

document.getElementById('menu-close').addEventListener('click', function() {
  document.getElementById('menu').classList.add('hidden');
  document.body.classList.remove('overflow-hidden')
});
// END OF OTHER ANIMATIONS


// SMOOTH SCROLLING LINKS
const smoothLinks = document.querySelectorAll('.s-link');

smoothLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('menu').classList.add('hidden');
    document.body.classList.remove('overflow-hidden')
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  });
});
// END OF SMOOTH SCROLLING LINKS


// MONDAL
const modalTrigger = document.querySelectorAll('.modal-trigger');
const modalClose = document.querySelectorAll('.modal-close')

modalTrigger.forEach(trigger => {
  trigger.addEventListener('click', function(e){
    e.preventDefault();
    const target = this.getAttribute('data-target')
    const modal = document.querySelector(target)
    if(modal){
      modal.classList.add('active');
      setTimeout(() => {
        modal.classList.add('active-animation');
        document.body.classList.add('overflow-hidden')
      }, 10);
    }
  })
})

modalClose.forEach(trigger => {
  trigger.addEventListener('click', function(e){
    e.preventDefault();
    const target = this.getAttribute('data-target')
    const modal = document.querySelector(target)
    if(modal){
      modal.classList.remove('active-animation');
      setTimeout(() => {
        modal.classList.remove('active');
        document.body.classList.remove('overflow-hidden')
      }, 700);
    }
  })
})
// END OF MODAL


// CONTACT FORM SUBMISSION
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('cf-submit');

  form.addEventListener('submit', function (e) {
      e.preventDefault();

      const errorDiv = document.getElementById('cf-error');
      const successDiv = document.getElementById('cf-success');
      errorDiv.classList.add('hidden');
      successDiv.classList.add('hidden');

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
          if (!name) {
              showError('Name is required.');
          } else if (!email) {
              showError('Email is required.');
          } else if (!message) {
              showError('Message is required.');
          }
          return;
      }

      submitButton.disabled = true;
      submitButton.innerHTML = 'Please wait...';

      setTimeout(() => {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('message', message);

          fetch('/submit.php', {
              method: 'POST',
              body: formData,
          })
          .then(response => response.json())
          .then(data => {
              if (data.response && data.response.errors) {
                  if (data.response.errors.name) {
                      showError(data.response.errors.name[0]);
                  } else if (data.response.errors.email) {
                      showError(data.response.errors.email[0]);
                  } else if (data.response.errors.message) {
                      showError(data.response.errors.message[0]);
                  } else {
                      showError('There was an error submitting your form. Please try again.');
                  }
              } else if (data.response && data.response.data) {
                  showSuccess(data.response.message);
              } else {
                  showError('An unexpected response format received.');
              }
          })
          .catch(error => {
              showError('An unexpected error occurred. Please try again.');
          })
          .finally(() => {
              submitButton.disabled = false;
              submitButton.innerHTML = 'Send <i class="fa-solid fa-arrow-right"></i>';
          });
      }, 1000);
  });

  function showError(message) {
      const errorDiv = document.getElementById('cf-error');
      errorDiv.querySelector('p').textContent = message;
      errorDiv.classList.remove('hidden');
      errorDiv.classList.add('flex');
  }

  function showSuccess(message) {
      const successDiv = document.getElementById('cf-success');
      successDiv.querySelector('p').textContent = message;
      successDiv.classList.remove('hidden');
      successDiv.classList.add('flex');
  }
});
// END OF CONTACT FORM SUBMISSION