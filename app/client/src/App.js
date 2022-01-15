import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import EditMovie from './components/EditMovie';
import Genres from './components/Genres';
import GraphQL from './components/GraphQL';
import Home from './components/Home';
import Login from './components/Login';
import Movies from './components/Movies';
import OneGenre from './components/OneGenre';
import OneMovie from './components/OneMovie';
import OneMovieGraphQL from './components/OneMovieGraphQL';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
    };

    this.handleJWTChange(this.handleJWTChange.bind(this));
  }

  componentDidMount() {
    let token = window.localStorage.getItem('jwt');
    if (token) {
      if (this.state.jwt === '') {
        this.setState({ jwt: JSON.parse(token) });
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({ jwt });
  };

  logout = () => {
    this.setState({ jwt: '' });
    window.localStorage.removeItem('jwt');
  };

  render() {
    let loginLink;

    if (this.state.jwt === '') {
      loginLink = <Link to="/login">Login</Link>;
    } else {
      loginLink = (
        <Link to="/logout" onClick={this.logout}>
          Logout
        </Link>
      );
    }

    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-3">Go Watch a Movie!</h1>
            </div>
            <div className="col mt-3 text-end">{loginLink}</div>
            <hr className="mb-3"></hr>
          </div>
          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/movies">Movies</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/genres">Genres</Link>
                  </li>
                  {this.state.jwt !== '' && (
                    <Fragment>
                      <li className="list-group-item">
                        <Link to="/admin/movie/0">Add movie</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/admin">Manage Catalogue</Link>
                      </li>
                    </Fragment>
                  )}
                  <li className="list-group-item">
                    <Link to="graphql">GraphQL</Link>
                  </li>
                </ul>
                <pre>{JSON.stringify(this.state, null, 3)}</pre>
              </nav>
            </div>
            <div className="col-md-10">
              <Routes>
                <Route
                  exact
                  path="/login"
                  element={<Login handleJWTChange={this.handleJWTChange} />}
                />
                <Route path="/movies/:id" element={<OneMovie />} />
                <Route
                  path="/moviesgraphql/:id"
                  element={<OneMovieGraphQL />}
                />
                <Route path="/movies" element={<Movies />}></Route>
                <Route path="/genre/:id" element={<OneGenre />} />
                <Route exact path="/genres" element={<Genres />}></Route>
                <Route exact path="/graphql" element={<GraphQL />}></Route>
                <Route
                  exact
                  path="/admin/movie/:id"
                  element={<EditMovie jwt={this.state.jwt} />}
                ></Route>
                <Route
                  path="/admin"
                  element={<Admin jwt={this.state.jwt} />}
                ></Route>
                <Route path="/" element={<Home />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
