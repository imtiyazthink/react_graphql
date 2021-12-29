import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewSinglePost from "./pages/Posts/ViewSinglePost";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/post:1" element={<ViewSinglePost />} />
          <Route path="*" element={() => "404 NOT FOUND"} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
