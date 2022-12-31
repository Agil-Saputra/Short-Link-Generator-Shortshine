// burger menu on mobile only
const navmenu = document.querySelector(".nav-menu");
const burger = document.querySelector(".menu");

burger.addEventListener("click", () => {
  navmenu.classList.toggle("active");
  burger.classList.toggle("close");
});

// IntersectionObserver for page animation
const observer = new IntersectionObserver((entry) => {
  entry.forEach((element) => {
    if (element.isIntersecting) {
      element.target.classList.add("show");
    } else {
      element.target.classList.remove("show");
    }
  });
});

const hide = document.querySelectorAll(".hidden");
hide.forEach((el) => observer.observe(el));

// variables for fetching data
const form = document.querySelector("#form");
const input = document.querySelector("#url");
const container = document.querySelector("#container");

// fetch API for Shorting The input URl Using Asynchronous function
 async function short() {
  const data = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${input.value}`
  );
  const res = await data.json();
// create a output and append it to the container
  if (res.ok == true) {
    let div = document.createElement("div");
    div.classList.add("child");
    div.innerHTML += `
    <h2>Here is your link:<a href="${res.result.original_link}" target="_blank"><span id="link">${res.result.short_link3}</span></a></h2>
    <button id="copy">
            <img src="public/images/copy2.svg" title="copy">
            Copy
          </button>
    `;
    container.appendChild(div);
  } else {
    // handling error from API
    const err = document.querySelector(".error");
    err.style.display = "block";
    err.innerHTML = `
    <h2>${res.error}. Because your link is ${res.disallowed_reason}</h2>
    `;
    setTimeout(() => {
      err.style.display = "none";
    }, 10000);
  }
  // function to copy url to clipboard
  const copy = document.querySelectorAll("#copy");
  
  copy.forEach((el) => {
    el.addEventListener("click", () => {
      const link = document.querySelector("#link");
      navigator.clipboard.writeText(link.innerText);
      el.innerText = "Copied!";
    });
  });
}

// add event listener to submit button
const loader = document.querySelector(".loader");
const child = document.querySelector(".child");
form.addEventListener("submit", (e) => {
  e.preventDefault();
// handling submit error
  if (!input.value) {
    const errtext = document.querySelector(".error-text");
    errtext.innerHTML = `Please Enter a your valid input!`;
    errtext.style.display = "block";
    setTimeout(() => {
      errtext.style.display = "none";
    }, 2000);
  } else {
    short();
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }
  // clean the input
  input.value = " ";
});

// dark mode toggle 
const mode = document.querySelector('body')
const btn  = document.querySelector('#toggleMode');
const img = document.querySelector('img');
let toggle = true

btn.addEventListener('click', () =>{
  toggle = !toggle;
  mode.classList.toggle('dark');
  if(!toggle){
    img.src = 'public/images/light.svg';
  } else {
    img.src = 'public/images/dark.svg';
  }
  
  
})
