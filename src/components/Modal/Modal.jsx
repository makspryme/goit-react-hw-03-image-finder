import * as basicLightbox from 'basiclightbox';
import { Component } from 'react';

export default class Modal extends Component {
  state = {
    instance: basicLightbox.create(`
      <div class="Overlay">
        <div class="Modal">
          <img src=${this.props.largeImage} width="800" alt="" />
        </div>
      </div>
  `),
  };

  closeModal = e => {
    if (e.code === 'Escape') {
      this.state.instance.close();
    }
    this.setState({ loading: true });
    this.props.resetImage();
  };

  componentDidMount = () => {
    window.addEventListener('keydown', this.closeModal, true);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closeModal, true);
  };

  render() {
    const { instance } = this.state;
    return <>{instance.show()}</>;
  }
}
