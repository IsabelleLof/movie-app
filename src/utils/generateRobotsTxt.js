import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url"; 

// Hämta nuvarande filens namn och konvertera till en filväg
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Innehåll för robots.txt
const robotsTxtContent = `User-agent: *
Disallow: /api/
Allow: /

Sitemap: https://movie-e0eegp3qk-isabellelofs-projects.vercel.app/sitemap.xml
`;

// Funktion för att generera robots.txt
(async () => {
  const writeStream = createWriteStream(
    path.join(__dirname, "../..", "public", "robots.txt")
  );

  writeStream.write(robotsTxtContent);
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("robots.txt generated successfully!");
  });

  writeStream.on("error", (err) => {
    console.error("Error writing robots.txt:", err);
  });
})();
