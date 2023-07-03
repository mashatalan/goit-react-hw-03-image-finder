import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    images: [],
    imagesOnPage: 0,
    totalImages: 0,
    currentImageUrl: null,
    currentImageTag: null,
    isLoading: false,
    showModal: false,
    error: null,
  };

  imagesLimit = 12;

  loadImages = async (query, page) => {

    try {
      const { hits, total } = await fetchAPI(query, page);
      if (hits.length === 0) {
        return toast(`🦄 Sorry, but there is no data for '${query}'`, {
          className: 'toast-message',
        });
      }
      const array = hits.map(hit => ({
        id: hit.id,
        tag: hit.tags,
        smallImage: hit.webformatURL,
        largeImage: hit.largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...array],
        imagesOnPage: prevState.imagesOnPage + array.length,
        totalImages: total,
      }));
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false })
    }
  };

  getResult = async (query, page) => {
    this.setState({
      query,
      page,
      images: [],
      imagesOnPage: 0,
      totalImages: 0,
      currentImageUrl: null,
      currentImageTag: null,
      isLoading: false,
      showModal: false,
      error: null,
    });
    await this.loadImages(query, page);
  };

  onLoadMore = async () => {
    const { query, page } = this.state;
    await this.loadImages(query, page + 1 );
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

        {imagesOnPage >= this.imagesLimit && imagesOnPage < totalImages && (
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
      </Layout>
    );
  }
}
