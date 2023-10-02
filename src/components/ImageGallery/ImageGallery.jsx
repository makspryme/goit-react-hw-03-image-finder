import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageApi from 'components/services/ImageApi';

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    largeImage: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.searchName !== prevProps.searchName) {
      this.setState({ images: [], loading: true, page: 1 });
      this.handleApiImages(prevProps, prevState);
    }
    if (this.state.page !== prevState.page) {
      this.handleApiImages(prevProps, prevState);
    }
  };

  handleNotFoundImages = () => {
    return <h1>Not forund images at {this.props.searchName}</h1>;
  };

  // this.props.searchName this.state.page

  handleApiImages = () => {
    ImageApi(this.props.searchName, this.state.page)
      .then(r => {
        this.setState(prevProps => ({
          images: [...prevProps.images, ...r.hits],
        }));
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

  render() {
    const { loading, error, images } = this.state;

    return (
      <div>
        <ul className="ImageGallery">
          {error && <h2>{error}</h2>}
          {images.length > 0 &&
            images.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  image={webformatURL}
                  largeImage={largeImageURL}
                  onClick={this.handleModalOpen}
                />
              );
            })}
        </ul>
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {loading && <Loader />}
        {this.state.largeImage && (
          <Modal
            largeImage={this.state.largeImage}
            resetImage={this.resetLargeImage}
          />
        )}
      </div>
    );
  }
}
