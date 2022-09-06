// import {
//     log,
//     logLevel,
//     logDef,
// } from "./node_modules/@nor/tinylog/lib/tinylog.js";

// import PhotoSwipeLightbox from "./node_modules/photoswipe/dist/photoswipe-lightbox.esm.js";


// if this does not work - fix it by installing
// tinylog. See readme.md file for more info.

// log.setClient({name: "Sandeps Webclient", version: "1.0.0"});
// log.logAll().showDate().whoami();

// Sticky nav bar
const nav = document.querySelector(".header-1");

window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = nav.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        nav.classList.add("fixed-nav");
    } else {
        nav.classList.remove("fixed-nav");
    }
});

// smooth scroll
const scrollLinks = document.querySelectorAll('.scroll-link');
const navHeight = nav.getBoundingClientRect().height;
scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
// Navigate to specific path
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        let position = element.offsetTop - navHeight;
        window.scrollTo({
            left: 0,
            top: position,
        });
    });
});

// Nav toggle button for mobile/tablet

const NavToggle = document.querySelector('.nav-toggle');
const Navigation = document.querySelector('.navigation');
const navOpen = document.querySelector('.open')
const navClose = document.querySelector('.close')
NavToggle.addEventListener('click', () => {
    Navigation.classList.toggle('nav-open')
    if(Navigation.classList.contains('nav-open')){
        navClose.style.display = 'block'
        navOpen.style.display = 'none'
    }else{
        navClose.style.display = 'none'
        navOpen.style.display = 'block'
    }

})
window.addEventListener('scroll',()=>{
  const scrollHeight = window.pageYOffset;
  if(scrollHeight === 1){
    Navigation.classList.remove('nav-open')
  }else{
     navClose.style.display = 'none'
     navOpen.style.display = 'block'
     Navigation.classList.remove('nav-open')
  }
})
scrollLinks.forEach((item) => {
    item.addEventListener('click', () => {
        Navigation.classList.remove('nav-open');
    })
})
window.addEventListener('keydown',(e)=>{
if(e.key==='Escape'){
    Navigation.classList.remove('nav-open')
}
})
// ocument.addEventListener('keydown', e => {
//   console.log(e.key);

//   if (e.key === 'Escape') {
//     modal.classList.add('hidden');
//     overlay.classList.add('hidden');
//   }
// });
// fetch json
// const ebooks = document.querySelector(".product-container");

// const fetchEbooks = async () => {
//   try {
//     const response = await fetch("release2.json");
//     // log.trace("Release2 JSON:", response);
//     const data = await response.json();
//     // log.trace(data);
//     return data;
//   } catch (error) {
//     alert(error);
//   }
// };
// fetchEbooks();

// const displayProducts = (list) => {
//   const productList = list
//     .map((product) => {
//       // log.trace("Product:", product);
//       const { id } = product;
//     //  let length = id.length
//       //  console.log(Math.floor(Math.random() * id));

//       // log.trace("Math random id", Math.random(id));
//       const { coverimgpath } = product;
//       // console.log(coverimgpath);
//       // function randomBook() {
//       //   const books = Object.keys(product);
//       //   return books[Math.floor(Math.random() * books.length)];
//       // }
//       // console.log(randomBook());
//       if (id <= 30) {
//         return `<div class="box">
//   <div class="ebook-images">
//     <img
//       class="ebook-image"
//       src="${coverimgpath}"
//       alt=""
//     />
//   </div>
//   <div class="store-pricing">
//     <!-- <h3>eBook</h3> -->
//     <div class="price"><span>$3.99</span></div>
//     <a href="#" class="buy-btn">Buy Now</a>
//   </div>
// </div>`;
//       }
//     })
//     .join("");

// ebooks.innerHTML = ` 
//       ${productList}
//    `;

// };

// const start = async () => {
//   const data = await fetchEbooks();
//   displayProducts(data);

// };

// await start();
// // log.info("Product Container", productContainer);


// fetch json for store
const ebooks = document.querySelector(".product-container");

