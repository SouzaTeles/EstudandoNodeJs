const customExpress = require("./config/customExpress");
const app = customExpress();
const conexao = require("./infraestrutura/conexao");

conexao.connect(erro => {
    if(erro){
        console.log(erro);
    } else {
        console.log("foi")
        app.listen(3000, () => console.log("servidor rodando na porta 3000"));
    }
});
app.get("/", (req, res) => res.send("Servidor rodando, tudo ok"));
