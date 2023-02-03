url = `https://tourofstadiums.kronia.one/wp-json/wp/v2/categories`;
const categories = [];

async function getCategories() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      categories.push({ name: result[i].name, id: result[i].id });
    }
    return categories;
  } catch {
    console.log("UPS");
  }
}
console.log(categories);
getCategories();
