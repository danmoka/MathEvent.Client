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
  const folderActions = () => [];

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

const EventFiles = ({ className }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.account);
  const { eventInfo } = useSelector((state) => state.event);
  const { files, isFetchingFiles } = useSelector((state) => state.file);

  useEffect(() => {
    if (eventInfo && userInfo) {
      dispatch(fetchFiles({ fileId: null, ownerId: eventInfo.ownerId }));
      dispatch(fetchFileBreadcrumbs(null));
    }
  }, [dispatch, eventInfo, userInfo]);

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

  const preparedFiles = useMemo(() => prepareFiles(
    files,
    handleFileDownload,
    handleFileClick,
  ), [files, handleFileClick, handleFileDownload]);

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
            { userInfo
              ? (
                <>
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
                </>
              )
              : (
                <NormalText>
                  Файлы доступны только авторизованным пользователям
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
