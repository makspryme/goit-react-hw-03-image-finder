import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { error, images, largeImage } = this.props;

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
                  onImageClick={largeImage}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}
