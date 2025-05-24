
const container = document.getElementById('news-container');
const feeds = [
  'https://rss.app/feeds/qS1LgU3oWJyLoENH.xml', // G1
  'https://rss.app/feeds/gmmpw3UgDrVAlm6h.xml'  // O Dia
];

async function loadNews() {
  for (const feed of feeds) {
    try {
      const res = await fetch(feed);
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = xml.querySelectorAll("item");
      for (let i = 0; i < Math.min(3, items.length); i++) {
        const item = items[i];
        const title = item.querySelector("title")?.textContent || "Sem título";
        const link = item.querySelector("link")?.textContent || "#";
        const description = item.querySelector("description")?.textContent || "";
        const enclosure = item.querySelector("enclosure");
        const image = enclosure ? enclosure.getAttribute("url") : null;

        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          ${image ? `<img src="${image}" alt="Imagem da notícia">` : ""}
          <h2><a href="${link}" target="_blank">${title}</a></h2>
          <p>${description}</p>
        `;
        container.appendChild(div);
      }
    } catch (err) {
      console.error("Erro ao carregar feed:", feed, err);
    }
  }
}
loadNews();
