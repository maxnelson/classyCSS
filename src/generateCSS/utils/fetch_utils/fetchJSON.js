import { readdirSync, rmSync } from "fs";
import path from "path";
import { fetchJSONFromFile } from "#root/src/generateCSS/utils/fetch_utils/fetchJSONFromFile.js";
import { parseJSONFileResponseData } from "#root/src/generateCSS/utils/parse_utils/parseJSONFileResponseData.js";

export async function fetchJSON() {
  const distDirectory = path.join(global.__basedir, "dist", "css");
  readdirSync(distDirectory).forEach((file) => {
    rmSync(distDirectory + "/" + file);
  });
  const CSSFile = path.join(
    global.__basedir,
    "src",
    "cachedCSS",
    "css",
    "CSS.json"
  );
  const responseDataCSSFile = await fetchJSONFromFile(CSSFile);
  parseJSONFileResponseData(responseDataCSSFile);

  const CSSAlignFile = path.join(
    global.__basedir,
    "src",
    "cachedCSS",
    "css",
    "css-align.json"
  );
  const responseDataCSSAlignFile = await fetchJSONFromFile(CSSAlignFile);
  parseJSONFileResponseData(responseDataCSSAlignFile);

  const CSSBackgroundsFile = path.join(
    global.__basedir,
    "src",
    "cachedCSS",
    "css",
    "css-backgrounds.json"
  );
  const responseDataCSSBackgroundsFile = await fetchJSONFromFile(
    CSSBackgroundsFile
  );
  parseJSONFileResponseData(responseDataCSSBackgroundsFile);

  const CSSFlexboxFile = path.join(
    global.__basedir,
    "src",
    "cachedCSS",
    "css",
    "css-flexbox.json"
  );
  const responseDataCSSFlexboxFile = await fetchJSONFromFile(CSSFlexboxFile);
  parseJSONFileResponseData(responseDataCSSFlexboxFile);
}
