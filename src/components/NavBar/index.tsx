
import styles from "./styles.module.scss";

import ConteleLogo from '../../assets/images/contele_logo.svg';
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { Link } from "react-router-dom";

import Swal from 'sweetalert2';
import { useContext } from "react";

import UserContext from '../../contexts/databaseContext'

export function Navbar() {

  const [, setDatabaseData] = useContext(UserContext)
  
  function deleteAllUsers() {

    Swal.fire({
      title: "Cuidado!",
      text: "Isso irá apagar todos os usuários, tem certeza que deseja continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',

    }).then(async (result) => {
      if (result.isConfirmed) {
          const url = `http://localhost:3333/api/v1/users`;
    
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
                setDatabaseData({ users: [] })
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
    <div className={styles.NavbarContainer}>

      <FiUserX 
        size="3rem"
        color="#FFF"
        title="Ola meus amigos"
        onClick={()=>{deleteAllUsers()}}
      />

      <Link to="/" >
        <img src={ConteleLogo} alt="Logo" />
      </Link>

      <Link to="/createUser" >
        <FiUserPlus 
          size="3rem"
          color="#FFF"
          title="Ola meus amigos"
        />
      </Link>
    </div>
  );
}
