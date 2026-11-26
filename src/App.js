import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiKey = "";

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
      );
      setMovies(response.data.search || []);
    } catch (error) {
      setError(error.message);
      setShowModal(true);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`,
      );
      setSelectedMovie(response.data);
    } catch (error) {
      setError(error.message);
      setShowModal(true);
    }
  };
  const handleclose = () => {
    setShowModal(false);
    setError(null);
  };

  return (
    <>
      {apiKey !== "" && (
        <h1>
          Please visit to this website and create your api key and paste in this
          app.js file
          <a href="https://omdbapi.com/apikey.aspx" target="_blank">
            Click
          </a>
        </h1>
      )}

      <Container>
        <h1 className="my-4">Movie Search App</h1>

        {selectedMovie && (
          <Row>
            <Col>
              <Card className="mt-4">
                <Card.Img variant="top" src={selectedMovie.Poster} />
                <Card.Body>
                  <Card.Title>{selectedMovie.Title}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {selectedMovie.Year}
                  </Card.Text>
                  <Card.Text>
                    <strong>Plot:</strong> {selectedMovie.Plot}
                  </Card.Text>
                  <Card.Text>
                    <strong>Director:</strong> {selectedMovie.Director}
                  </Card.Text>
                  <Card.Text>
                    <strong>Cast</strong> {selectedMovie.Actors}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <Form className="mb-4">
          <FormControl
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies"
            className="mr-sm-2"
          />
          <Button variant="primary mt-3" onClick={searchMovies}>
            Search
          </Button>
        </Form>

        <Row>
          {movies.map((movie) => (
            <Col key={movie.omdbID} sm={12} md={6} lg={4} className="mb-4">
              <Card
                onClick={() => getMovieDetails(movie.omdbID)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  style={{ width: "250px", height: "150px" }}
                  src={movie.Poster}
                />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Year}</Card.Text>
                  <Card.Text>{movie.omdbID}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleclose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleclose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default App;
