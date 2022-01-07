/* eslint-disable no-console */
import api from '../api';
import { baseService } from './base-service';
import { getAccessToken } from '../../utils/local-storage-manager';

const fileService = {
  fetchFiles: async (fileId, ownerId) => {
    const url = api.files.fetchFiles(fileId, ownerId);

    return baseService.get(url);
  },
  fetchFile: async (fileId) => {
    const url = api.files.fetchFile(fileId);

    return baseService.get(url);
  },
  fetchFileBreadcrumbs: async (fileId) => {
    const url = api.files.fetchFileBreadcrumbs(fileId);

    return baseService.get(url);
  },
  createFile: async (createdFile) => {
    const url = api.files.createFile();

    return baseService.post(url, createdFile);
  },
  deleteFile: async (fileId) => {
    const url = api.files.deleteFile(fileId);

    return baseService.delete(url);
  },
  uploadFiles: async (fileId, ownerId, files) => {
    const url = api.files.uploadFiles(fileId, ownerId);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });

      return fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
  downloadFile: async (fileId) => {
    const url = api.files.downloadFile(fileId);

    return baseService.get(url);
  },
};

export default fileService;
