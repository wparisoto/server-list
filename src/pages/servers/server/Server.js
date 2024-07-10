import { useState, useEffect } from "react";
import styles from "../../servers/server/Server.module.css";

const Server = (props) => {
    const { server, updateReg, deleteReg } = props;


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

    const onChangeNome = (value) => {
        setNome(value)
        updateReg({id, nome: value, projeto, descricao})
    }

    const onChangeProjeto = (value) => {
        setProjeto(value)
        updateReg({id, nome, projeto: value, descricao})
     }

     const onChangeDescricao = (value) => {
      setDescricao(value)
      updateReg({id, nome, projeto, descricao: value})
   }

    return (
        <div className={styles.server}>
                <div className={styles.campo}>
                  <span>Nome:</span>
                  <input type="text" className={styles.campo_input} placeholder="Nome" value={nome} onChange={(e) => onChangeNome(e.target.value) }></input>
                </div>
                <div className={styles.campo}>
                  <span>Projeto:</span>
                  <input type="text" className={styles.campo_input} placeholder="Projeto" value={projeto} onChange={(e) => onChangeProjeto(e.target.value) }></input>
                </div>
                <div className={styles.campo}>
                  <span>Descrição:</span>
                  <textarea 
                    placeholder="Descrição" 
                    onChange={(e) => onChangeDescricao(e.target.value) } 
                    value={descricao}
                    rows={10}
                    cols={30}
                    >
                  </textarea>
                </div>
              

              <div>
                <button onClick={(e) => deleteReg(server)}>Remove</button>
              </div>  
        </div>
    );
  };
  
  export default Server;
