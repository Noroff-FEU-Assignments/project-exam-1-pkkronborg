const url = "https://tourofstadiums.kronia.one/wp-json/wp/v2/posts";
const blogList = document.getElementById("blogList");
const loadMore = document.querySelector(".load-more");
console.log(loadMore);
blogList.innerHTML = "";
let n = 1;

async function getPosts() {
  try {
    const list = url + `?per_page=9&page=${n}&_embed`;
    const response = await fetch(list);
    const result = await response.json();
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      let date = result[i].date;
      let newDate = new Date(date);
      let postedDate = `${newDate.toLocaleString("no-NO", {
        timeZone: "Europe/Oslo",
      })} `;
      let categoryName = await categories.find(
        (element) => element.id === result[i].categories[0]
      ).name;
      blogList.innerHTML += `
      <a href="post.html?id=${result[i].id}" class="card" title="${result[i].title.rendered}">
        <img src="${result[i]._embedded["wp:featuredmedia"][0].source_url}" alt="${result[i]._embedded["wp:featuredmedia"][0].alt_text}">
        <div class="card-heading">${result[i].title.rendered}</div>
        <div class="card-category">${categoryName}</div>
        <div class="card-text">Posted: ${postedDate}</div>
      </a>
      `;
    }

    // get total pages from wordpress
    const totalPages = response.headers.get("X-WP-TotalPages");

    // compare if we have reached the last page, if so hide load more button
    if (n == totalPages) {
      loadMore.style.display = "none";
    }
  } catch {
    console.log("UPS");
  }
}
getPosts(n);

// Clicking the load more posts button
loadMore.addEventListener("click", function getMore() {
  n += 1;
  console.log(n);
  getPosts(n);
});
