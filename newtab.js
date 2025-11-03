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
// ----- Bookmarks via Raindrop RSS -----
async function renderRSS() {
  const list = document.getElementById('bm-list');
  const warn = document.getElementById('bm-warn');
  list.innerHTML = '';

  try {
    const response = await fetch('https://bg.raindrop.io/rss/public/62744774');
    if (!response.ok) throw new Error('Network error');
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 10);

    for (const item of items) {
      const title = item.querySelector('title')?.textContent ?? '(no title)';
      const link = item.querySelector('link')?.textContent ?? '#';
      const li = document.createElement('li');
      li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      list.appendChild(li);
    }
  } catch (err) {
    console.error(err);
    warn.hidden = false;
  }
}

renderRSS();





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

