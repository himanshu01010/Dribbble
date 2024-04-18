import SignUpForm from "./components/SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Role from "./components/Role";
import Verification from "./components/Verification";
import VerifyEmail from "./components/VerifyEmail";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<Role />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/verify-email" element={<VerifyEmail/>}/>
        </Routes>
      </Router>
  );
}

export default App;
