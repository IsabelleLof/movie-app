import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import "dotenv/config"; // Loads environment variables

// Function to generate sitemap
const generateSitemap = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VITE_TMDB_API_KEY}`
    );
    const data = await response.json();

    // Check if results exist in the API response
    if (!data.results || data.results.length === 0) {
      throw new Error("No results found in the API response");
    }

    // Construct URLs for each movie based on API response
    const urls = data.results.map(
      (movie) => `
      <url>
        <loc>https://movie-night-taupe.vercel.app/movie-details/${movie.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `
    );

    // Complete sitemap structure
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}
    </urlset>`;

    // Write sitemap to the public folder
    fs.writeFileSync(path.join("public", "sitemap.xml"), sitemap);
    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

generateSitemap();

