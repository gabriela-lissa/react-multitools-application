import { useState } from "react";
import "./Contador.css";

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h2 className="card-titulo">Contador de Cliques</h2>

      <p className="cont-label">Total de cliques</p>
      <p className={`cont-numero ${count > 0 ? "positivo" : count < 0 ? "negativo" : ""}`}>
        {count}
      </p>

      <div className="cont-btns">
        <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
          − Decrementar
        </button>
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          + Incrementar
        </button>
        <button className="btn" onClick={() => setCount(0)}>
          Zerar
        </button>
      </div>
    </div>
  );
}

export default Contador;