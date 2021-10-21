import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import {
  downloadFile,
  fetchFile,
  fetchFiles,
  fetchFileBreadcrumbs,
  showCreateFolderModal,
  showUploadFilesModal,
  showDeleteFileModal,
} from '../../../store/actions/file';
import { IconButton, iconTypes } from '../../_common/Icon';
import Files from '../../_common/File/Files';
import Loader from '../../_common/Loader';
import { HugeText, NormalText } from '../../_common/Text/Text';
import EventFileBreadcrumbs from '../view/EventFileBreadcrumbs';
import './EventEdit.scss';

const prepareFiles = (files, onFileDownload, onFileDelete, onClick) => {
  const fileActions = (file) => [
    {
      id: 'download',
      label: 'Скачать',
      icon: iconTypes.download,
      onClick: () => onFileDownload(file),
    },
    {
      id: 'delete',
      label: 'Удалить',
      icon: iconTypes.delete,
      onClick: () => onFileDelete(file),
    },
  ];
  const folderActions = (file) => [
    {
      id: 'delete',
      label: 'Удалить',
      icon: iconTypes.delete,
      onClick: () => onFileDelete(file),
    },
  ];

  const mappedfiles = files.map((file, index) => ({
    id: file.id,
    name: file.name,
    ext: file.extension,
    hierarchy: file.hierarchy,
    index: index + 1,
    onClick: () => onClick(file),
    actions: file.hierarchy ? folderActions(file) : fileActions(file),
  }));

  return mappedfiles;
};

const EventEditFiles = ({ className }) => {
  const dispatch = useDispatch();
  const { eventInfo } = useSelector((state) => state.event);
  const { files, crumbs, isFetchingFiles } = useSelector((state) => state.file);

  useEffect(() => {
    if (eventInfo) {
      dispatch(fetchFiles({ fileId: null, ownerId: eventInfo.ownerId }));
      dispatch(fetchFileBreadcrumbs(null));
    }
  }, [dispatch, eventInfo]);

  const handleFileClick = useCallback((file) => {
    dispatch(fetchFile(file.id));

    if (file.hierarchy) {
      dispatch(fetchFileBreadcrumbs(file.id));
      dispatch(fetchFiles({ fileId: file.id, ownerId: eventInfo.ownerId }));
    }
  }, [dispatch, eventInfo.ownerId]);

  const handleFileDownload = useCallback((file) => {
    dispatch(downloadFile(file.id));
  }, [dispatch]);

  const handleFileDelete = useCallback((file) => {
    dispatch(showDeleteFileModal({ file }));
  }, [dispatch]);

  const handleFolderCreate = useCallback(() => {
    dispatch(showCreateFolderModal({ owner: eventInfo, crumbs }));
  }, [dispatch, eventInfo, crumbs]);

  const handleFilesUpload = useCallback(() => {
    dispatch(showUploadFilesModal({ owner: eventInfo, crumbs }));
  }, [dispatch, eventInfo, crumbs]);

  const preparedFiles = useMemo(() => prepareFiles(
    files,
    handleFileDownload,
    handleFileDelete,
    handleFileClick,
  ), [files, handleFileClick, handleFileDelete, handleFileDownload]);

  return (
    <div className={className}>
      {isFetchingFiles
        ? (
          <div className={`${className}__loader-section`}>
            <Loader />
          </div>
        )
        : (
          <Paper className={`${className}__body`}>
            <div className={`${className}__header-section`}>
              <HugeText>
                Материалы
              </HugeText>
              <div className={`${className}__header-section__buttons`}>
                <IconButton
                  type={iconTypes.upload}
                  size="small"
                  title="Загрузить"
                  onClick={handleFilesUpload}
                />
                <IconButton
                  type={iconTypes.newFolder}
                  size="small"
                  title="Добавить папку"
                  onClick={handleFolderCreate}
                />
              </div>
            </div>
            <EventFileBreadcrumbs
              className={`${className}__breadcrumbs`}
            />
            {preparedFiles.length > 0
              ? (
                <>
                  <Scrollbars autoHide autoHeight autoHeightMax={300}>
                    <Files items={preparedFiles} />
                  </Scrollbars>
                </>
              )
              : (
                <NormalText>
                  Файлы отсутствуют
                </NormalText>
              )}
          </Paper>
        )}
    </div>
  );
};

EventEditFiles.propTypes = {
  className: PropTypes.string,
};

EventEditFiles.defaultProps = {
  className: 'event-edit-files',
};

export default EventEditFiles;
