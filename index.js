import { generateCSS } from "#root/src/generateCSS/generateCSS.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__basedir = path.resolve(__dirname);

generateCSS();
