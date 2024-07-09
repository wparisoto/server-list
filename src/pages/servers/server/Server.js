import { useState } from "react";
import styles from "../../servers/server/Server.module.css";

const Server = (props) => {
    const { server, updateReg, deleteReg } = props;


    const [id] = useState(server.id)
    const [nome, setNome] = useState(server.nome)
    const [projeto, setProjeto] = useState(server.projeto)
    const [descricao, setDescricao] = useState(server.descricao)
  
    const onChangeNome = (value) => {
        setNome(value)
        updateReg({id, nome, projeto, descricao})
    }

    const onChangeProjeto = (value) => {
        setProjeto(value)
        updateReg({id, nome, projeto, descricao})
     }

     const onChangeDescricao = (value) => {
      setDescricao(value)
      updateReg({id, nome, projeto, descricao})
   }

    return (
        <div className={styles.server}>
                <div className={styles.campo}>
                  <span>Nome:</span>
                  <input type="text" placeholder="Nome" value={nome} onChange={(e) => onChangeNome(e.target.value) }></input>
                </div>
                <div className={styles.campo}>
                  <span>Projeto:</span>
                  <input type="text" placeholder="Projeto" value={projeto} onChange={(e) => onChangeProjeto(e.target.value) }></input>
                </div>
                <div className={styles.campo}>
                  <span>Descrição:</span>
                  <textarea placeholder="Descrição" onChange={(e) => onChangeDescricao(e.target.value) }>{descricao}</textarea>
                </div>
              

              <div>
                <button onClick={(e) => deleteReg(server)}>Remove</button>
              </div>  
        </div>
    );
  };
  
  export default Server;
