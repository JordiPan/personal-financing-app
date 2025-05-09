import "../css/app.css";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Home from "./pages/Guest/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Guest/Login";
import Register from "./pages/Guest/Register";
import About from "./pages/Guest/About";
import UserHome from "./pages/User/UserHome";
import { AuthProvider } from "../context/AuthContext";
import RequireAuth from "./RequireAuth";
import UserCategories from "./pages/User/UserCategories";
import UserItems from "./pages/User/UserItems";
import PersistLogin from "./PersistLogin";
import { GuestRoute } from "./GuestRoute";

function App() {
  //user home should probably not have a route called /user just make it the root url with auth
  return (
    <>
      <AuthProvider>
        <NavBar />
        <main id="main-content">
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PersistLogin />}>
              {/* RequireAuth as a parent route for all user pages */}
              <Route element={<RequireAuth allowedRoles={["user"]} />}>
                <Route path="/user">
                  <Route index element={<UserHome />} />
                  <Route path="categories" element={<UserCategories />} />
                  <Route path="items" element={<UserItems />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
