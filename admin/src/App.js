import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer } from 'react-toastify';

function App() {
  const url= "https://food-delivery-app-backend-if88.onrender.com"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="flex">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
