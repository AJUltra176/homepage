// Greeting + date (UK)
const greet = document.getElementById('greet');
const dateEl = document.getElementById('date');
const now = new Date();
const h = now.getHours();
const name = 'Josie';
greet.textContent = (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening') + ', ' + name + '.';
dateEl.textContent = new Intl.DateTimeFormat('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(now);

// Static shortcuts (optional)
const BOOKMARKS = [
  {
    name: 'StoryGraph',
    url: 'https://app.thestorygraph.com/',
    icon: 'Assets/storygraph.svg'
  },
  {
    name: 'Audiobookshelf',
    url: 'https://homenas.tailda842d.ts.net/audiobookshelf/library/35d18d69-fed2-4060-a811-767ccb17a24c',
    icon: 'Assets/audiobookshelf.svg'
  },
  {
    name: 'HomeNas',
    url: 'https://192-168-68-52.jl9homenas.direct.quickconnect.to',
    icon: 'Assets/synology.svg'
  },
{
  name: "Instapaper",
  url: "https://www.instapaper.com",
  icon: "Assets/instapaper.svg"
},

];

const grid = document.getElementById('bookmarks');
grid.innerHTML = '';
BOOKMARKS.forEach(b => {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <a href="${b.url}">
      <img src="${b.icon}" alt="" class="icon" />
      <span class="name">${b.name}</span>
    </a>`;
  grid.appendChild(div);
});


// ----- Bookmarks folder listing: Mobile Bookmarks / Get Interested -----
fetch("https://api.raindrop.io/rest/v1/raindrops/12345678", {
  headers: { Authorization: "Bearer 9625f4e3-68e0-40a2-a53c-2190b5dc9cac" }
})
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector("#discover");
    container.innerHTML = "";
    data.items.slice(0, 10).forEach(item => {
      const link = document.createElement("a");
      link.href = item.link;
      link.textContent = item.title;
      link.target = "_blank";
      container.appendChild(link);
      container.appendChild(document.createElement("br"));
    });
  });




// --- Random Project Selector ---
const topics = [
  "Ultir",
  "Bookbinding experiments",
  "Obsidian Project Build",
  "Quote Notes Update",
  "NGA Printables",
  "Office Poster",
  "Just do some laundry",
  "KiKeng"
];

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("randomButton");
  const result = document.getElementById("randomResult");
  if (button && result) {
    button.addEventListener("click", () => {
      const choice = topics[Math.floor(Math.random() * topics.length)];
      result.textContent = choice;
    });
  }
});

