import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Loader from '../../_common/Loader';
import TextField from '../../_common/TextField';
import Button, { colors } from '../../_common/Button';
import { iconTypes } from '../../_common/Icon';
import { useTitle } from '../../../hooks';
import {
  fetchOrganization,
  patchOrganization,
  showDeleteOrganizationModal,
} from '../../../store/actions/organization';
import { navigateToOrganization } from '../../../utils/navigator';
import { isMathEventExecutive } from '../../../utils/user_rights';
import {
  validateOrganizationDescription,
  validateOrganizationITN,
  validateOrganizationName,
} from '../../../utils/validation/organizationValidation';
import './OrganizationEdit.scss';

const OrganizationEdit = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const {
    organization,
    isFetchingOrganizations,
  } = useSelector((state) => state.organization);

  const [isAbleToEdit, setIsAbleToEdit] = useState(true);
  const [organizationId, setOrganizationId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDesctiption] = useState('');
  const [itn, setItn] = useState('');

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [itnError, setITNError] = useState('');

  const { id } = useParams();
  useTitle('Редактирование организации');

  useEffect(() => {
    if (organization?.id !== id) {
      dispatch(fetchOrganization(id));
    }
  }, [dispatch, id, organization?.id]);

  useEffect(() => {
    setIsAbleToEdit(isMathEventExecutive(account));
  }, [account]);

  useEffect(() => {
    if (!isAbleToEdit) {
      navigateToOrganization(id);
    }
  }, [id, isAbleToEdit]);

  useEffect(() => {
    if (organization) {
      setOrganizationId(organization.id);
      setName(organization.name);
      setDesctiption(organization.description || '');
      setItn(organization.itn || '');
    }
  }, [organization]);

  const handlePatchOrganization = useCallback(
    (data) => {
      dispatch(
        patchOrganization({
          id: organizationId,
          data,
        }),
      );
    },
    [dispatch, organizationId],
  );

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    const error = validateOrganizationName(newName);
    setNameError(error);

    if (!error) {
      handlePatchOrganization([
        {
          value: newName,
          path: '/Name',
          op: 'replace',
        },
      ]);
    }
  }, 1000);

  const handleDescriptionValueChange = useDebouncedCallback(
    (newDescription) => {
      setDesctiption(newDescription);
      const error = validateOrganizationDescription(newDescription);
      setDescriptionError(error);

      if (!error) {
        handlePatchOrganization([
          {
            value: newDescription,
            path: '/Description',
            op: 'replace',
          },
        ]);
      }
    }, 1000,
  );

  const handleITNValueChange = useDebouncedCallback(
    (newItn) => {
      setItn(newItn);

      const error = validateOrganizationITN(newItn);
      setITNError(error);

      if (!error) {
        handlePatchOrganization([
          {
            value: newItn,
            path: '/ITN',
            op: 'replace',
          },
        ]);
      }
    }, 1000,
  );

  const handleOrganizationDeleteClick = useCallback(() => {
    dispatch(showDeleteOrganizationModal({
      id: organization.id, name: organization.name,
    }));
  }, [dispatch, organization]);

  return (
    <div className="organization-edit">
      {isFetchingOrganizations
        ? (
          <div className="organization-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { organization
            && (
            <>
              <div className="organization-edit__main-section">
                <Paper className="organization-edit__body">
                  <TextField
                    className="organization-edit__body__control"
                    label="Название"
                    value={name}
                    error={!!nameError}
                    helperText={nameError}
                    onChange={handleNameValueChange}
                  />
                  <TextField
                    className="organization-edit__body__control"
                    label="Описание"
                    multiline
                    rows={10}
                    value={description}
                    error={!!descriptionError}
                    helperText={descriptionError}
                    onChange={handleDescriptionValueChange}
                  />
                  <TextField
                    className="organization-edit__body__control"
                    label="ИНН"
                    value={itn}
                    error={!!itnError}
                    helperText={itnError}
                    onChange={handleITNValueChange}
                  />
                </Paper>
              </div>
              <div className="organization-edit__delete-section">
                <Box
                  className="organization-edit__body"
                  bgcolor="error.dark"
                  borderRadius={4}
                >
                  <Button
                    className="organization-edit__body__control"
                    color={colors.default}
                    startIcon={iconTypes.delete}
                    onClick={handleOrganizationDeleteClick}
                  >
                    Удалить организацию
                  </Button>
                </Box>
              </div>
            </>
            )}
          </>
        )}
    </div>
  );
};

export default OrganizationEdit;
