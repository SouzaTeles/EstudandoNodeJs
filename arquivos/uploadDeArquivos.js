const fs = require("fs");

fs.createReadStream("./i.jpg")
  .pipe(fs.createWriteStream("./assets/novaimagem.jpg"))
  .on("finish", () => console.log("imagem foi escrita com sucesso"));
