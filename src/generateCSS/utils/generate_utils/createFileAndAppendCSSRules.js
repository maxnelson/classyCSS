import fs from "fs";
import path from "path";

export function createFileAndAppendCSSRules(propertyName, fileContent) {
  const outputDir = path.join(global.__basedir, "dist", "css");
  const combinedOutputDir = path.join(global.__basedir, "dist");
  const fileName = propertyName + ".scss";
  const filePath = path.join(outputDir, fileName);
  const combinedFile = path.join(combinedOutputDir, "combined.scss");
  const combinedFileContent = '@import "' + "css/" + fileName + '";\n';
  if (fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, fileContent, "utf8");
  } else {
    fs.writeFileSync(filePath, fileContent, "utf8");
    fs.appendFileSync(combinedFile, combinedFileContent, "utf8");
  }
}
