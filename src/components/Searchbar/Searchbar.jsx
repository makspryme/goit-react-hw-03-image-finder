import { Component } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/search-svgrepo-com.svg';

export default class Searchbar extends Component {
  state = {
    input: '',
  };

  handleInputValue = e => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  reset = () => {
    this.setState({
      input: '',
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <SearchIcon width="20" height="20" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.value}
            onChange={this.handleInputValue}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
