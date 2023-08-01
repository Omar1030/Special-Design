// General Functions

// Handle active state
function handleActive(event) {

  // Remove active class
  event.target.parentElement.querySelectorAll(".active").forEach(ele => {
      ele.classList.remove("active")
  })

  // Add active class
  event.target.classList.add("active")

}

// Function scroll to somewhere
function scrollToSomeWhere(element) {

  element.forEach(ele => {
      ele.addEventListener("click", e => {
          document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({behavior: "smooth"});
      })
  })
}

// ======================================= //

// Check Color_optiono in local storage
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Check for active class
  document.querySelectorAll(".color-list li").forEach(ele => {
      
      // Remove class active from all
      ele.classList.remove("active");

      // Add class active to checked li
      if (ele.dataset.color == mainColor) {
          ele.classList.add("active")
      }
  })
}


// Random background option
let backgroundOption = true;

// Var to control interval 
let backgroundInterval;

// ==================================================== //

// Check if there is local storage random background item
let backgroundLocalStorage = localStorage.getItem("background_option");

if (backgroundLocalStorage !== null) {

  if (backgroundLocalStorage == true) {
      backgroundOption = true;
  } else {
      backgroundOption = false;
  }
  
  // Remove active class from all spans
  document.querySelectorAll(".random-background span").forEach(ele => {
      ele.classList.remove("active")
  })

  // Add active class
  if (backgroundLocalStorage == "true") {
      document.querySelector(".random-background .yes").classList.add("active");
  } else {
      document.querySelector(".random-background .no").classList.add("active");
  }
  
}

// ===================================== //

// Select Landing Page
let landingPage = document.querySelector(".landing-page");

// Array of Images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to random background
function randomBackground() {
  if (backgroundOption == true) {

      // Change backgroung image Url
      backgroundInterval = setInterval(() => {

          // Get random number
          let randomNumber = Math.floor(Math.random() * imgArray.length);

          // Change background image
          landingPage.style.backgroundImage = 'url("Images/' + imgArray[randomNumber] +'")';

      }, 10000);
  }
}

randomBackground()

// ===================================== // 

// Switch Random Background Option
let randomBack = document.querySelectorAll(".option-box .random-background span");

// Loop on all span
randomBack.forEach(span => {

  // Click on span
  span.addEventListener("click", event => {

      // To add class active to  target
      handleActive(event)

      if (event.target.dataset.background === "yes") {
          backgroundOption = true;
          randomBackground();
          localStorage.setItem("background_option", true);
      } else {
          backgroundOption = false;
          clearInterval(backgroundInterval);
          localStorage.setItem("background_option", false);
      }
  })
})

// ===================================== // 

// Switch colors for website
let colorsList = document.querySelectorAll(".color-list li");

// Loop on li "List of colors"
colorsList.forEach(function(col) {

  // Click on li
  col.addEventListener("click", function(event) {

  // Set color on root element
  document.documentElement.style.setProperty("--main-color", event.target.dataset.color);

  // Add color to local storage
  localStorage.setItem("color_option", event.target.dataset.color);

  // To add class active to  target
  handleActive(event);
  
  })
})

// ====================================== //

// Toggle spin class
document.querySelector(".fa-gear").addEventListener("click", function() {

  // Spin on Icon
  this.classList.toggle("fa-spin");

  // Toggle on settings box
  document.querySelector(".settings-box").classList.toggle("open");
});

// ===================================== // 


// Bullets
// Select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet")
scrollToSomeWhere(allBullets);

// ===================================== //

// Bullets Option
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletOption = localStorage.getItem("displayBullets");

if (bulletOption !== null) {
  
  bulletSpan.forEach(ele => {

      ele.classList.remove("active");

      if (ele.dataset.display == bulletOption) {
          ele.classList.add("active");
          bulletContainer.style.cssText = `display: ${bulletOption}` 
      }

  })

}

bulletSpan.forEach(span => {

  span.addEventListener("click", event => {

      // Add class active
      handleActive(event);

      if (span.dataset.display == "none") {

          bulletContainer.style.cssText = "display: none";

          // Add vlaue to local storage
          localStorage.setItem("displayBullets", "none");

      } else {

          bulletContainer.style.cssText = "display: block";

          // Add vlaue to local storage
          localStorage.setItem("displayBullets", "block");
      }

  })
})

// ===================================== //

// Reset Button
document.querySelector(".reset-options").onclick = function () {

  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("displayBullets");

  window.location.reload()

}

// ==================================== //

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // Skills OffsetTop
  let skillsOfSetTop = ourSkills.offsetTop;

  // Skills OffsetHeight
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScroll = this.scrollY;

  // To get to Section "Our Skills"
  if (windowScroll > (skillsOfSetTop + skillsOuterHeight - windowHeight)) {
      
      let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

      allSkills.forEach(skill => {
          skill.style.cssText = `width: ${skill.dataset.progress}`
      })

  }
}

// ===================================== //

// Toggle Menu
let toggleBtn = document.querySelector(".landing-page .toggle-menu");
let links = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop propagation
  e.stopPropagation()
  this.classList.toggle("menu-active")
  links.classList.toggle("open")
};

// Click anywhere 
document.addEventListener("click", e => {
  
  if (e.target !== toggleBtn && e.target !== links) {
      
      // Check if menu is open
      if (links.classList.contains("open")) {
          
          toggleBtn.classList.remove("menu-active")
          links.classList.remove("open")

      }

  }

})

// Stop propagation on Menu
links.onclick = function (e) {
  e.stopPropagation();
}

// ===================================== //

// Create popup with the image
let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach (img => {

  img.addEventListener("click", e => {

      // Create overlay element
      let overlay = document.createElement("div");

      // Add class to overlay
      overlay.className = "popup-overlay";

      // Add overlay to body
      document.body.appendChild(overlay);

      // Create popup box
      let popupBox = document.createElement("div");

      // Add class to popuBox
      popupBox.className = "popup-box";

      // Add head of img
      if (img.alt !== null) {

          // Create heading
          let imgHeading = document.createElement("h3");

          // Create txt of heading
          let imgTxt = document.createTextNode(img.alt);

          // Add txt to heading
          imgHeading.appendChild(imgTxt);

          // Add heading to popup box
          popupBox.appendChild(imgHeading);

      }

      // Create the img
      let popupIMage = document.createElement("img");

      // Change the src of img
      popupIMage.src = img.src;

      // Add img to popup box
      popupBox.appendChild(popupIMage);

      // Add popupbox to body
      document.body.appendChild(popupBox);

      // Create close span
      let closeBtn = document.createElement("span");

      // Add class to close-btn
      closeBtn.className = "close-btn";

      // Add txt to close btn
      let btnTxt = document.createTextNode("X");

      // Add txt to close btn
      closeBtn.appendChild(btnTxt);

      // Add close-btn to popup box
      popupBox.appendChild(closeBtn);

      // Close Popup 
      document.addEventListener("click", e => {

          if (e.target.className == "close-btn") {
              
              e.target.parentNode.remove();
              overlay.remove();

          }

      })
      

  })
})


