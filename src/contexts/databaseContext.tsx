import { SetStateAction } from 'react';
import { createContext, useState, ReactNode, Dispatch } from 'react';

type TUser = {
  id: string;
  email: string;
  password: string;
}

type TDatabaseContext = [
  databaseData: {users:TUser[]},
  setDatabaseData: Dispatch<SetStateAction<{ users: never[]; }>>
]

export const DatabaseContext = createContext({} as TDatabaseContext);


type DatabaseProviderProps = {
  children: ReactNode
}

// export const DatabaseProvider = DatabaseContext.Provider
export function DatabaseProvider ({ children }: DatabaseProviderProps ) {
    // const [databaseData, setDatabaseData] = useState({} as TDatabase)
    const [databaseData, setDatabaseData] = useState({users:[]})

    return (
        <DatabaseContext.Provider value={[databaseData, setDatabaseData]}>
            { children }
        </DatabaseContext.Provider>
    )
}
export const DatabaseConsumer = DatabaseContext.Consumer

export default DatabaseContext;

// export function DatabaseContextProvider() {
//   const [databaseData, setDatabaseData] = useState({users:[]})

//     // return (
//     //     <DatabaseContext.Provider value={ databaseData }>
            
//     //     </DatabaseContext.Provider>
//     // )
// }
