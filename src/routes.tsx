import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Navbar } from "./components/NavBar";
import { CreateUser } from "./pages/CreateUser";
import { Home } from "./pages/Home";
import { UpdateUser } from "./pages/UpdateUser";



function Routes() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>

        <Route path="/createUser" component={CreateUser}  exact/>

        <Route path="/updateUser/:id" component={UpdateUser}  exact/>
      </Switch>
      <Navbar/>
    </Router>
  );
}

export default Routes;