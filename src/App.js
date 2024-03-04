import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { TodoWrapper } from "./components/TodoWrapper";
import { Weather } from "./components/Weather";
import Profile from "../src/components/Profile";
import BackgroundChanger from "./components/BackgroundChanger";



function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <Sidebar />
            <Weather />
            <BackgroundChanger />
            <div className="Content">
              <TodoWrapper />
            </div>
          </div>
        }
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
