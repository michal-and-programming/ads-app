import { Container } from "react-bootstrap";
import { Routes,Route } from "react-router-dom";
import Header from "./components/views/Header/Header";
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdSearch from "./components/pages/AdSearch/AdSearch";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Logout from "./components/pages/Logout/Logout";
import NoMatch from "./components/views/NoMatch/NoMatch";
import Footer from "./components/views/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "./redux/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/ad/:id" element={<Ad />}/>
        <Route path="/ad/add" element={<AdAdd />}/>
        <Route path="/ad/edit/:id" element={<AdEdit />}/>
        <Route path="/search/:searchPhrase" element={<AdSearch />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="*" element={<NoMatch />}/>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
