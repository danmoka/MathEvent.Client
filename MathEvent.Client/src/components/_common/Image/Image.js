import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ className, src, alt }) => (
  <img
    className={className}
    src={src}
    alt={alt}
  />
);

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  className: '',
  src: null,
  alt: 'image',
};

export default Image;
