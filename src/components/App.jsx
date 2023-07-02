import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import { Layout } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import fetchAPI from './serviceAPI/serviceAPI';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export default class App extends Component {

  state = {
    query: '',
    page: 1,
    images: null,
    imagesOnPage: 0,
    totalImages: 0,
    currentImageUrl: null,
    currentImageTag: null,
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchAPI(query)
        .then(({ hits, totalHits }) => {
          const array = hits.map(hit => ({
            id: hit.id,
            tag: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          if (!totalHits) {
            toast(` 🦄 Sorry, but there is no any data for ' ${query} '`, { className: 'toast-message'});
          }

          return this.setState({
            page: 1,
            images: array,
            imagesOnPage: array.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading })),
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchAPI(query, page)
        .then(({ hits }) => {
          const array = hits.map(hit => ({
            id: hit.id,
            tag: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...array],
              imagesOnPage: array.length + imagesOnPage,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading })),
        );
    }
  }

  getResult = query => {
    this.setState({ query });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onOpenModal = event => {
    const currentImageUrl = event.target.dataset.large;
    const currentImageTag = event.target.alt;


    if (event.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageTag: currentImageTag,
      }));
    }
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      currentImageUrl,
      currentImageTag,
      isLoading,
      showModal,
    } = this.state;


    const getResult = this.getResult;
    const onLoadMore = this.onLoadMore;
    const onOpenModal = this.onOpenModal;
    const onToggleModal = this.onToggleModal;


    return (

      <Layout>
        <Searchbar onSubmit={getResult} />

        {isLoading && <Loader />}

        {images && <ImageGallery images={images} openModal={onOpenModal} />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onLoadMore={onLoadMore} />
        )}

        {showModal && (
          <Modal
            onClose={onToggleModal}
            currentImageUrl={currentImageUrl}
            currentImageTag={currentImageTag}
          />
        )}
        <ToastContainer />
        <ToastContainer />
      </Layout>
    );
  }
}



