import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, IMGS_URL } from "../../../config";
import { startLoading, setAds } from "../../../redux/adsReducer";
import { Form, Button, Card } from "react-bootstrap";

const AdEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ads = useSelector(state => state.ads.list);
  const loading = useSelector(state => state.ads.loading);

  const ad = ads.find(ad => ad._id === id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchSingle = async () => {
      dispatch(startLoading());
      const res = await fetch(`${API_URL}/api/ads/${id}`);
      const data = await res.json();
      dispatch(setAds([data]));

      setTitle(data.title);
      setContent(data.content);
      setPrice(data.price);
      setLocation(data.location);
      setPhone(data.phone);
      setDate(data.date);
    };

    fetchSingle();
  }, [dispatch, id]);

  if (loading || !ad) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("phone", phone);
    fd.append("date", date);

    if (photo) fd.append("photo", photo);

    try {
      await fetch(`${API_URL}/api/ads/${id}`, {
        method: "PATCH",
        body: fd,
        credentials: "include"
      });

      navigate(`/ad/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="p-4 mt-4">
      <h2>Edit Ad</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Seller info</Form.Label>
          <Form.Control
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New photo</Form.Label>
          <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
        </Form.Group>

        <Button type="submit" variant="primary">Save</Button>
      </Form>

      <div className="mt-3">
        <p>Current image:</p>
        <Card.Img
          variant="top"
          src={IMGS_URL + ad.img}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </Card>
  );
};

export default AdEdit;