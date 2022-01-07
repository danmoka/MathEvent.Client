import React from 'react';
import { Redirect as RouterRedirect } from 'react-router';
import PropTypes from 'prop-types';
import routes from '../../../utils/routes';

const Redirect = ({ to }) => <RouterRedirect to={to} />;

Redirect.propTypes = {
  to: PropTypes.string,
};
Redirect.defaultProps = {
  to: '',
};

export { routes };
export default Redirect;
