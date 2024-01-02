import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import { Signup } from "./components/Signup/Signup";
import { Matches } from "./components/Matches/Matches";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { userState } from "./store/atoms/user";
import Login from "./components/Login/Login";
import { Appbar } from "./components/Appbar/Appbar"
import { Courses } from "./components/Courses/Courses";
import { Addcourse } from "./components/Addcourse/Addcourse";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Appbar />
        <InitUser />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/addcourse" element={<Addcourse/>} />
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
          isLoading: false,
          userEmail: null
        })
      }
    } catch (error) {
      setUser({
        isLoading: false,
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
