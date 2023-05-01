import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Style.css";
import "../styles/button.css";
import ButtonLogin from "../components/ButtonLogin";
import ButtonRegis from "../components/ButtonRegis";
// import SearchHome from "../components/SearchHome";
import backgroundImage from "../styles/image.jpg";
import { useEffect, useState } from "react";
import { getMoviePopularList, searchMovie } from "../api";
import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";

const Home = () => {
  const nav = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMoviePopularList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div
          className="Movie-wrapper"
          key={movie.id}
          onClick={() => {
            nav(`/detail/${movie.id}`);
          }}
        >
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt={movie.id}
          />
        </div>
      );
    });
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        {/* <Header/> */}
        <Container
          style={{
            minHeight: "600px",
          }}
        >
          <Row>
            <Col className="mt-1">
            <h1 onClick={() => {
            nav(`/`);
          }}  style={{cursor:"pointer", color: "red", fontSize: "50px" }}>Movielist</h1>
            </Col>
            <Col className="mt-3">
              <input
                placeholder="What do you want to watch?"
                className="Movie-search"
                onChange={({ target }) => search(target.value)}
              />
            </Col>
              <Col
                className="mt-3"
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
                Doctor Strange in the <br /> Multiverse of Madness
              </h1>
              <h6
                style={{
                  color: "white",
                  fontSize: "18px",
                  paddingTop: "1.5vw",
                }}
              >
                After encountering a girl with the power to traverse the
                multiverse,
                <br /> Stephen Strange turns to Wanda Maximoff for advice and
                help with <br /> fighting off the monstrous and mysterious
                entity that is on the girl's trail
              </h6>
              <button className="button-trailer">WATCH TRAILER</button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mb-4">
        <Row>
          <div className="App">
            <header className="App-header">
              <h1
                style={{
                  textAlign: "start",
                  marginTop: "10px",
                  marginBottom: "15px",
                  fontSize: "30px",
                }}
              >
                Popular Movie
              </h1>
              <div className="Movie-container">
                <PopularMovieList />
              </div>
            </header>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Home;
