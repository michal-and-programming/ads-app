import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isLogged = useSelector(state => state.user.isLogged);

  return(
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to='/'>Ads.app</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          {!isLogged &&(
            <>
              <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
            </>
          )}
          {isLogged &&(
            <>
              <Nav.Link as={NavLink} to="/logout">Sign out</Nav.Link>
              <Nav.Link as={NavLink} to="/ad/add">New ad</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
};

export default Header;