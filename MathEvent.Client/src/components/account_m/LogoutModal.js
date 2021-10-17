import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { InfoModal } from '../_common/Modal';
import { logout } from '../../store/actions/account';
import { navigateToEvents } from '../../utils/navigator';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
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