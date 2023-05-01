import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllMovieDetail } from "../api";
import { Col, Container, Row } from "react-bootstrap";
import ButtonLogin from "../components/ButtonLogin";
import ButtonRegis from "../components/ButtonRegis";
import { useNavigate } from "react-router-dom/dist";

function MovieDetails() {
  const { id } = useParams();
  const [detailMovie, setdetailMovie] = useState([]);
  const nav = useNavigate()

  // Genre
  const [movieGenre, setmovieGenre] = useState([]);

  useEffect(() => {
    getAllMovieDetail(id).then((result) => {
      setdetailMovie(result);
      setmovieGenre(result.genres);
    });
  }, [id]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const MovieDetail = () => {
    return [detailMovie].map((movie) => {
      return (
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <Container
            style={{
              minHeight: "600px",
            }}
          >
            <Row>
              <Col className="mt-1">
                <h1 style={{ color: "red", fontSize: "50px" }}>Movielist</h1>
              </Col>
              <Col className="mt-3">
                <input
                  placeholder="What do you want to watch?"
                  className="Movie-search"
                  // onChange={({ target }) => search(target.value)}
                />
              </Col>
              <Col
                className="mt-3"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "start",
                }}
              >
                {isLoggedIn ? (
              <>
                <div onClick={() => {
            nav(`/users/dashboard`);
          }}>
                  dasboard
                </div>
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    return nav("/");
                  }}
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <ButtonLogin/>
                <ButtonRegis/>
              </>
            )}
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingTop: "6vw" }}>
                <h1 style={{ color: "white", fontSize: "70px" }}>
                  {movie.title}
                </h1>
                <div className="d-flex flex-row">
                  {movieGenre.map((genre, i) => {
                    if (i === movieGenre.length - 1) {
                      return (
                        <h6
                          style={{
                            color: "white",
                            fontSize: "20px",
                            paddingTop: "1.5vw",
                          }}
                        >
                          {genre.name}
                        </h6>
                      );
                    } else {
                      return (
                        <h6
                          style={{
                            color: "white",
                            fontSize: "20px",
                            paddingTop: "1.5vw",
                          }}
                        >
                          {genre.name} , &nbsp;
                        </h6>
                      );
                    }
                  })}
                </div>
                <h6
                  style={{
                    color: "white",
                    fontSize: "25px",
                    paddingTop: "1.5vw",
                  }}
                >
                  {movie.overview}
                </h6>
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    paddingTop: "1.5vw",
                  }}
                >
                  {movie.vote_average} / 10
                </p>
                <button className="button-trailer">WATCH TRAILER</button>
              </Col>
            </Row>
            <Row className="p-4">
              <Col>
                <Link to={"/"} className="link-url">
                  Back to Home
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      );
    });
  };

  return (
    <>
      <MovieDetail />
    </>
  );
}

export default MovieDetails;
