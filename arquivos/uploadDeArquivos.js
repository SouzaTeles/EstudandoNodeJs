const fs = require("fs");

fs.readFile("./i.jpg", (erro, buffer) => {
  if (erro) console.log(erro);
//   else console.log("A imagem foi bufferizada\n" + buffer);

  fs.writeFile("./assets/imagem.jpg", buffer, (erro) => {
      if(!erro) console.log('a imagem foi escrita');
  });
});
