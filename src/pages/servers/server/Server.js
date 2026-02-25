import { useState, useEffect, useRef } from "react";
import styles from "../../servers/server/Server.module.css";

const Server = (props) => {
  const { server, updateReg, deleteReg } = props;

  const textareaRef = useRef(null);
  const [id, setId] = useState(server.id)
  const [nome, setNome] = useState(server.nome)
  const [projeto, setProjeto] = useState(server.projeto)
  const [descricao, setDescricao] = useState(server.descricao)

  useEffect(() => {
    setId(server.id)
    setNome(server.nome)
    setProjeto(server.projeto)
    setDescricao(server.descricao)
  }, [server]);

  // Restaurar dimensões do textarea do localStorage
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const storageKey = `textarea-size-${id}`;
    const savedSize = localStorage.getItem(storageKey);

    if (savedSize) {
      const { width, height } = JSON.parse(savedSize);
      textarea.style.width = width;
      textarea.style.height = height;
    }

    // Observar mudanças no tamanho do textarea
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const sizeData = {
          width: `${width}px`,
          height: `${height}px`
        };
        localStorage.setItem(storageKey, JSON.stringify(sizeData));
      }
    });

    resizeObserver.observe(textarea);

    return () => {
      resizeObserver.disconnect();
    };
  }, [id]);

  const onChangeNome = (value) => {
    setNome(value)
    updateReg({ id, nome: value, projeto, descricao })
  }

  const onChangeProjeto = (value) => {
    setProjeto(value)
    updateReg({ id, nome, projeto: value, descricao })
  }

  const onChangeDescricao = (value) => {
    setDescricao(value)
    updateReg({ id, nome, projeto, descricao: value })
  }

  return (
    <div className={styles.server}>
      <div className={styles.campo}>
        <span>Nome:</span>
        <input type="text" className={styles.campo_input} placeholder="Nome" value={nome} onChange={(e) => onChangeNome(e.target.value)}></input>
      </div>
      <div className={styles.campo}>
        <span>Projeto:</span>
        <input type="text" className={styles.campo_input} placeholder="Projeto" value={projeto} onChange={(e) => onChangeProjeto(e.target.value)}></input>
      </div>
      <div className={styles.campo}>
        <span>Descrição:</span>
        <textarea
          ref={textareaRef}
          placeholder="Descrição"
          onChange={(e) => onChangeDescricao(e.target.value)}
          value={descricao}
          rows={10}
          cols={30}
        >
        </textarea>
      </div>








      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={(e) => deleteReg(server)}
          className={styles.deleteIcon}
          title="Remover servidor"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
    </div>
  );
};

export default Server;
