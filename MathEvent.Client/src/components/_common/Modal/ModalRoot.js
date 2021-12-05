import React from 'react';
import { useSelector } from 'react-redux';
import EventLocationModal from '../../events_m/view/EventLocationModal';
import EventStatisticsModal from '../../statistics/event/EventStatisticsModal';
import EventCreateModal from '../../events_m/create/EventCreateModal';
import EventAddManagerModal from '../../events_m/edit/EventAddManagerModal';
import CreateFolderModal from '../File/CreateFolderModal';
import EventDeleteModal from '../../events_m/delete/EventDeleteModal';
import DeleteFileModal from '../File/DeleteFileModal';
import LogoutModal from '../../account_m/LogoutModal';
import UploadEventAvatarModal from '../../events/edit/UploadEventAvatar';
import UploadFilesModal from '../File/UploadFilesModal';
import UserStatisticsModal from '../../statistics/user/UserStatisticsModal';
import { ZoomImageModal } from '../ZoomImage';
import
OrganizationCreateModal
  from '../../organizations/create/OrganizationCreateModal';
import
OrganizationDeleteModal
  from '../../organizations/delete/OrganizationDeleteModal';
import NotAuthenticatedModal from '../../account_m/NotAuthenticatedModal';
import modalTypes from '../../../constants/modal-types';

const modals = {
  [modalTypes.createEvent]: EventCreateModal,
  [modalTypes.deleteEvent]: EventDeleteModal,
  [modalTypes.uploadEventAvatar]: UploadEventAvatarModal,
  [modalTypes.eventAddManagerModal]: EventAddManagerModal,
  [modalTypes.eventLocation]: EventLocationModal,
  [modalTypes.eventStatistics]: EventStatisticsModal,
  [modalTypes.createFolder]: CreateFolderModal,
  [modalTypes.deleteFile]: DeleteFileModal,
  [modalTypes.uploadFiles]: UploadFilesModal,
  [modalTypes.userStatistics]: UserStatisticsModal,
  [modalTypes.logout]: LogoutModal,
  [modalTypes.notAuthenticated]: NotAuthenticatedModal,
  [modalTypes.createOrganization]: OrganizationCreateModal,
  [modalTypes.deleteOrganization]: OrganizationDeleteModal,
  [modalTypes.zoomImage]: ZoomImageModal,
};

const ModalRoot = () => {
  const { modalType, modalProps } = useSelector((state) => state.modal);

  if (!modalType) {
    return null;
  }

  const SpecificModal = modals[modalType];

  return <SpecificModal modalProps={modalProps} />;
};

export default ModalRoot;
