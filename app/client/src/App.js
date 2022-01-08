import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import EditMovie from './components/EditMovie';
import Genres from './components/Genres';
import Home from './components/Home';
import Movies from './components/Movies';
import OneGenre from './components/OneGenre';
import OneMovie from './components/OneMovie';

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
                  <Link to="/genres">Genres</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/add">Add movie</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/movies/:id" element={<OneMovie />} />
              <Route path="/movies" element={<Movies />}></Route>
              <Route path="/genre/:id" element={<OneGenre />} />
              <Route exact path="/genres" element={<Genres />}></Route>
              <Route exact path="/admin/add" element={<EditMovie />}></Route>
              {/* <Route
                exact
                path="/by-category/drama"
                element={<Categories title={`Drama`} />}
              ></Route>
              <Route
                exact
                path="/by-category/comedy"
                element={<Categories title={`Comedy`} />}
              ></Route> */}
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

// function CategoryPage() {
//   return (
//     <div>
//       <h2>Categories</h2>
//       <ul>
//         <li>
//           <Link to={`/by-category/comedy`}>Comedy</Link>{' '}
//         </li>
//         <li>
//           <Link to={`/by-category/drama`}>Drama</Link>{' '}
//         </li>
//       </ul>
//     </div>
//   );
// }
