import React, { Component, Fragment } from 'react';
import { useParams } from 'react-router';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class OneMovie extends Component {
  state = { movie: {} };

  componentDidMount() {
    this.setState({
      movie: {
        id: this.props.params.id,
        title: 'Some movie',
        runtime: 150,
      },
    });
  }

  render() {
    return (
      <Fragment>
        <h2>
          Movie: {this.state.movie.title} {this.state.movie.id}
        </h2>
        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>Title:</strong>
              </td>
              <td>{this.state.movie.title}</td>
            </tr>
            <tr>
              <td>
                <strong>Run time:</strong>
              </td>
              <td>{this.state.movie.runtime} minutes</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default withParams(OneMovie);
