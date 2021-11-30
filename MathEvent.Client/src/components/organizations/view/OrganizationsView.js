import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, iconTypes } from '../../_common/Icon';
import { isAbleToAddOrEditEvent } from '../../../utils/user_rights';
import { useTitle } from '../../../hooks';
import OrganizationsSearch from './OrganizationsSearch';
import OrganizationsCollection from './OrganizationsCollection';
import {
  fetchOrganizations,
  showCreateOrganizationModal,
} from '../../../store/actions/organization';
import './OrganizationsView.scss';

const OrganizationsView = () => {
  useTitle('Организации');

  const dispatch = useDispatch();

  const { account } = useSelector((state) => state.account);

  const [isAbleToAdd, setIsAbleToAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (account) {
      setIsAbleToAdd(isAbleToAddOrEditEvent(account));
    }
  }, [account]);

  const handleOrganizationCreateButtonClick = useCallback(() => {
    dispatch(showCreateOrganizationModal());
  }, [dispatch]);

  return (
    <div>
      <div className="organizations-view__search-section">
        <OrganizationsSearch />
        <div className="organizations-view__search-section__buttons">
          { isAbleToAdd && (
            <IconButton
              type={iconTypes.add}
              title="Новая организация"
              onClick={handleOrganizationCreateButtonClick}
            />
          )}
        </div>
      </div>
      <div className="organizations-view__collection-section">
        <OrganizationsCollection />
      </div>
    </div>
  );
};

export default OrganizationsView;
