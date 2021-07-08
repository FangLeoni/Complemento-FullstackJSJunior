
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./styles.module.scss";

type TParams = {
  id: string;
}

export function UpdateUser() {

  let { id }:TParams = useParams();

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confSenha, setConfSenha] = useState("")

  async function updateOldUser(e:FormEvent, id:string) {
    e.preventDefault();

    if(senha === confSenha) {
      

      const url = `http://localhost:3333/api/v1/users/${id}`;

      const newUser = {
        email,
        password: senha
      }

      const options = {
        method: "PUT",
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      }

      try { 
        const data = await fetch(url,options)
        
        if(data.ok) {
          Swal.fire({
              title: 'Sucesso!',
              text: await data.text(),
              icon: 'success',
              confirmButtonText: "Ok"
          })
        } else {
          throw await data.text();
        }
        
        setEmail("")
        setSenha("")
        setConfSenha("")

      } catch(err) {
        Swal.fire({
            title: 'Erro!',
            text: err,
            icon: 'error',
            confirmButtonText: "Tentar novamente"
        })
      }

    } else {
      Swal.fire({
        title: "Erro!",
        text: "Senhas Diferentes",
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }

  }

  return (
    <div className={styles.createUserContainer}>
      <form onSubmit={(e)=> {updateOldUser(e, id)}}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Email Novo</label>
          <input 
            type="email" 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Senha Nova</label>
          <input 
            type="password" 
            value={senha}
            onChange={(e)=>{setSenha(e.target.value)}}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Confirmar Senha Nova</label>
          <input 
            type="password" 
            value={confSenha}
            onChange={(e)=>{setConfSenha(e.target.value)}}
          />
        </div>

        <button>ATUALIZAR</button>
      </form>
    </div>
  );
}
