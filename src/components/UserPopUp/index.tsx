
import styles from "./styles.module.scss";

import { 
  FiRefreshCw, 
  FiTrash2 
} from "react-icons/fi";
// import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from '../../contexts/databaseContext'
import { useContext } from "react";

type TUserPopUp = {
  routeId: string,
  handleClose: Function
}

export function UserPopUp({ routeId, handleClose }: TUserPopUp) {

  const [databaseData, setDatabaseData] = useContext(UserContext)

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
      else {
        return setDatabaseData({ users: [] })
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

  function deleteUser(userId:string) {

    Swal.fire({
      title: "Cuidado!",
      text: "Tem certeza que deseja apagar este usuário?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:3333/api/v1/users/${userId}`;
    
        try { 
          const options = {
            method: "DELETE",
          }

          const data = await fetch(url,options)
    
          if(data.ok) {
            Swal.fire({
                title: 'Sucesso!',
                text: await data.text(),
                icon: 'success',
                confirmButtonText: "Ok"
            }).then(()=>{
              getAllUsers();
            })
          } else {
            throw await data.text();
          }
    
    
        } catch(err) {
          Swal.fire({
              title: 'Erro!',
              text: err,
              icon: 'error',
              confirmButtonText: "Tentar novamente"
          })
        }
      }
    })

  }

  return (
    <div 
      className={styles.popUpContainer}
      onClick={()=>handleClose()}
    >
      <div className={styles.popUpOptions}>
        <Link to={`/updateUser/${routeId}`}>
          <p>
            Atualizar
            <FiRefreshCw 
              size="2rem"
              color="#00DA8B"
            />
          </p>
        </Link>
          <p onClick={()=>{deleteUser(routeId)}}>
            Deletar 
            <FiTrash2 
              size="2rem"
              color="#FF2D2D"
            />
          </p>
      </div>
    </div>
  );
}
