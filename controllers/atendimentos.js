module.exports = (app) => {
  app.get("/atendimentos", (req, res) =>
    res.send("Você está na rota de atendimentos")
  );
  app.post("/atendimentos", ((req, res) => {
      res.send("Você está na rota de atendimentos enviando um post.")
  }));
};
