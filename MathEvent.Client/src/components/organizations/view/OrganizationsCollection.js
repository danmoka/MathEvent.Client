import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../_common/Loader';
import List from '../../_common/List';
import { NormalText } from '../../_common/Text/Text';
import colors from '../../../constants/colors';
import { navigateToOrganization } from '../../../utils/navigator';
import './OrganizationsView.scss';

const prepareOrganizations = (organizations, onClick) => (organizations
  ? organizations.map((organization, index) => ({
    id: organization.id,
    primaryText: `${organization.name}`,
    index: index + 1,
    onClick: () => onClick(organization),
  }))
  : []);

const OrganizationsCollection = () => {
  const {
    organizations,
    isFetchingOrganizations,
  } = useSelector((state) => state.organization);

  const handleOrganizationClick = useCallback((organization) => {
    navigateToOrganization(organization.id);
  }, []);

  const preparedOrganizations = useMemo(() => prepareOrganizations(
    organizations,
    handleOrganizationClick,
  ), [handleOrganizationClick, organizations]);

  return (
    <div className="organizations-collection">
      { isFetchingOrganizations ? (
        <div className="organizations-collection__loader-section">
          <Loader />
        </div>
      ) : (
        <>
          { preparedOrganizations.length < 1
            ? (
              <NormalText
                className="organizations-collection__collection-info"
                color={colors.textSecondary}
              >
                Организаций нет, попробуйте изменить строку поиска
              </NormalText>
            )
            : (
              <List items={preparedOrganizations} />
            )}
        </>
      )}
    </div>
  );
};

export default OrganizationsCollection;
