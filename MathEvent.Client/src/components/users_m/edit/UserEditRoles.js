import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Checkbox from '../../_common/Checkbox';
import {
  isMathEventExecutive,
  isMathEventIdentityServerExecutive,
} from '../../../utils/user_rights';
import {
  addUserAccountToRole,
  removeUserAccountFromRole,
} from '../../../store/actions/user';
import roles from '../../../constants/roles';
import './UserEdit.scss';

const UserEditRoles = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const { userAccount } = useSelector((state) => state.user);

  const [isMathEventAdmin, setIsMathEventAdmin] = useState(false);
  const [
    isMathEventIdentityServerAdmin,
    setIsMathEventIdentityServerAdmin,
  ] = useState(false);
  const [canEditUserRoles, setCanEditUserRoles] = useState(false);

  useEffect(() => {
    setCanEditUserRoles(isMathEventIdentityServerExecutive(account));
  }, [account]);

  useEffect(() => {
    setIsMathEventAdmin(isMathEventExecutive(userAccount));
    setIsMathEventIdentityServerAdmin(
      isMathEventIdentityServerExecutive(userAccount),
    );
  }, [userAccount]);

  const handleIsMathEventAdminClick = useCallback((isAdmin) => {
    const roleData = {
      id: userAccount.id,
      role: roles.mathEventAdmin,
    };

    if (isAdmin) {
      dispatch(addUserAccountToRole(roleData));
    } else {
      dispatch(removeUserAccountFromRole(roleData));
    }
  }, [dispatch, userAccount]);

  const handleIsMathEventIdentityServerAdminClick = useCallback((isAdmin) => {
    const roleData = {
      id: userAccount.id,
      role: roles.mathEventIdentityServerAdmin,
    };

    if (isAdmin) {
      dispatch(addUserAccountToRole(roleData));
    } else {
      dispatch(removeUserAccountFromRole(roleData));
    }
  }, [dispatch, userAccount]);

  return (
    <Paper className="user-edit__body">
      <Checkbox
        className="user-edit__body__control"
        label="Администратор MathEvent"
        value={isMathEventAdmin}
        disabled={!canEditUserRoles}
        onChange={handleIsMathEventAdminClick}
      />
      <Checkbox
        className="user-edit__body__control"
        label="Администратор MathEvent.IdentityServer"
        value={isMathEventIdentityServerAdmin}
        disabled={!canEditUserRoles}
        onChange={handleIsMathEventIdentityServerAdminClick}
      />
    </Paper>
  );
};

export default UserEditRoles;
