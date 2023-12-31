import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import { Signup } from "./components/Signup/Signup";
import { Matches } from "./components/Matches/Matches";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { userState } from "./store/atoms/user";
import Login from "./components/Login/Login";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <InitUser />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/matches" element={<Matches />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}


const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/me", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("Token")
        }
      })

      if (response.data.email) {
        setUser({
          isLoading: false,
          userEmail: response.data.email
        })
      } else {
        setUser({
          isLoading: true,
          userEmail: null
        })
      }
    } catch (error) {
      setUser({
        isLoading: true,
        userEmail: null
      })
    }
  };

  useEffect(() => {
    init();
  }, [])

  return <></>
}

export default App;
