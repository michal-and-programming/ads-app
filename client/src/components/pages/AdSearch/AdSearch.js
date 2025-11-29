import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { IMGS_URL, API_URL } from "../../../config";
import { startLoading, setAds } from "../../../redux/adsReducer";

const AdSearch = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();

  const ads = useSelector(state => state.ads.list);
  const loading = useSelector(state => state.ads.loading);

  useEffect(() => {
    const fetchSearch = async () => {
      dispatch(startLoading());
      const res = await fetch(`${API_URL}/api/ads/search/${searchPhrase}`);
      const data = await res.json();
      dispatch(setAds(data));
    };
    fetchSearch();
  }, [dispatch, searchPhrase]);

  if (loading) return <p>Loading ads...</p>;

  return (
    <Row className="mt-4 g-4">
      {ads.length === 0 && <p>No results found for "{searchPhrase}"</p>}

      {ads.map(ad => (
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
  );
};

export default AdSearch;