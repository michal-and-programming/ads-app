import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "../../../redux/adsReducer";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { IMGS_URL } from "../../../config";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ads = useSelector(state => state.ads.list);
  const loading = useSelector(state => state.ads.loading);

  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchPhrase.trim()) return;
    navigate(`/search/${searchPhrase}`);
  };

  if (loading) return <p>Loading ads...</p>;

  const sortedAds = [...ads].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
    <Form onSubmit={handleSearch} className="mb-4 mt-3">
      <Row className="g-2">
        <Col xs={10}>
          <Form.Control
            type="text"
            placeholder="Search ads by title..."
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <Button type="submit" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
    <Row className="mt-4 g-4">
      {sortedAds.map(ad => (
        <Col key={ad._id}>
          <Card>
            <div style={{ height: "200px", overflow: "hidden" }}>
              <Card.Img 
                variant="top" 
                src={IMGS_URL + ad.img}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>{ad.location}</Card.Text>
              <Button as={Link} to={`/ad/${ad._id}`} variant="primary">
                Read more
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default Home;