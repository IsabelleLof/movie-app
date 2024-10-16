import { writeFileSync } from 'fs';
import path from 'path';

// Hårdkodade rutter för statiska sidor i din Movie App
const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/favorites', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
];

// Om du har dynamiskt genererade sidor som t.ex. filmer:
const dynamicPages = [
  { url: '/movie/123', changefreq: 'weekly', priority: 0.7 },
  { url: '/movie/456', changefreq: 'weekly', priority: 0.7 },
];

// Funktion för att generera sitemap.xml
const generateSitemap = () => {
  const baseUrl = 'https://movie-app-ruby-rho.vercel.app'; // Din bas-URL

  // Kombinera statiska och dynamiska sidor
  const pages = [...staticPages, ...dynamicPages];

  // Generera sitemap-innehållet
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach((page) => {
    sitemapContent += `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
  });

  sitemapContent += `\n</urlset>`;

  // Skriv sitemap.xml till public-mappen
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  try {
    writeFileSync(sitemapPath, sitemapContent);
    console.log('sitemap.xml generated successfully!');
  } catch (error) {
    console.error('Error writing sitemap.xml:', error);
  }
};

// Kör funktionen
generateSitemap();
