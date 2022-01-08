import React, { Component, Fragment } from 'react';
import './EditMovie.css';
import Input from './form-components/Input';
import Select from './form-components/Select';
import TextArea from './form-components/TextArea';

export default class EditMovie extends Component {
  state = {
    movie: {},
    isLoaded: false,
    error: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: 0,
        title: '',
        release_date: '',
        runtime: '',
        mpaa_rating: '',
        rating: '',
        description: '',
      },
      mpaaOptions: [
        {
          id: 'G',
          value: 'G',
        },
        {
          id: 'PG',
          value: 'PG',
        },
        {
          id: 'PG13',
          value: 'PG13',
        },
        {
          id: 'R',
          value: 'R',
        },
        {
          id: 'NC17',
          value: 'NC17',
        },
      ],
      isLoaded: false,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   movie: {
    //     title: 'The Godfather',
    //     mpaa_rating: 'R',
    //   },
    // });
  }

  handleSubmit = (event) => {
    console.log('Form was submitted');
    event.preventDefault();
  };

  handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState((prevState) => ({
      movie: {
        ...prevState.movie,
        [name]: value,
      },
    }));
  };

  render() {
    let { movie } = this.state;

    return (
      <Fragment>
        <h2>Add/Edit Movie</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={movie.id}
            onChange={this.handleChange}
          />

          <Input
            title={'Title'}
            type={'text'}
            name={'title'}
            value={movie.title}
            handleChange={this.handleChange}
          />

          <Input
            title={'Release date'}
            type={'date'}
            name={'release_date'}
            value={movie.release_date}
            handleChange={this.handleChange}
          />

          <Input
            title={'Runtime'}
            type={'text'}
            name={'runtime'}
            value={movie.runtime}
            handleChange={this.handleChange}
          />

          <Select
            title={'MPAA Rating'}
            name={'mpaa_rating'}
            options={this.state.mpaaOptions}
            value={movie.mpaa_rating}
            handleChange={this.handleChange}
            placeholder={'Choose...'}
          />

          <Input
            title={'Rating'}
            type={'text'}
            name={'rating'}
            value={movie.rating}
            handleChange={this.handleChange}
          />

          <TextArea
            title={'Description'}
            name={'description'}
            value={movie.description}
            rows={'3'}
            handleChange={this.handleChange}
          />

          <hr />

          <button className="btn btn-primary">Save</button>
        </form>

        <div className="mt-3">
          <pre>{JSON.stringify(this.state, null, 3)}</pre>
        </div>
      </Fragment>
    );
  }
}
