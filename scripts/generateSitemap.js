import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Återskapa __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generera sitemap.xml
const generateSitemap = () => {
  const baseUrl = 'https://movie-app-ruby-rho.vercel.app';
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/favorites', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
  ];

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticPages.forEach((page) => {
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

