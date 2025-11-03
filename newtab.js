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
async function findFolderByPath(rootTitle, leafTitle) {
  const tree = await browser.bookmarks.getTree();
  function dfs(nodes) {
    for (const n of nodes) {
      if (n.title === rootTitle && n.type === 'folder') return n;
      if (n.children) { const r = dfs(n.children); if (r) return r; }
    }
    return null;
  }
  const mobileRoot = dfs(tree);
  if (!mobileRoot) return null;

  function findChildFolder(node, title) {
    if (!node.children) return null;
    for (const c of node.children) {
      if (c.type === 'folder' && c.title === title) return c;
    }
    return null;
  }
  return findChildFolder(mobileRoot, leafTitle);
}

async function renderFolder() {
  const list = document.getElementById('bm-list');
  const warn = document.getElementById('bm-warn');
  list.innerHTML = '';
  try {
    const folder = await findFolderByPath('Mobile Bookmarks', 'Get Interested');
    if (!folder) { warn.hidden = false; return; }
    const children = await browser.bookmarks.getChildren(folder.id);
    // Sort: bookmarks first, then subfolders; title ascending
    children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'bookmark' ? -1 : 1;
      return (a.title || '').localeCompare(b.title || '');
    });
    for (const n of children) {
      const li = document.createElement('li');
      if (n.type === 'bookmark' && n.url) {
        const url = new URL(n.url);
li.innerHTML = `<a href="${n.url}">${n.title || url.hostname}</a> <span class="time">${url.hostname}</span>`;
      } else if (n.type === 'folder') {
        li.textContent = '📁 ' + (n.title || 'Untitled folder');
      } else {
        li.textContent = n.title || '(item)';
      }
      list.appendChild(li);
    }
  } catch (err) {
    warn.hidden = false;
  }
}
renderFolder();

// Search provider shortcuts
document.getElementById('search').addEventListener('submit', (e) => {
  const input = e.target.querySelector('input[name="q"]');
  const q = input.value.trim();
  if (q.startsWith('g:')) { e.target.action = 'https://www.google.com/search'; input.value = q.slice(2).trim(); }
  else if (q.startsWith('w:')) { e.target.action = 'https://en.wikipedia.org/w/index.php'; input.name = 'search'; input.value = q.slice(2).trim(); }
  else { e.target.action = 'https://duckduckgo.com/'; e.target.method = 'GET'; input.name = 'q'; }
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

