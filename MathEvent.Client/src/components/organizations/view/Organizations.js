import React from 'react';
import { Route } from 'react-router-dom';
import OrganizationsView from './OrganizationsView';
import OrganizationEdit from '../edit/OrganizationEdit';
import Organization from './Organization';
import routes from '../../../utils/routes';

const Organizations = () => (
  <>
    <Route
      path={routes.organizations.main}
      exact
      render={() => <OrganizationsView />}
    />
    <Route
      path={`${routes.organizations.organization(':id')}`}
      exact
      render={() => <Organization />}
    />
    <Route
      path={`${routes.organizations.edit(':id')}`}
      exact
      render={() => <OrganizationEdit />}
    />
  </>
);

export default Organizations;
