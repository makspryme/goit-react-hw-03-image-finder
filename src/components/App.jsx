import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    imageName: '',
  };

  handleSubmitForm = value => {
    this.setState({
      imageName: value,
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery
          searchName={this.state.imageName}
          onModal={this.handleModal}
        />
      </div>
    );
  }
}
