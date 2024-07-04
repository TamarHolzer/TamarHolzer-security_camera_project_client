import './App.css';
import Header from './components/Header'
import Login from './components/Login';
import { BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Xy_click from './components/Xy_click';
import HistoryPlanning from './components/HistpryPlanning';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

      </div>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Login />} />
        <Route path="/optimal-coordinates" element={<Xy_click />} />
        <Route path="/history-planning" element={<HistoryPlanning />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
