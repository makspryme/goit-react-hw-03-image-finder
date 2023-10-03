import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageApi from './services/ImageApi';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    imageName: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    largeImage: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.imageName !== prevState.imageName) {
      this.setState({ images: [], loading: true, page: 1 });
      this.handleApiImages(prevProps, prevState);
    } else if (this.state.page !== prevState.page) {
      console.log(1);
      this.handleApiImages(prevProps, prevState);
    }
  };

  handleNotFoundImages = () => {
    return <h1>Not forund images at {this.state.imageName}</h1>;
  };

  handleApiImages = () => {
    ImageApi(this.state.imageName, this.state.page)
      .then(r => {
        if (this.state.images.length === 0 || this.state.page === 1) {
          this.setState({
            images: r.hits,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...r.hits],
          }));
        }
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModalOpen = image => {
    this.setState({
      largeImage: image,
    });
  };

  resetLargeImage = () => {
    this.setState({ largeImage: '' });
  };

  ///////////////////////////////////////////////////

  handleSubmitForm = value => {
    this.setState({
      imageName: value,
    });
  };

  setLargeImage = newLargeImage => {
    this.setState({ largeImage: newLargeImage });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery
          searchName={this.state.imageName}
          onImageClick={this.handleModalOpen}
          loading={this.state.loading}
          error={this.state.error}
          images={this.state.images}
          largeImage={this.setLargeImage}
        />
        {this.state.images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
        {this.state.loading && <Loader />}
        {this.state.largeImage.length > 0 && (
          <Modal
            largeImage={this.state.largeImage}
            resetImage={this.resetLargeImage}
          />
        )}
      </div>
    );
  }
}
