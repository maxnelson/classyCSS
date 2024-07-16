import fs from "fs";
import path from "path";

export function createFileAndAppendCSSRules(propertyName, fileContent) {
  const outputDir = path.join(global.__basedir, "dist", "css");
  const fileName = propertyName + ".css";
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, fileContent, "utf8");
}
