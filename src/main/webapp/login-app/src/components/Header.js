import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userlogout } from "../store";

const Header = () => {
  // 디스패처로 reducer 접근
  const dispatcher = useDispatch();
  const { isLogin } = useSelector((store) => store);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("Authorization");
    dispatcher(userlogout());
    // 글쓰다 로그아웃하면?
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Link to="/" className="navbar-brand">
          LoginApp
        </Link>
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {isLogin ? (
            <>
              <Link to="/post" className="nav-link">
                Post
              </Link>
              <Link to="/user" className="nav-link">
                User
              </Link>
              <div className="nav-link" onClick={logout}>
                logout
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>

      <br />
    </>
  );
};

export default Header;
