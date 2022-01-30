import React, { Component, Fragment } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useLocation()} />;
}

class OneGenre extends Component {
  state = {
    movies: [],
    isLoaded: false,
    error: null,
    genreName: '',
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/v1/movies/` +
        this.props.params.state.genreId
    )
      .then((response) => {
        if (response.status !== '200') {
          let err = Error;
          err.message = 'Invalid response code: ' + response.status;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then((json) => {
        this.setState(
          {
            movies: json.movies,
            isLoaded: true,
            genreName: this.props.params.state.genreName,
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      });
  }

  render() {
    let { movies, isLoaded, error, genreName } = this.state;

    if (!movies) {
      movies = [];
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <h2>Genre: {genreName}</h2>
          <div className="list-group">
            {movies.map((m) => (
              <Link
                to={`/movies/${m.id}`}
                className="list-group-item list-group-item-action"
                id={m.index}
              >
                {m.title}
              </Link>
            ))}
          </div>
        </Fragment>
      );
    }
  }
}

export default withParams(OneGenre);
