const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.lista(res);
  });
  app.get("/atendimentos/:id", (req, res) => {
    const id =  parseInt(req.params.id);
    Atendimento.buscaPorId(res, id);
  });
  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento, res);
    // console.log(req.body);
    // res.send("Você está na rota de atendimentos enviando um post.")
  });
};
