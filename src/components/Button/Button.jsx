import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export default function Button({ onLoadMore }) {
  return (
    <div style={{ margin: '0 auto' }}>
      <LoadMore type="button" onClick={onLoadMore}>
        Load more
      </LoadMore>
    </div>
  );
}

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
};
