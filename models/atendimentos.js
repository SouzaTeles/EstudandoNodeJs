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
    const clientEhValido = atendimento.cliente.length >= 5;

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

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
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

  lista(res) {
    const sql = "SELECT * FROM Atendimentos";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(res, id) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(resultados);
      }
    });
  }

  altera(res, id, valores) {
    const sql = "UPDATE Atendimentos set ? where ?";

    if (valores.data) {
      const data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD hh:mm:ss"
      );
      valores = { ...valores, data };
    }
    if (valores.dataCriacao) {
      const dataCriacao = moment(valores.dataCriacao).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      valores = { ...valores, dataCriacao };
    }
    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  deleta(res, id) {
    const sql = `DELETE FROM Atendimentos WHERE ID = ${id}`;
    conexao.query(sql, (erro, resultados) => {
      if (erro) res.status(400).json(erro);
      else res.status(200).json(id);
    });
  }
}

module.exports = new Atendimento();
