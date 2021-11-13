import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { showZoomImage } from '../../../store/actions/event';
import './ZoomImage.scss';

const ZoomImage = ({ className, src, alt }) => {
  const dispatch = useDispatch();

  const handleImageClick = useCallback(() => {
    dispatch(showZoomImage({ src, alt }));
  }, [dispatch, alt, src]);

  return (
    <img
      className={`${className} zoom-image`}
      aria-hidden="true"
      src={src}
      alt={alt}
      onClick={handleImageClick}
    />
  );
};

ZoomImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

ZoomImage.defaultProps = {
  className: '',
  src: '',
  alt: '',
};

export default ZoomImage;
