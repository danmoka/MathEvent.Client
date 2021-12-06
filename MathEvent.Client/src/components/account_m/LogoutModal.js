import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { InfoModal } from '../_common/Modal';
import { logout, revocation } from '../../store/actions/account';
import { navigateToEvents } from '../../utils/navigator';
import { clearUserInfo } from '../../store/actions/user';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(revocation());
    dispatch(clearUserInfo());
    navigateToEvents();
  }, [dispatch]);

  return (
    <InfoModal
      infoText="Вы действительно хотите выйти?"
      okButtonText="Да"
      title="Выход"
      onSubmit={handleLogout}
    />
  );
};

export default LogoutModal;
