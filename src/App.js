import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CrudsOperatio from "./components/cruds";
import RecordTable from "./components/recordTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<CrudsOperatio />} />
          <Route exact path="/record" element={<RecordTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
