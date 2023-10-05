const fs = require("node:fs/promises");
const path = require("node:path");

async function getImages(dirPath) {
  // * dirPath es una ruta dentro de src
  const formats = [".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"];
  // * dirPath es una ruta dentro de src ./src/...
  // * obtenemos la ruta del directorio de las imagenes
  const imagesPath = path.join(__dirname, "..", dirPath);
  // * leemos el directorio donde estan las imagenes
  const images = await fs.readdir(imagesPath);
  const filtered = images.filter((img) => formats.includes(path.extname(img)));
  return filtered.map((img) => ({
    filename: img,
    path: `${imagesPath}/${img}`,
    cid: img.split(".")[0],
  }));
}

module.exports = getImages;

// console.log(img); // * imprimo nombre de archivo
// console.log(path.extname(img)); // * obtengo extensión de archivo
