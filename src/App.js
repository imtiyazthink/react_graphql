import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewSinglePost from "./pages/Posts/ViewSinglePost";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ProtectedRoute />}>
            <Route path="/home" element={<Dashboard />} />
          </Route>
          <Route path="/post/:id" element={<ProtectedRoute />}>
            <Route path="/post/:id" element={<ViewSinglePost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
