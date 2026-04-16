import { useState } from "react";
import "./BuscaCEP.css";

function BuscaCEP() {
  const [cep, setCep] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function buscar() {
    const numeros = cep.replace(/\D/g, "");
    if (numeros.length !== 8) {
      setErro("Digite um CEP com 8 dígitos.");
      setResultado(null);
      return;
    }
    setCarregando(true);
    setErro("");
    setResultado(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${numeros}/json/`);
      const dados = await res.json();
      if (dados.erro) {
        setErro("CEP não encontrado. Verifique e tente novamente.");
      } else {
        setResultado(dados);
      }
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  function formatarCEP(valor) {
    const n = valor.replace(/\D/g, "").slice(0, 8);
    if (n.length > 5) return n.slice(0, 5) + "-" + n.slice(5);
    return n;
  }

  return (
    <div className="card">
      <h2 className="card-titulo">Buscador de CEP</h2>

      <p className="cep-hint">Digite o CEP para consultar o endereço completo</p>

      <div className="row" style={{ marginBottom: "1rem" }}>
        <input
          className="input flex1"
          placeholder="Ex: 01310-100"
          value={cep}
          onChange={(e) => setCep(formatarCEP(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
          maxLength={9}
        />
        <button className="btn btn-primary" onClick={buscar} disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {erro && <p className="cep-erro">{erro}</p>}

      {resultado && (
        <div className="cep-resultado">
          <div className="cep-badge">{resultado.cep}</div>
          <div className="cep-campos">
            {[
              ["Logradouro", resultado.logradouro],
              ["Complemento", resultado.complemento || "—"],
              ["Bairro", resultado.bairro],
              ["Cidade", resultado.localidade],
              ["Estado", resultado.uf],
              ["IBGE", resultado.ibge],
              ["DDD", resultado.ddd],
            ].map(([label, valor]) => (
              <div key={label} className="cep-campo">
                <span className="cep-label">{label}</span>
                <span className="cep-valor">{valor || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscaCEP;