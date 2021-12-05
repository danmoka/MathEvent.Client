import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import { HugeText, NormalText, SmallText } from '../../_common/Text/Text';
import { Icon, IconButton, iconTypes } from '../../_common/Icon';
import CardCollection from '../../_common/CardCollection';
import { useTitle } from '../../../hooks';
import { fetchUserInfo } from '../../../store/actions/user';
import {
  navigateToUsers,
  navigateToUserEdit,
  navigateToEvent,
} from '../../../utils/navigator';
import { isAbleToEditUserInfo } from '../../../utils/user_rights';
import { prepareImage } from '../../../utils/get-image-src';
import colors from '../../../constants/colors';

const prepareEvents = (
  events,
  onClick,
  isDarkTheme,
) => events.map((event, index) => ({
  id: event.id,
  primaryText: event.name,
  additionalInfo: event.description,
  image: prepareImage(event.avatarPath, isDarkTheme),
  index: index + 1,
  onClick: () => onClick(event),
}));

const User = () => {
  const dispatch = useDispatch();
  const {
    userInfo,
    isFetchingUserInfo,
  } = useSelector((state) => state.user);
  const { isAuthenticated, account } = useSelector((state) => state.account);
  const { isDarkTheme } = useSelector((state) => state.app);

  const [isAbleToEdit, setIsAbleToEdit] = useState(false);

  const { id } = useParams();
  useTitle('Пользователь');

  useEffect(() => {
    if (!isAuthenticated) {
      navigateToUsers();
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserInfo(id));
    }
  }, [dispatch, id, isAuthenticated]);

  useEffect(() => {
    if (userInfo && account) {
      setIsAbleToEdit(isAbleToEditUserInfo(account, userInfo));
    }
  }, [account, userInfo]);

  const handleEditButtonClick = useCallback(() => {
    navigateToUserEdit(id);
  }, [id]);

  const handleEventClick = useCallback((event) => {
    navigateToEvent(event.id);
  }, []);

  const preparedEvents = useMemo(
    () => (userInfo
      ? prepareEvents(
        userInfo.events,
        handleEventClick,
        () => [],
        isDarkTheme,
      )
      : []),
    [userInfo, handleEventClick, isDarkTheme],
  );

  const preparedManagedEvents = useMemo(
    () => (userInfo
      ? prepareEvents(
        userInfo.managedEvents,
        handleEventClick,
        () => [],
        isDarkTheme,
      )
      : []),
    [userInfo, handleEventClick, isDarkTheme],
  );

  return (
    <div className="user">
      { isFetchingUserInfo
        ? (
          <div className="user__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { userInfo
            && (
            <>
              <Paper className="user__body">
                <div className="user__header-section">
                  <div className="user__header-section__name">
                    <HugeText>
                      {`${userInfo.name} ${userInfo.surname}`}
                    </HugeText>
                    {isAbleToEdit && (
                    <IconButton
                      type={iconTypes.edit}
                      size="small"
                      title="Редактировать"
                      onClick={handleEditButtonClick}
                    />
                    )}
                  </div>
                </div>
                <div className="user__info-section">
                  <div
                    className="user__info-section__horizontal_icon_text"
                  >
                    <Icon type={iconTypes.business} color={colors.disabled} />
                    <NormalText>Организация</NormalText>
                  </div>
                  <div className="user__info-section__info">
                    <SmallText>
                      {userInfo.organization
                        ? userInfo.organization.name
                        : 'Отсутствует' }
                    </SmallText>
                  </div>
                </div>
              </Paper>
              <div>
                <div className="user__events">
                  <div className="user__events__title">
                    <NormalText
                      className="user__events__title__name"
                      color="textSecondary"
                    >
                      {`События, которыми ${userInfo.name} управляет`}
                    </NormalText>
                    <Divider className="user__events__title__divider" />
                  </div>
                  { preparedManagedEvents.length > 0
                    ? (
                      <Scrollbars autoHeight autoHeightMax={450}>
                        <CardCollection
                          className="user__events__card-collection"
                          items={preparedManagedEvents}
                        />
                      </Scrollbars>
                    )
                    : (
                      <NormalText
                        className="user__events__card-info"
                        color={colors.textSecondary}
                      >
                        Событий нет
                      </NormalText>
                    )}
                </div>
                <div className="user__events">
                  <div className="user__events__title">
                    <NormalText
                      className="user__events__title__name"
                      color="textSecondary"
                    >
                      {`События, на которые ${userInfo.name} подписан(a)`}
                    </NormalText>
                    <Divider className="user__events__title__divider" />
                  </div>
                  { preparedEvents.length > 0
                    ? (
                      <Scrollbars autoHeight autoHeightMax={450}>
                        <CardCollection
                          className="user__events__card-collection"
                          items={preparedEvents}
                        />
                      </Scrollbars>
                    )
                    : (
                      <NormalText
                        className="user__events__card-info"
                        color={colors.textSecondary}
                      >
                        Событий нет
                      </NormalText>
                    )}
                </div>
              </div>
            </>
            )}
          </>
        )}
    </div>
  );
};

export default User;
