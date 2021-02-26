const moment = require("moment");
const conexao = require("../infraestrutura/conexao");

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD hh:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD hh:mm:ss"
    );

    //Validações
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clientEhValido = atendimento.client.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clientEhValido,
        mensagem: "Cliente deve ter pelo menos 5 caracteres",
      },
    ];

    const erros = validacoes.filters((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.json(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      const sql = "INSERT INTO Atendimentos SET ?";
      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(resultados);
        }
      });
    }
  }
}

module.exports = new Atendimento();
