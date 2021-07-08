import { DatabaseProvider } from "./contexts/databaseContext";
import Routes from "./routes";

function App() {
  return (
    <DatabaseProvider>
      <Routes />
    </DatabaseProvider>
  );
}

export default App;
