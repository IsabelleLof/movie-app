import { writeFileSync } from 'fs';
import path from 'path';

// Innehåll för robots.txt
const robotsTxtContent = `User-agent: *
Disallow: /api/
Allow: /

Sitemap: https://movie-app-ruby-rho.vercel.app/sitemap.xml
`;

// Skriv robots.txt till public-mappen
const generateRobotsTxt = () => {
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt'); // Public-mappen relativt från din script-fil
  try {
    writeFileSync(robotsPath, robotsTxtContent);
    console.log('robots.txt generated successfully!');
  } catch (error) {
    console.error('Error writing robots.txt:', error);
  }
};

// Kör funktionen
generateRobotsTxt();
