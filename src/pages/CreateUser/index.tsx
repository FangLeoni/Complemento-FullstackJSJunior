
import { 
  FormEvent, 
  useState 
} from "react";

import Swal from "sweetalert2";

import styles from "./styles.module.scss";


export function CreateUser() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confSenha, setConfSenha] = useState("")

  async function createNewUser(e:FormEvent) {
    e.preventDefault();
    if(senha === confSenha) {
      const url = "http://localhost:3333/api/v1/users";

      const newUser = {
        email,
        password: senha
      }

      const options = {
        method: "POST",
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
      <form onSubmit={(e)=> {createNewUser(e)}}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Senha</label>
          <input 
            type="password" 
            value={senha}
            onChange={(e)=>{setSenha(e.target.value)}}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Confirmar Senha</label>
          <input 
            type="password" 
            value={confSenha}
            onChange={(e)=>{setConfSenha(e.target.value)}}
          />
        </div>

        <button>CRIAR</button>
      </form>
    </div>
  );
}
