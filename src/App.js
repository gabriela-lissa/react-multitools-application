import { useState } from "react";
import TodoList from "./componentes/TodoList";
import Contador from "./componentes/Contador";
import JogoDaVelha from "./componentes/JogoDaVelha";
import Calculadora from "./componentes/Calculadora";
import BuscaCEP from "./componentes/BuscaCEP";
import "./App.css";


const abas = [
  { id: "todolist", label: "To Do List" },
  { id: "contador", label: "Contador de Cliques" },
  { id: "jogodavelha", label: "Jogo da Velha" },
  { id: "calculadora", label: "Calculadora" },
  { id: "buscacep", label: "Buscador de CEP" },
];

function App() {

  const [abaAtiva, setAbaAtiva] = useState("todolist");

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="app-title">Aplicação com multifunções - Tudo que você precisa🎀</span>
          <nav className="nav">
            {abas.map((aba) => (
              <button
                key={aba.id}
                className={`nav-btn ${abaAtiva === aba.id ? "ativo" : ""}`}
                onClick={() => setAbaAtiva(aba.id)}
              >
                {aba.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        {abaAtiva === "todolist" && <TodoList />}
        {abaAtiva === "contador" && <Contador />}
        {abaAtiva === "jogodavelha" && <JogoDaVelha />}
        {abaAtiva === "calculadora" && <Calculadora />}
        {abaAtiva === "buscacep" && <BuscaCEP  />}
      </main>
    </div>
  );
}

export default App;