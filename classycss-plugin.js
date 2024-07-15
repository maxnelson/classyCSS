import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";

export default function classyCSSPlugin(options = {}) {
  console.log("Hello World!");
  const {
    contentPaths = ["src/**/*.{js,jsx,ts,tsx,vue}"],
    cssFilePath = "src/styles/main.css",
    outputFilePath = "dist/purged.css",
  } = options;

  return {
    name: "advanced-purgecss-plugin",
    async handleHotUpdate(context) {
      console.log(`File changed: ${context.file}`);

      // Only run PurgeCSS if a content file or the main CSS file has changed
      if (
        !contentPaths.some((path) => context.file.includes(path)) &&
        !context.file.includes(cssFilePath)
      ) {
        return [];
      }

      console.log("Running PurgeCSS...");

      try {
        const result = await new PurgeCSS().purge({
          content: contentPaths,
          css: [cssFilePath],
          safelist: options.safelist || [],
        });

        if (result.length > 0) {
          const purgedCSS = result[0].css;
          fs.writeFileSync(outputFilePath, purgedCSS);
          console.log(`PurgeCSS output written to ${outputFilePath}`);
        } else {
          console.log("No CSS to purge");
        }
      } catch (error) {
        console.error("Error running PurgeCSS:", error);
      }

      return [];
    },
  };
}
