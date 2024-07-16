import { readdirSync, rmSync } from "fs";
import path from "path";
import { fetchJSONFromFile } from "#root/src/generateCSS/utils/fetch_utils/fetchJSONFromFile.js";
import { parseJSONFileResponseData } from "#root/src/generateCSS/utils/parse_utils/parseJSONFileResponseData.js";

export async function fetchJSON() {
  const distDirectory = path.join(global.__basedir, "dist", "css");
  readdirSync(distDirectory).forEach((file) => {
    rmSync(distDirectory + "/" + file);
  });
  const CSSAlignFile = path.join(
    global.__basedir,
    "src",
    "cachedCSS",
    "css",
    "css-align.json"
  );
  const responseDataCSSAlignFile = await fetchJSONFromFile(CSSAlignFile);
  parseJSONFileResponseData(responseDataCSSAlignFile);
}
