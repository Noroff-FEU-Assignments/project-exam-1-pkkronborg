const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const body = document.body;
const modalContainer = document.getElementById("modalContainer");
const modalImage = document.getElementById("bigImage");

postContainer = document.querySelector(".post-container");
postContainer.innerHTML = "";
url = `https://tourofstadiums.kronia.one/wp-json/wp/v2/posts/${id}?_embed`;

async function getDetails() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    // get country(category) name from categories
    const categoryName = await categories.find(
      (element) => element.id === result.categories[0]
    ).name;
    document.title = `Post | ${result.title.rendered}`;

    //create the html for the blog post
    postContainer.innerHTML += `
    <div class="post-details">
        <div class="top-details">
          <div class="detail-info">
            <h1>${result.title.rendered}</h1>
            <h2>Country: ${categoryName}</h2>
            <div class="details-list">
              <h2>Stadium facts</h2> 
              ${result.content.rendered}
            </div>
          </div>
          <div class="detail-image">
            <img src="${result._embedded["wp:featuredmedia"][0].source_url}" alt="${result._embedded["wp:featuredmedia"][0].alt_text}" class="post-image" id="postImage">
          </div> 
        </div>
        <div class="details-text">
          <h2>My expericence of ${result.title.rendered}</h2>
          ${result.content.rendered}
        </div>
    </div>`;

    // click on the post image to open a modal
    // Source: https://www.w3schools.com/howto/howto_css_modal_images.asp
    document.getElementById("postImage").onclick = function () {
      modalContainer.style.display = "flex";
      modalImage.src = result._embedded["wp:featuredmedia"][0].source_url;
      modalImage.alt = result._embedded["wp:featuredmedia"][0].alt_text;
    };
    // Click outside the modal to close the modal
    // Source: https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside
    body.onclick = function (e) {
      if (e.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    };
  } catch {
    console.log("UPS");
  }
}
getDetails();
