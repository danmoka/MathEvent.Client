import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import images from '../../../constants/images';

const FileImage = ({
  className, ext, hierarchy, alt,
}) => {
  let src = hierarchy ? images.folder : images.basic_file;

  if (ext) {
    const extension = ext.slice(1);
    const path = images[extension];
    src = path || src;
  }

  return (
    <Image
      className={className}
      src={src}
      alt={alt}
    />
  );
};

FileImage.propTypes = {
  className: PropTypes.string,
  ext: PropTypes.string,
  hierarchy: PropTypes.bool,
  alt: PropTypes.string,
};

FileImage.defaultProps = {
  className: 'file__media',
  ext: '',
  hierarchy: null,
  alt: 'image',
};

export default FileImage;
