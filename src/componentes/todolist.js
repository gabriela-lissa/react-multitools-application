import { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");

  function adicionar() {
    const t = texto.trim();
    if (!t) return;
    setTarefas([...tarefas, { id: Date.now(), texto: t, feito: false }]);
    setTexto("");
  }

  function alternar(id) {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, feito: !t.feito } : t)));
  }

  function remover(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  function limparConcluidas() {
    setTarefas(tarefas.filter((t) => !t.feito));
  }

  const concluidas = tarefas.filter((t) => t.feito).length;

  return (
    <div className="card">
      <h2 className="card-titulo">To-Do List</h2>

      <div className="row" style={{ marginBottom: "1rem" }}>
        <input
          className="input flex1"
          placeholder="Nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
        />
        <button className="btn btn-primary" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      {tarefas.length === 0 ? (
        <p className="vazio">Nenhuma tarefa ainda. Adicione uma acima!</p>
      ) : (
        <ul className="lista">
          {tarefas.map((t) => (
            <li key={t.id} className="item">
              <input
                type="checkbox"
                checked={t.feito}
                onChange={() => alternar(t.id)}
                className="checkbox"
              />
              <span className={`item-texto ${t.feito ? "feito" : ""}`}>
                {t.texto}
              </span>
              <button className="btn btn-sm btn-danger" onClick={() => remover(t.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      {tarefas.length > 0 && (
        <div className="rodape">
          <span className="contador-texto">
            {concluidas}/{tarefas.length} concluída(s)
          </span>
          <button className="btn btn-sm btn-danger" onClick={limparConcluidas}>
            Remover concluídas
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoList;