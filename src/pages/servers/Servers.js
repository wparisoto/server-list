import styles from "../servers/Servers.module.css";
import Server from "./server/Server";
import { useState, useEffect } from "react";

import { db } from "../../firebase/config";
import { addDoc, updateDoc, doc, collection, getDocs } from "firebase/firestore";

const Servers = () => {
     const [loading, setLoading] = useState(true);
     const [dados, setDados] = useState({id: null, servers: []});
 
     const updateReg = (server) => {
      let index = dados.servers.findIndex(s => s.id === server.id);
      dados.servers[index].nome = server.nome
      dados.servers[index].projeto = server.projeto
      dados.servers[index].descricao = server.descricao
        
      setDados({...dados})  
      console.log(dados)
     }

     const deleteReg = (server) => {
      let index = dados.servers.findIndex(s => s.id === server.id);
      dados.servers.splice(index, 1)
      setDados({...dados})
     }

 
     const fetchPost = async () => {
         await getDocs(collection(db, "dados"))
             .then((querySnapshot)=>{               
              
              setLoading(false)

              const newData = querySnapshot.docs.map((doc) => ({
                
                id:doc.id,   
                ...doc.data()
                  }));

                  if(newData && newData.length > 0){
                    setDados(newData[0]);                
                    console.log(newData[0]);
                  }
             }).catch(err =>{
              console.log(err)
             })
     }
    
     useEffect(()=>{
         fetchPost();
     }, [])

  
     const handleAddDoc = async (e) => {
      e.preventDefault();  

      let ids = dados.servers.map(s => s.id)
      let maiorId = Math.max.apply(null, ids );

      dados.servers.push({
        id: (maiorId > 0 ? maiorId: 0) + 1, 
        nome: '', 
        projeto: '',
        descricao: ''
      }) 

      let obj = {
        ...dados
      }
      setDados(obj)
    }

    const handleUpdateDoc = async (e) => {
      e.preventDefault();  
      setLoading(true)
      if(dados.id){
          const examcollref = doc(db,'dados', dados.id)
          updateDoc(examcollref, dados).then(response => {
            setLoading(false)
          }).catch(error =>{
            console.log(error.message)
            setLoading(false)
          })
      }else{
          try {
            const docRef = await addDoc(collection(db, "dados"), {
              servers: dados.servers,    
            });
            console.log("Document written with ID: ", docRef.id);
            setLoading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false)
          }
      }
    }



    return (
      <div>
          
          <div className={styles.container}>
                {dados && dados.servers && dados.servers.map((server, index) => <Server key={index} server={server} updateReg={updateReg} deleteReg={deleteReg}></Server>)}  
          </div>
          {loading && <span>Waiting...</span>}
          {!loading && (
            <div>
              <button onClick={handleUpdateDoc} disabled={loading}>Save</button>
              <button onClick={handleAddDoc} disabled={loading}>Add</button>
          </div>
          )} 
          
          {/* {JSON.stringify(dados)} */}
      </div>
    );
  };
  
  export default Servers;
