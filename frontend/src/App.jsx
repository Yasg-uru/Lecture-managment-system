import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";

import Notfound from "./components/Notfound.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Forgotpassword from "./pages/password/forgotpassword.jsx";
import Updatepassword from "./pages/password/Updatepassword.jsx";
import Myprofile from "./pages/user/Myprofile.jsx";
import Createcourse from "./pages/course/Createcourse.jsx";
import Displaycourse from "./pages/course/Displaycourse.jsx";
import Explore from "./pages/course/Explore.jsx";
import Checkout from "./pages/payment/Checkout.jsx";
import Success from "./pages/payment/Success.jsx";
import Failure from "./pages/payment/Failure.jsx";
import Watchlecture from "./pages/lecture/Watchlecture.jsx";
import Protected from "./helper/Protected.jsx";
import Homepage from "./components/Homepage.jsx";
import Addlecture from "./pages/lecture/Addlecture.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
          <Route
            path="/updatepassword"
            element={
              <Protected
                Component={Updatepassword}
                allowedrole={["user", "admin"]}
              />
            }
          ></Route>

          <Route
            path="/myprofile"
            element={
              <Protected
                Component={Myprofile}
                allowedrole={["admin", "user"]}
              />
            }
          ></Route>
          <Route
            path="/create/course"
            element={
              <Protected Component={Createcourse} allowedrole={["admin"]} />
            }
          ></Route>
          <Route
            path="/getcourses"
            element={
              <Protected
                Component={Displaycourse}
                allowedrole={["admin", "user"]}
              />
            }
          ></Route>
          <Route
            path="/explore/:id"
            element={
              <Protected Component={Explore} allowedrole={["admin", "user"]} />
            }
          ></Route>
          <Route
            path="/subscribe"
            element={
              <Protected Component={Checkout} allowedrole={["admin", "user"]} />
            }
          ></Route>
          <Route
            path="/success"
            element={
              <Protected Component={Success} allowedrole={["admin", "user"]} />
            }
          ></Route>
          <Route
            path="/failure"
            element={
              <Protected Component={Failure} allowedrole={["admin", "user"]} />
            }
          ></Route>
          <Route
            path="/watchlecture/:courseid"
            element={
              <Protected
                Component={Watchlecture}
                allowedrole={["admin", "user"]}
              />
            }
          ></Route>
          <Route
            path="/addlecture/:id"
            element={
              <Protected
                Component={Addlecture}
                allowedrole={["admin"]}
              />
            }
          ></Route>

          {/* <Router path="/password/reset/:token" ></Router> */}
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
