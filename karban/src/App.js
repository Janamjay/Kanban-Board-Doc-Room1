import "./App.css";
import Home from "./home/Home";
import  Details from './containers/details/Details'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />}>
          <Route path={":cardId"} element={<Details />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
