import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

const AdAdd = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!user.isLogged) navigate("/login");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("phone", phone);
    fd.append("date", new Date().toISOString());
    fd.append("photo", photo);

    try {
      const res = await fetch(`${API_URL}/api/ads`, {
        method: "POST",
        credentials: "include",
        body: fd
      });

      if (res.ok) {
        navigate("/");
      } else {
        console.log("Error while adding ad");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="col-12 col-md-8 mx-auto mt-5" onSubmit={handleSubmit}>
      <h1 className="my-4">Add new ad</h1>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter location"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Information about seller</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone or contact details"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="file"
          onChange={e => setPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Button type="submit" variant="success">
        Add Ad
      </Button>
    </Form>
  );
};

export default AdAdd;