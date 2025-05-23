'use strict';


/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}

/**
 * header sticky & back to top
 */


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});




/**
 * move cycle on scroll
 */
const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});


/**
 * filter food menu
 */

const filterButtons = document.querySelectorAll('.filter-btn');
const foodMenuCards = document.querySelectorAll('.food-menu-card');
const foodMenuList = document.querySelector('.food-menu-list');


/////////////////////


function toggleOrderButtonVisibility() {
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
  if (!isMobile) return;

  foodMenuCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const orderButton = card.querySelector('.food-menu-btn');

    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      orderButton.style.opacity = '1';
      orderButton.style.transform = 'translate(-50%, -50%)';
    } else {
      orderButton.style.opacity = '0';
      orderButton.style.transform = 'translate(-50%, 0)';
    }
  });
}

window.addEventListener('scroll', toggleOrderButtonVisibility);
window.addEventListener('resize', toggleOrderButtonVisibility);
document.addEventListener('DOMContentLoaded', toggleOrderButtonVisibility);




///////////////////////












filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    console.log(`Filter selected: ${filter}`);

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filteredCards = [];
    const otherCards = [];

    foodMenuCards.forEach(card => {
      card.classList.remove('show');
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        filteredCards.push(card);
      } else {
        otherCards.push(card);
      }
    });

  
    foodMenuList.innerHTML = '';
    filteredCards.forEach(card => {
      foodMenuList.appendChild(card);
      setTimeout(() => card.classList.add('show'), 100);
    });
    otherCards.forEach(card => {
      foodMenuList.appendChild(card);
      setTimeout(() => card.classList.remove('show'), 100);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.click();
  }
});



function scrollToMenu() {
  const menuSection = document.getElementById("food-menu");
  menuSection.scrollIntoView({ behavior: "smooth" });
}