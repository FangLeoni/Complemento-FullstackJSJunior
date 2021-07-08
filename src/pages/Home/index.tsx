
import { useContext, useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

import { User } from "../../components/User";
import styles from "./styles.module.scss";

import UserContext from '../../contexts/databaseContext'

type TUser = {
  id: string;
  email: string;
  password: string;
}

export function Home() {
  
  const [searchId, setSearchId] = useState("")
  const [databaseData, setDatabaseData] = useContext(UserContext)
  // const [databaseData, setDatabaseData] = useState({users:[]})

  

  async function getAllUsers() {
    const url = `http://localhost:3333/api/v1/users/`;
    const options = {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }

    try { 
      const data = await fetch(url, options)

      if(data.ok) {
        return setDatabaseData(await data.json());
      } 
      else if(databaseData.users.length === 0) {
        return;
      }
      else {
        throw await data.text();
      }
     

    } catch(err) {
      Swal.fire({
          title: 'Erro!',
          text: err,
          icon: 'error',
          confirmButtonText: "Ok"
      })
    }
  }

  useEffect(() => {
    getAllUsers()
  },[])


  async function searchUser(userId:string) {
    
    const url = `http://localhost:3333/api/v1/users/${userId}`;

    try { 

      const options = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      }

      const data = await fetch(url, options)
      
      if(data.ok) {
        setDatabaseData(await await data.json());
      } else {
        throw await data.text()
      }

    } catch(err) {
      Swal.fire({
          title: 'Erro!',
          text: err,
          icon: 'error',
          confirmButtonText: "Ok"
      })
    }

  }

  return (
    <div className={styles.homeContainer}>
      <form onSubmit={async (e)=>{ 
        e.preventDefault();
        if(searchId !== "") {
          
          searchUser(searchId)
        } else {
          getAllUsers()
        }
      }}>
        <input 
          type="text" 
          placeholder="Procurar ID de usuário" 
          onChange={(e)=>{
            setSearchId(e.target.value.trim())
          }}
        />
      </form>

      {
        (databaseData.users.length !== 0) 
        ?
        databaseData.users.map((user: TUser, index: number)=>{
          return (
            <User 
              key={index}
              id={user.id}
              email={user.email}
              senha={user.password}
            />  
          )
        })
        :
        <h3>Não há mais usuários</h3>
      }
      

    </div>
  );
}
