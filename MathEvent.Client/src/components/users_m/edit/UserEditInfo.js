import React, {
  useEffect, useCallback, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Dropdown from '../../_common/Dropdown';
import Loader from '../../_common/Loader';
import {
  patchUserInfo,
} from '../../../store/actions/user';
import { fetchOrganizations } from '../../../store/actions/organization';
import './UserEdit.scss';

const prepareOrganizations = (organizations) => (organizations
  ? [{ value: '', name: 'Без организации' },
    ...organizations.map((organization) => ({
      value: organization.id.toString(),
      name: organization.name,
    })),
  ]
  : []);

const UserEditInfo = ({ identityUserId, userOrganization }) => {
  const dispatch = useDispatch();
  const {
    organizations,
    isFetchingOrganizations,
  } = useSelector((state) => state.organization);

  const [organization, setOrganization] = useState('');

  useEffect(() => {
    dispatch(fetchOrganizations({
      organizationSearch: '',
    }));
  }, [dispatch]);

  useEffect(() => {
    if (userOrganization) {
      setOrganization(userOrganization.id.toString());
    }
  }, [userOrganization]);

  const preparedOrganizations = useMemo(
    () => prepareOrganizations(organizations),
    [organizations],
  );

  const handlePatchUserInfo = useCallback(
    (data) => {
      dispatch(
        patchUserInfo({
          identityUserId,
          data,
        }),
      );
    },
    [dispatch, identityUserId],
  );

  const handleOrganizationChange = useCallback((newOrganization) => {
    setOrganization(newOrganization);
    handlePatchUserInfo([
      {
        value: newOrganization || null,
        path: '/OrganizationId',
        op: 'replace',
      },
    ]);
  }, [handlePatchUserInfo]);

  return (
    <Paper className="user-edit__body">
      { isFetchingOrganizations
        ? (
          <div className="user-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <Dropdown
            className="user-edit__body__control"
            label="Организация"
            variant="outlined"
            value={organization}
            items={preparedOrganizations}
            onChange={handleOrganizationChange}
          />
        )}
    </Paper>
  );
};

UserEditInfo.propTypes = {
  identityUserId: PropTypes.string,
  userOrganization: PropTypes.shape({
    id: PropTypes.number,
  }),
};

UserEditInfo.defaultProps = {
  identityUserId: undefined,
  userOrganization: undefined,
};

export default UserEditInfo;
