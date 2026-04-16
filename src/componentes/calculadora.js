import { useState } from "react";
import "./Calculadora.css";

const TECLAS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

function Calculadora() {
  const [expressao, setExpressao] = useState("");
  const [display, setDisplay] = useState("0");
  const [novoNumero, setNovoNumero] = useState(true);

  function pressionar(tecla) {
    if (tecla === "C") {
      setExpressao("");
      setDisplay("0");
      setNovoNumero(true);
      return;
    }

    if (tecla === "=") {
      try {
        const expr = expressao.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
        const resultado = Function('"use strict"; return (' + expr + ")")();
        const res = Number.isInteger(resultado)
          ? String(resultado)
          : parseFloat(resultado.toFixed(10)).toString();
        setDisplay(isFinite(resultado) ? res : "Erro");
        setExpressao(isFinite(resultado) ? res : "");
        setNovoNumero(true);
      } catch {
        setDisplay("Erro");
        setExpressao("");
      }
      return;
    }

    const operadores = ["÷", "×", "+", "−"];

    if (operadores.includes(tecla)) {
      const expr = expressao.endsWith(tecla) ? expressao.slice(0, -1) : expressao;
      setExpressao(expr + tecla);
      setDisplay(tecla);
      setNovoNumero(true);
      return;
    }

    if (tecla === "±") {
      const n = parseFloat(display);
      const novo = String(-n);
      setDisplay(novo);
      setExpressao(novo);
      return;
    }

    if (tecla === "%") {
      const n = parseFloat(display);
      const novo = String(n / 100);
      setDisplay(novo);
      setExpressao(novo);
      return;
    }

    if (tecla === ".") {
      if (novoNumero) {
        setExpressao(expressao + "0.");
        setDisplay("0.");
        setNovoNumero(false);
      } else if (!display.includes(".")) {
        setExpressao(expressao + ".");
        setDisplay(display + ".");
      }
      return;
    }

    if (novoNumero) {
      const ops = ["÷", "×", "+", "−"];
      if (ops.some((o) => expressao.endsWith(o))) {
        setExpressao(expressao + tecla);
      } else {
        setExpressao(tecla);
      }
      setDisplay(tecla);
      setNovoNumero(false);
    } else {
      setExpressao(expressao + tecla);
      setDisplay(display === "0" ? tecla : display + tecla);
    }
  }

  function tipoTecla(t) {
    if (t === "C") return "calc-btn limpar";
    if (t === "=") return "calc-btn igual";
    if (["÷", "×", "+", "−"].includes(t)) return "calc-btn operador";
    if (["±", "%"].includes(t)) return "calc-btn funcao";
    return "calc-btn";
  }

  return (
    <div className="calc-wrapper">
      <div className="card calc-card">
        <h2 className="card-titulo">Calculadora</h2>

        <div className="calc-display">
          <div className="calc-expr">{expressao || " "}</div>
          <div className="calc-resultado">
            {display.length > 12
              ? parseFloat(display).toExponential(4)
              : display}
          </div>
        </div>

        <div className="calc-teclado">
          {TECLAS.map((linha, li) =>
            linha.map((t) => (
              <button
                key={t}
                className={`${tipoTecla(t)}${t === "0" ? " zero" : ""}`}
                onClick={() => pressionar(t)}
              >
                {t}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculadora;