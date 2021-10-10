import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import {
  downloadFile,
  fetchFile,
  fetchFiles,
  fetchFileBreadcrumbs,
} from '../../../store/actions/file';
import { iconTypes } from '../../_common/Icon';
import Files from '../../_common/File/Files';
import Loader from '../../_common/Loader';
import { HugeText, NormalText } from '../../_common/Text/Text';
import EventFileBreadcrumbs from './EventFileBreadcrumbs';
import './EventsView.scss';

const prepareFiles = (files, onFileDownload, onClick) => {
  const fileActions = (file) => [
    {
      id: 'download',
      label: 'Скачать',
      icon: iconTypes.download,
      onClick: () => onFileDownload(file),
    },
  ];

  const mappedfiles = files.map((file, index) => ({
    id: file.id,
    name: file.name,
    ext: file.extension,
    hierarchy: file.hierarchy,
    index: index + 1,
    onClick: () => onClick(file),
    actions: fileActions(file),
  }));

  return mappedfiles;
};

const EventFiles = ({ className }) => {
  const dispatch = useDispatch();
  const { eventInfo } = useSelector((state) => state.event);
  const { files, isFetchingFiles } = useSelector((state) => state.file);

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

  const preparedFiles = prepareFiles(
    files,
    handleFileDownload,
    handleFileClick,
  );

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
            <section className={`${className}__header-section`}>
              <HugeText>
                Материалы
              </HugeText>
            </section>
            {preparedFiles.length > 0
              ? (
                <>
                  <EventFileBreadcrumbs
                    className={`${className}__breadcrumbs`}
                  />
                  <Scrollbars autoHide autoHeight autoHeightMax={500}>
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

EventFiles.propTypes = {
  className: PropTypes.string,
};

EventFiles.defaultProps = {
  className: 'event-files',
};

export default EventFiles;
