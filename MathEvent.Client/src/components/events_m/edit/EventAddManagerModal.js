import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars-2';
import { ShowModal } from '../../_common/Modal';
import List from '../../_common/List';
import { NormalText } from '../../_common/Text/Text';
import { patchEvent } from '../../../store/actions/event';
import { fetchUsers } from '../../../store/actions/user';
import { getInitials } from '../../../utils/get_initials';

const prepareNewManagers = (
  users,
  managers,
  onClick,
) => users
  .filter((user) => managers.filter((m) => m.id === user.id).length < 1)
  .map((user, index) => ({
    id: user.id,
    primaryText: `${user.name} ${user.surname}`,
    secondaryText: user.userName,
    avatarText: getInitials(user.name, user.surname),
    index: index + 1,
    onClick: () => onClick(user),
  }));

const EventAddManagerModal = () => {
  const dispatch = useDispatch();
  const { eventInfo } = useSelector((state) => state.event);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlePatchEvent = useCallback(
    (data) => {
      dispatch(
        patchEvent({
          eventId: eventInfo.id,
          data,
        }),
      );
    },
    [dispatch, eventInfo],
  );

  const handleManagerAdd = useCallback(
    (managers) => {
      handlePatchEvent([
        {
          value: managers.map((m) => m.id),
          path: '/Managers',
          op: 'replace',
        },
      ]);
    },
    [handlePatchEvent],
  );

  const handleUserClick = useCallback((user) => {
    handleManagerAdd([...eventInfo.managers, user]);
  }, [eventInfo.managers, handleManagerAdd]);

  const preparedUsers = useMemo((
  ) => prepareNewManagers(users, eventInfo.managers, handleUserClick), [
    users,
    eventInfo.managers,
    handleUserClick,
  ]);

  return (
    <ShowModal
      title="Нажмите на пользователя, которого хотите добавить в менеджеры"
    >
      {preparedUsers.length > 0
        ? (
          <Scrollbars autoHide autoHeight autoHeightMax={500}>
            <List items={preparedUsers} />
          </Scrollbars>
        )
        : (
          <NormalText>Все пользователи являются менеджерами события</NormalText>
        )}
    </ShowModal>
  );
};

export default EventAddManagerModal;
