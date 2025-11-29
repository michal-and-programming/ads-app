import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { API_URL, IMGS_URL } from "../../../config";
import { startLoading, setSingle } from "../../../redux/adsReducer";

const Ad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.ads.loading);
  const user = useSelector(state => state.user);
  const ad = useSelector(state => state.ads.single);
  
  useEffect(() => {
    const fetchSingle = async () => {
      try {
        dispatch(startLoading());

        const res = await fetch(`${API_URL}/api/ads/${id}`);
        const data = await res.json();

        dispatch(setSingle(data));

      } catch (err) {
        console.log("Error loading ad:", err);
      }
    };

    fetchSingle();
  }, [dispatch, id]);
  
  if (loading || !ad) return <p>Loading ad...</p>;

  const isOwner = user.isLogged && user.login === ad.author.login;

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/ads/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className="mt-4 g-4">
      <Col md={8} className="mx-auto">
        <Card>
          <div style={{ height: "300px", overflow: "hidden" }}>
            <Card.Img
              variant="top"
              src={IMGS_URL + ad.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <Card.Body>
            <Card.Title>{ad.title}</Card.Title>
            <Card.Text>Location: {ad.location}</Card.Text>
            <Card.Text>Date: {ad.date}</Card.Text>

            <Card.Text className="mt-3">
              Description: {ad.content}
            </Card.Text>

            <Row className="align-items-center">
              <Col>
                <img
                  src={`${IMGS_URL}${ad.author.avatar}`}
                  alt="avatar"
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                />
              </Col>
              <Col>
                <p>{ad.author.login}</p>
                <p>Phone: {ad.phone}</p>
              </Col>
            </Row>

            {isOwner && (
              <div className="mt-4 d-flex gap-3">
                <Button as={Link} to={`/ad/edit/${ad._id}`} variant="warning">
                  Edit
                </Button>

                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Ad;
