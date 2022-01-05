import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go Watch a Movie!</h1>
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
                  <Link to="/admin">Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/movies" element={<Movies />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h2>Home</h2>;
};

const Movies = () => {
  return <h2>Movies</h2>;
};

const Admin = () => {
  return <h2>Manage Catalogue</h2>;
};
