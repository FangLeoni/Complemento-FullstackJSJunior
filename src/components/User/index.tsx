
import styles from "./styles.module.scss";

import { 
  FiUser, 
  FiClipboard, 
  FiMail, 
  FiLock
} from "react-icons/fi";
import { useState } from "react";
import { UserPopUp } from "../UserPopUp";

import Swal from 'sweetalert2';

type TUserComponent = {
  id: string;
  email: string;
  senha: string;
}

export function User({id, email, senha}:TUserComponent) {

  const [isOpen, setIsOpen] = useState(false);

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  function copyText(text:string) {
    navigator.clipboard.writeText(text)

    Swal.fire({
      title: "Copiado!",
      position: 'bottom-start',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      width: "20rem",
      toast: true,
    })

  }

  return (
    <>
      <div 
        className={ `${styles.userContainer} ${isOpen ? styles.selected : ""}`}
        onClick={()=>{ togglePopup()}}
      >
        <div className={styles.row}>
          <FiUser 
            size="2rem"
            color="#000"
            title="Ola meus amigos"
          />
          <p>
            {id}
          </p>
          <FiClipboard 
            size="2rem"
            color="#000"
            title="Ola meus amigos"
            onClick={(event)=>{
              copyText(id)
              event.stopPropagation();
            }}
          />
        </div>

        <div className={styles.row}>
          <FiMail 
            size="2rem"
            color="#000"
            title="Ola meus amigos"
          />
          <p>
            {email}
          </p>
          <FiClipboard 
            size="2rem"
            color="#000"
            title="Ola meus amigos"
            onClick={(event)=>{
              copyText(email)
              event.stopPropagation();
            }}
          />
        </div>

        <div className={styles.row}>
          <FiLock 
            size="2rem"
            color="#000"
            title="Ola meus amigos"
          />
          <p>
            {senha}
          </p>
          <FiClipboard 
            size="2rem"
            color="#000"
            title="Ola meus amigos"
            onClick={(event)=>{
              copyText(senha)
              event.stopPropagation();
            }}
          />
        </div>
        </div>

        <div className={styles.separator}></div>

        {
          isOpen 
        && 
          <UserPopUp 
            routeId={id}
            handleClose={togglePopup}
          />
        }
    </>
  );
}
