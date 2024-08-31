import { PurgeCSS } from "purgecss";
import fs from "fs";

export default function classyCSSPlugin(options) {
  return {
    name: "advanced-purgecss-plugin",
    async handleHotUpdate(context) {
      console.log("File Modified: ");
      console.log(context.file);
      if (context.file.includes(options.outputFilePath)) {
        console.log("prevent recursion");
        return [];
      } else {
        try {
          const result = await new PurgeCSS().purge({
            content: options.contentPaths,
            css: ["node_modules/@modularmoon/classycss/dist/main.css"],
            safelist: options.safelist || [],
          });
          if (result.length > 0) {
            const purgedCSS = result[0].css;
            fs.writeFileSync(options.outputFilePath, purgedCSS);
            console.log(`PurgeCSS output written to ${options.outputFilePath}`);
          } else {
            console.log("No CSS to purge");
          }
        } catch (error) {
          console.error("Error running PurgeCSS:", error);
        }
        return [];
      }
    },
  };
}
