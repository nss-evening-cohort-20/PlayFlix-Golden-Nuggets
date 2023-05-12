import { logout } from "../helpers/logout";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { searchGames } from "../../ApiKeys";

export const NavBar = ({navigate, setUserCheck, userCheck, searchParams, setSearchParams, handleClick,}) => {
  const onLogout = () => {
        logout.logout(navigate, setUserCheck,  userCheck);
      };   


      const searchText = (event) => {
        let stateCopy = {...searchParams}
        stateCopy = event.target.value.replace(/\s/g, '');
        setSearchParams(stateCopy);
      }

  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand} fixed="top" bg="dark" variant="dark" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">PlayFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/leaderboard">Leaderboards</Nav.Link>
                  <Nav.Link href="/favorites">Favorites</Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => {onLogout()}} href="">Log Out</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    onChange={(event) => {searchText(event)}}
                    value={searchParams}
                    type="search"
                    placeholder="Search games.."
                    className="me-2"
                    aria-label="Search"
                  />
                  {
                    searchParams ?
                      <Button onClick={() => { handleClick() }} variant="outline-success">Search</Button>
                      :
                      <Button onClick={() => { handleClick() }} variant="outline-danger" disabled>Search</Button>
                  }
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}