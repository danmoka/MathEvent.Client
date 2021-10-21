import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateModal from '../Modal/CreateModal';
import FileDropzone, { fileTypes } from '../FileDropzone';
import { uploadFiles } from '../../../store/actions/file';

const UploadFilesModal = () => {
  const dispatch = useDispatch();
  const { owner, crumbs } = useSelector((state) => state.modal.modalProps);
  const [files, setFiles] = useState([]);
  const parent = crumbs && crumbs.length > 0 ? crumbs[crumbs.length - 1] : null;

  const handleFilesDrop = useCallback((newfiles) => {
    if (newfiles.length > 0) setFiles(...files, newfiles);
  }, [files]);

  const handleFilesUpload = useCallback(() => {
    if (files.length) {
      dispatch(uploadFiles({
        fileId: parent ? parent.id : null,
        ownerId: owner.ownerId,
        files,
      }));
    }
  }, [dispatch, files, parent, owner.ownerId]);

  return (
    <CreateModal
      title="Загрузка файлов"
      createButtonText="Загрузить"
      onCreate={handleFilesUpload}
    >
      <FileDropzone
        acceptedFileTypes={[
          fileTypes.image.types,
          fileTypes.application.types,
          fileTypes.text.types]}
        acceptedFileValues={[
          fileTypes.image.values,
          fileTypes.application.values,
          fileTypes.text.values]}
        onDrop={handleFilesDrop}
      />
    </CreateModal>
  );
};

export default UploadFilesModal;