const fetchEbooks = async () => {
    try {
        const response = await fetch("release2.json");
        // log.trace("Release2 JSON:", response);
        const data = await response.json();
        // log.trace(data);
        return data;
    } catch (error) {
        alert(error);
    }
};


function viewBooks(books) {
    ebooks.innerHTML = "";
    books.forEach((book) => {
        let box = document.createElement("div")
        box.classList.add("box")
        box.setAttribute("id", `box-${book.id}`)

        let images = document.createElement("div")
        images.classList.add("ebook-images")

        let image = document.createElement("img")
        image.classList.add("ebook-image")
        image.setAttribute("src", `${book.coverimgpath}`)
        image.setAttribute("alt", `${book.title}`)
        image.setAttribute("usd_price", `${book.usd_price}`);

        images.appendChild(image)

        let a = document.createElement("a")
        a.setAttribute("href", `https://tbtm.sale/book/${book.isbn}`)
        a.appendChild(image)
        box.appendChild(a)
        ebooks.appendChild(box)
    });
};


const all = await fetchEbooks();

function pickRandomBooks(max, books) {
    let randomBooks = [];
    let ids = books.map((book) => book.id);
    let listPos = [];
    for (let i = 0; i < max; i++) {
        let id = Math.floor(Math.random() * ids.length);
        if (!listPos.includes(id)) {
            listPos.push(id);
        } else {
            i--;
        }
    }
    // log.info("Random Ids:", listPos);
    for (let i = 0; i < listPos.length; i++) {
        let book = books[listPos[i]];
        randomBooks.push(book);
    }
    // log.info("Random Books:", randomBooks);
    return randomBooks;
}

const showRandomBooks = async () => {
    let books = pickRandomBooks(30, all);
    viewBooks(books);
    //  const productContainer = document.querySelector(".product-container");
    const slide = document.querySelector(".box");
};

showRandomBooks();

//run showRandomBooks function every 5 seconds
setInterval(showRandomBooks, 100000);

// popup

// custom slider
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slider = document.getElementById("slider");
const boxes = document.querySelectorAll('.box')
// const position = boxes[0].getBoundingClientRect().width;
// console.log(position);

// let containerDimensions = slider.getBoundingClientRect();
// let containerWidth = containerDimensions.width;
// nextBtn.addEventListener("click", () => {
//   slider.scrollLeft += containerWidth;
// });
// prevBtn.addEventListener("click", () => {
//   slider.scrollLeft -= containerWidth;
// });

// slider autoplay
let maxScrollLeft = slider.scrollWidth - slider.clientWidth;

function autoplay() {
    if (slider.scrollLeft > (maxScrollLeft - 1)) {
        clearInterval(play)
        slider.scrollLeft -= slider.scrollWidth;
    } else {
        slider.scrollLeft += 1;
    }
}

let play = setInterval(autoplay, 50);

nextBtn.addEventListener("click", () => {
    clearInterval(play);
    slider.scrollLeft += 700;
});
prevBtn.addEventListener("click", () => {
    clearInterval(play);
    slider.scrollLeft -= 700;
});
boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        clearInterval(play);
    })
    box.addEventListener('mouseleave', () => {
        return play = setInterval(autoplay, 50);
    })
})

// disable slider autoplay
function clearAutoPlay(){
    clearInterval(play);
}

//////////////////////////////////////////////////
//
// Making a collage of books from the json file
// See https://photoswipe.com/getting-started/
// Install: npm i photoswipe --save
//
//////////////////////////////////////////////////

const gallery = document.getElementById("gallery");

let maxBooks = 0;

function mediaQueryChange() {
    let mobile = window.matchMedia("(max-width: 425px)");
    if (mobile.matches) {
        // window width is at less than 425px
        maxBooks = 24;
         clearAutoPlay()
        // log.info("maxBooks = 24");
    }
    let tablet = window.matchMedia("(min-width: 768px)");
    if (tablet.matches) {
        // window width is at greater than 768px
        maxBooks = 45;
        // log.info("maxBooks = 45");
    }
    let laptopS = window.matchMedia("(min-width: 1058px)");
     if (laptopS.matches) {
        // window width is at greater than 1058px
        maxBooks = 63;
        // log.info("maxBooks = 63");
    }
    let laptopM = window.matchMedia("(min-width: 1356px)");
     if (laptopM.matches) {
        // window width is at greater than 1356px
        maxBooks = 80;
        // log.info("maxBooks = 80");
    }
    let laptopL = window.matchMedia("(min-width: 1628px)");
     if (laptopL.matches) {
        // window width is at greater than 1628px
        maxBooks = 96;
        // log.info("maxBooks = 98");
    }
    
    ResetGallery();
}

