/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import Box from '@material-ui/core/Box';
import { Icon, iconTypes } from '../Icon';
import './FileDropzone.scss';
import { HugeText, NormalText, SmallText } from '../Text/Text';

const fileValidator = (file) => {
  const maxNameLength = 20;
  const maxSize = 2097152;

  if (file.name.length > maxNameLength) {
    return {
      code: 'name-too-large',
      message: `Сократите имя файла до ${maxNameLength} символов`,
    };
  }

  if (file.size > maxSize) {
    return {
      code: 'size-too-large',
      message: `Превышен размер. Максимальный размер: ${maxSize} bytes`,
    };
  }

  return null;
};

const FileDropzone = ({
  acceptedFileTypes, acceptedFileValues, maxFiles = 5, onDrop,
}) => {
  const handleDrop = useCallback((files) => {
    onDrop(files);
  }, [onDrop]);

  const {
    acceptedFiles, fileRejections, getInputProps, getRootProps,
  } = useDropzone({
    accept: acceptedFileTypes.join(', '),
    maxFiles,
    validator: fileValidator,
    onDrop: handleDrop,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {' '}
      {file.size}
      {' '}
      bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {' '}
      {file.size}
      {' '}
      bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div>
      <div {...getRootProps()}>
        <Box
          className="dropzone"
          border={1}
          borderColor="primary.main"
          borderRadius="borderRadius"
        >
          <input {...getInputProps()} />
          <HugeText>
            Перетащите файлы или кликните здесь
          </HugeText>
          <Icon type={iconTypes.uploadCloud} />
          {acceptedFileValues.map((values) => (
            <SmallText
              key={values}
            >
              {values.join(' ')}
            </SmallText>
          ))}
        </Box>
      </div>
      <aside className="aside">
        <NormalText>
          Выбранные файлы:
        </NormalText>
        <ul>{acceptedFileItems}</ul>
        {fileRejectionItems.length > 0
          ? (
            <>
              <NormalText>Не удалось выбрать: </NormalText>
              <ul>{fileRejectionItems}</ul>
            </>
          )
          : (<></>)}
      </aside>
    </div>
  );
};

FileDropzone.propTypes = {
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string),
  acceptedFileValues: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  maxFiles: PropTypes.number,
  onDrop: PropTypes.func,
};

FileDropzone.defaultProps = {
  acceptedFileTypes: [],
  acceptedFileValues: [],
  maxFiles: 5,
  onDrop: () => {},
};

export default FileDropzone;
