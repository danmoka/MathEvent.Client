import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModal } from '../Modal';
import { deleteFile } from '../../../store/actions/file';

const folderText = 'папку? Сначала удалите все вложенные файлы и папки!';
const fileText = 'файл?';

const DeleteFileModal = () => {
  const dispatch = useDispatch();
  const { file } = useSelector((state) => state.modal.modalProps);

  const handleFileDelete = () => dispatch(deleteFile({ fileId: file.id }));

  return (
    <DeleteModal
      title={file.name}
      deleteText={`Вы действительно хотите удалить
       ${file.hierarchy ? folderText : fileText}`}
      onDelete={handleFileDelete}
    />
  );
};

export default DeleteFileModal;
