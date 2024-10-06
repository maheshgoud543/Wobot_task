import "./App.css";
import logo from "./assets/logo.png";
import Cameras from "./Components/Cameras";
function App() {
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Wobot.ai" />
      </div>
      <div>
        <Cameras />
      </div>
    </div>
  );
}

export default App;
