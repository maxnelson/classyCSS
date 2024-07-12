export default function classyCSSPlugin() {
  return {
    name: "classycss-plugin",
    handleHotUpdate({ file }) {
      console.log("Hello World!");
      console.log(`File changed: ${file}`);
      return [];
    },
  };
}
