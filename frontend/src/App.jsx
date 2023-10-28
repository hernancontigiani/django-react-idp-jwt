import "./App.css";

import { AppProvider } from "./context/context";
import RouterPrincipal from "./routes/RouterPrincipal";

function App() {

  return (
    <div className="App">
      <AppProvider>
        <RouterPrincipal />
      </AppProvider>
    </div>
  );
}

export default App;
