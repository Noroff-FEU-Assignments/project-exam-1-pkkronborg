const url = "https://tourofstadiums.kronia.one/wp-json/wp/v2/posts";
const latestPosts = url + `?per_page=9&_embed`;
const carousel = document.getElementsByClassName("carousel");
const prevCarousel = document.getElementById("previousCarousel");
const nextCarousel = document.getElementById("nextCarousel");
const carouselOne = document.querySelector(".carousel-one");
const carouselTwo = document.querySelector(".carousel-two");
const carouselThree = document.querySelector(".carousel-three");

console.log(prevCarousel);
carouselOne.innerHTML = "";

async function getLatestPost() {
  try {
    // get the 9 latest posts
    const response = await fetch(latestPosts);
    const result = await response.json();
    for (let i = 0; i < result.length; i++) {
      // change date format
      let date = result[i].date;
      let newDate = new Date(date);
      let postedDate = `${newDate.toLocaleString("no-NO", {
        timeZone: "Europe/Oslo",
      })}`;

      // Get the category id for each post and give it the correct country name
      let categoryName = await categories.find(
        (element) => element.id === result[i].categories[0]
      ).name;

      // create html for the three carousel slides
      let html = `
      <a href="post.html?id=${result[i].id}" class="card" title="${result[i].title.rendered}">
        <img src="${result[i]._embedded["wp:featuredmedia"][0].source_url}" alt="${result[i]._embedded["wp:featuredmedia"][0].alt_text}">
        <div>
          <div class="card-heading">${result[i].title.rendered}</div>
          <div class="card-category">${categoryName}</div>
          <div class="card-text">Posted: ${postedDate}</div>
        </div>
      </a>
      `;

      if (i <= 2) {
        carouselOne.innerHTML += html;
      } else if (i > 2 && i <= 5) {
        carouselTwo.innerHTML += html;
      } else {
        carouselThree.innerHTML += html;
      }
    }
  } catch {
    console.log("Ups");
  }
}

// source: https://www.w3schools.com/howto/howto_js_slideshow.asp
// carouselIndex starts at 1, so that if it reaches 0 we can start at the last slide
let carouselIndex = 1;
displayCarousel(carouselIndex);

function displayCarousel(n) {
  // If carousel goes above the last slide it starts at the first slide
  if (n > carousel.length) {
    carouselIndex = 1;
  }
  // If carousel goes under the first slide it goes to the last slide
  if (n < 1) {
    carouselIndex = carousel.length;
  }
  // Hide all slides
  for (let i = 0; i < carousel.length; i++) {
    carousel[i].style.display = "none";
  }
  // Show slide that are in focus, -1 to subtract setting the carouselIndex to 1
  carousel[carouselIndex - 1].style.display = "grid";
}

getLatestPost();

// Event listener to listen for click on previous slide icon
prevCarousel.addEventListener("click", function carouselGo() {
  displayCarousel((carouselIndex += -1));
});

// Event listener to listen for click on next slide icon
nextCarousel.addEventListener("click", function carouselGo() {
  displayCarousel((carouselIndex += 1));
});
