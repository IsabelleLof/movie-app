import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
//import dotenv from "dotenv";

// Load environment variables from .env file
//dotenv.config();

const BASE_URL = "https://movie-app-isabellelof-isabellelofs-projects.vercel.app/";

// Check if the API token is loaded correctly
// const TMDB_API_TOKEN = process.env.VITE_TMDB_API_TOKEN;
// if (!TMDB_API_TOKEN) {
//   console.error("Error: TMDB API token is missing. Please check your .env file.");
//   process.exit(1); // Exit if the token is missing
// }

// Statiska URL:er
const staticPaths = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/favorites", changefreq: "weekly", priority: 0.8 },
];

// Funktion för att hämta dynamiska sidor
async function fetchDynamicPaths() {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmY4OTU1Y2FjNDNiNmU5MzEzMjY2NGFmYmNiMGFmMCIsIm5iZiI6MTczMDk3OTczMi45NDA1MjQzLCJzdWIiOiI2NzBlNWRkNzlmMzUzMWU2YjI2YzZjNTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i315z2ljPp3rsgsz6lb4h1sSrQN5RIEe3t5qgDyjStA", // Use the token from environment variable
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.statusText}`);
      return []; // Return empty array to prevent further issues
    }

    const data = await response.json();
    return data.results.map((movie) => ({
      url: `/movies/${movie.id}`, // Dynamisk URL baserad på film-ID
      changefreq: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching dynamic paths:", error);
    return []; // Return empty array to avoid crash
  }
}

// Hämta nuvarande filens namn och konvertera till en filväg
const __filename = fileURLToPath(import.meta.url); // Konvertera modulens URL till en filväg
const __dirname = path.dirname(__filename); // Hämta katalogen där filen finns

(async () => {
  const sitemapStream = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream(
    path.join(__dirname, "../..", "public", "sitemap.xml")
  );

  sitemapStream.pipe(writeStream);

  // Write static URLs to the sitemap
  staticPaths.forEach((path) => sitemapStream.write(path));

  // Fetch and write dynamic paths to the sitemap
  const dynamicPaths = await fetchDynamicPaths();
  dynamicPaths.forEach((path) => sitemapStream.write(path));

  // End the stream after all URLs are written
  sitemapStream.end();

  // Wait until the sitemap stream is complete
  await streamToPromise(sitemapStream);
  console.log("Sitemap generated successfully with dynamic paths!");
})();