mediaQueryChange();

function ResetGallery() {
    gallery.innerHTML = "";
    let collage = pickRandomBooks(maxBooks, all);
    let cnt = 0;
    //generate a-element for each picture from the collage array
    collage.forEach((collage) => {
        let a = document.createElement("a");
        //set id to each a-element to make it unique
        a.setAttribute("id", `a-${cnt}`);
        a.href = `${collage.coverimgpath}`;
        a.setAttribute("data-pswp-src", `${collage.coverimgpath.replace(".jpg", "-thumbnail.jpg")}`);
        a.setAttribute("data-pswp-width", "800");
        a.setAttribute("data-pswp-height", "1290");
        a.target = "_blank";
        let thumbnail = document.createElement("img");
        thumbnail.src = `${collage.coverimgpath.replace(".jpg", "-femto.jpg")}`;
        thumbnail.alt = ``;
        //slowly fade in the thumbnail to fully visible in 2.1 seconds using css
        //pick random number between 0 and 2000
        let random = Math.floor(Math.random() * 2500);
        thumbnail.style.transition = `opacity 1s ease-in ${random}ms`;
        thumbnail.style.opacity = "0";
        setTimeout(() => {
            thumbnail.style.opacity = "1";
        }, 0);
        thumbnail.width = "40";
        thumbnail.height = "62.5";
        a.appendChild(thumbnail);
        gallery.appendChild(a);
        cnt += 1;
    });

    // const lightbox = new PhotoSwipeLightbox({
    //     // may select multiple "galleries"
    //     gallery: "#gallery",
    //     // Elements within gallery (slides)
    //     children: "a",
    //     // setup PhotoSwipe Core dynamic import
    //     pswpModule: () =>
    //         import("./node_modules/photoswipe/dist/photoswipe.esm.js"),
    // });
    // lightbox.init();
}

ResetGallery();

function changeGallery() {
    let id = Math.floor(Math.random() * maxBooks);
    let collage = pickRandomBooks(1, all)[0];
    let a = document.getElementById(`a-${id}`);
    a.style.transition = `visibility 3s 3s, opacity 3s linear`;
    a.style.opacity = "0";
    setTimeout((id) => {
        let a = document.getElementById(`a-${id}`);
        if(a.style === null){
        
        }else{
        a.style.opacity = "1";
        }
        a.href = `${collage.coverimgpath}`;
        a.setAttribute(
            "data-pswp-src",
            `${collage.coverimgpath.replace(".jpg", "-thumbnail.jpg")}`
        );
        a.setAttribute("data-pswp-width", "800");
        a.setAttribute("data-pswp-height", "1290");
        a.target = "_blank";
        let thumbnail = document.createElement("img");
        thumbnail.src = `${collage.coverimgpath.replace(".jpg", "-femto.jpg")}`;
        thumbnail.alt = ``;
        let random = Math.floor(Math.random() * 500);
        thumbnail.style.transition = `opacity 1s ease-in ${random}ms`;
        thumbnail.style.opacity = "0";
        setTimeout(() => {
            thumbnail.style.opacity = "1";
        }, random);
        thumbnail.width = "40";
        thumbnail.height = "62.5";
        a.removeChild(a.firstChild);
        a.appendChild(thumbnail);
    }, 2800, id);
}

//after 30 seconds clear the gallery and generate a new collage
setInterval(changeGallery, 90);


//sense when dimensions change
window.addEventListener("resize", function () {
    // log.info("resize width: " + window.innerWidth + " height: " + window.innerHeight);
    mediaQueryChange();
});
