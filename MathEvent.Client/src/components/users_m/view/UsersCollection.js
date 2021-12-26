import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import List from '../../_common/List';
import Loader from '../../_common/Loader';
import { NormalText } from '../../_common/Text/Text';
import { showNotAuthenticated } from '../../../store/actions/user';
import { getInitials } from '../../../utils/get_initials';
import { navigateToUser } from '../../../utils/navigator';
import colors from '../../../constants/colors';

const prepareUsers = (users, onClick) => (users
  ? users.map((user, index) => ({
    id: user.id,
    primaryText: `${user.name} ${user.surname}`,
    secondaryText: user.userName,
    avatarText: getInitials(user.name, user.surname),
    index: index + 1,
    onClick: () => onClick(user),
  }))
  : []);

const UsersCollection = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.account);
  const {
    users,
    isFetchingUsers,
  } = useSelector((state) => state.user);

  const handleUserClick = useCallback((user) => {
    if (isAuthenticated) {
      navigateToUser(user.identityUserId);
    } else {
      dispatch(showNotAuthenticated());
    }
  }, [dispatch, isAuthenticated]);

  const preparedUsers = useMemo(() => prepareUsers(
    users,
    handleUserClick,
  ), [handleUserClick, users]);

  return (
    <div className="users-collection">
      { isFetchingUsers ? (
        <div className="users-collection__loader-section">
          <Loader />
        </div>
      ) : (
        <>
          { preparedUsers.length < 1
            ? (
              <NormalText
                className="users-collection__collection-info"
                color={colors.textSecondary}
              >
                Пользователей нет, попробуйте изменить строку поиска
              </NormalText>
            )
            : (
              <Paper>
                <List items={preparedUsers} />
              </Paper>
            )}
        </>
      )}
    </div>
  );
};

export default UsersCollection;
