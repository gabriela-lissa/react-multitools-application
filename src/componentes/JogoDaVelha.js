import { useState } from "react";
import "./JogoDaVelha.css";

const LINHAS_VITORIA = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calcularVencedor(tabuleiro) {
  for (const [a, b, c] of LINHAS_VITORIA) {
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return tabuleiro[a];
    }
  }
  return null;
}

function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [ehX, setEhX] = useState(true);
  const [placar, setPlacar] = useState({ X: 0, O: 0, Empate: 0 });

  const vencedor = calcularVencedor(tabuleiro);
  const tabuleiroCheioe = tabuleiro.every(Boolean);
  const jogoAcabou = vencedor || tabuleiroCheioe;

  let status;
  if (vencedor) status = `🎉 ${vencedor} venceu!`;
  else if (tabuleiroCheioe) status = "🤝 Empate!";
  else status = `Vez de ${ehX ? "X" : "O"}`;

  function clicarCelula(i) {
    if (tabuleiro[i] || jogoAcabou) return;
    const novo = [...tabuleiro];
    novo[i] = ehX ? "X" : "O";
    const novoVencedor = calcularVencedor(novo);
    const novoTabuleiroCheioe = novo.every(Boolean);
    if (novoVencedor) {
      setPlacar((p) => ({ ...p, [novoVencedor]: p[novoVencedor] + 1 }));
    } else if (novoTabuleiroCheioe) {
      setPlacar((p) => ({ ...p, Empate: p.Empate + 1 }));
    }
    setTabuleiro(novo);
    setEhX(!ehX);
  }

  function novoJogo() {
    setTabuleiro(Array(9).fill(null));
    setEhX(true);
  }

  function zerarPlacar() {
    setPlacar({ X: 0, O: 0, Empate: 0 });
    novoJogo();
  }

  return (
    <div className="card">
      <h2 className="card-titulo">Jogo da Velha</h2>

      <p className={`jv-status ${jogoAcabou ? "fim" : ""}`}>{status}</p>

      <div className="jv-grid">
        {tabuleiro.map((val, i) => (
          <button
            key={i}
            className={`jv-celula ${val === "X" ? "x" : val === "O" ? "o" : ""} ${jogoAcabou && !val ? "bloqueada" : ""}`}
            onClick={() => clicarCelula(i)}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="jv-acoes">
        <button className="btn btn-primary" onClick={novoJogo}>Novo Jogo</button>
        <button className="btn" onClick={zerarPlacar}>Zerar Placar</button>
      </div>

      <div className="jv-placar">
        <div className="placar-item x">
          <span className="placar-num">{placar.X}</span>
          <span className="placar-label">X — Vitórias</span>
        </div>
        <div className="placar-item empate">
          <span className="placar-num">{placar.Empate}</span>
          <span className="placar-label">Empates</span>
        </div>
        <div className="placar-item o">
          <span className="placar-num">{placar.O}</span>
          <span className="placar-label">O — Vitórias</span>
        </div>
      </div>
    </div>
  );
}

export default JogoDaVelha;