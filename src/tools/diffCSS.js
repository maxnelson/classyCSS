import { readFileSync, writeFileSync } from "fs";

export const diffCSS = () => {
  // Read the contents of the two CSS files
  const cssFile1 = readFileSync("dist/difftool/main-version1.css", "utf8");
  const cssFile2 = readFileSync("dist/main.css", "utf8");
  // Extract classnames using a regex
  const extractClassnames = (cssContent) => {
    const classnames = cssContent.match(/\.\w[\w-]*/g);
    return new Set(classnames);
  };
  const classnamesFile1 = extractClassnames(cssFile1);
  const classnamesFile2 = extractClassnames(cssFile2);
  // Find the classnames in file1 that are not in file2
  const uniqueClassnames = [...classnamesFile1].filter(
    (cn) => !classnamesFile2.has(cn)
  );
  // Write the array of unique classnames to the JSON file
  writeFileSync(
    "dist/difftool/diffedCSS.json",
    JSON.stringify(uniqueClassnames, null, 2),
    "utf8"
  );
};
diffCSS();
