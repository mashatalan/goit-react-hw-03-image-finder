import PropTypes from 'prop-types';
import { Li, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem(
  {
    tag,
    smallImage,
    largeImage,
    openModal,
  }) {
  return (
    <Li onClick={openModal}>
      <Image src={smallImage} alt={tag} data-large={largeImage} />
    </Li>
  );
}

ImageGalleryItem.prototype = {
  tag: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
