import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ login, password }),
      });

      if (res.ok) {
        await dispatch(setUser(login));
        navigate("/");
      } else {
        console.log("Wrong login or password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form className="col-12 col-md-6 mx-auto mt-5" onSubmit={handleSubmit}>
      <h1 className="my-4">Login</h1>

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          placeholder="Enter login"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Sign in
      </Button>
    </Form>
  );
};

export default Login;