import React, { Component } from 'react';

export default class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({city: event.target.search.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Search by city name...' name='search'></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
