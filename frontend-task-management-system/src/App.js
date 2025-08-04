import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigationbar from "./layout/Navigation/Navbar";
import { AuthProvider } from "./Auth";
import LoadingSpinner from "./common/Components/LoadingSpinner";
import PageLoader from "./common/Components/PageLoader";

const Home = lazy(() => import("./screens/Home/Components/Home"));
const Task = lazy(() => import("./screens/Task/Components/Task"));
const Signup = lazy(() => import("./screens/Login/Components/SignUp"));
const Login = lazy(() => import("./screens/Login/Components/Login"));

const NavbarLayout = () => {
  return (
    <>
      <Navigationbar />
      <main style={{ paddingTop: "80px" }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <PageLoader>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="tasks" element={<Task />} />
            <Route path="signUp" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </PageLoader>
    </AuthProvider>
  );
}

export default App;
