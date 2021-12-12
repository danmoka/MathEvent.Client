import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Scrollbars from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import Button, { buttonTypes } from '../../_common/Button';
import { HugeText, NormalText, SmallText } from '../../_common/Text/Text';
import { Date } from '../../_common/Date';
import { Icon, IconButton, iconTypes } from '../../_common/Icon';
import List from '../../_common/List';
import ZoomImage from '../../_common/ZoomImage';
import EventFiles from './EventFiles';
import {
  fetchEvent,
  showEventLocation,
  showEventStatistics,
  subscribe,
  unsubscribe,
} from '../../../store/actions/event';
import {
  fetchOrCreateUserInfo, showNotAuthenticated,
} from '../../../store/actions/user';
import { fetchPosition } from '../../../store/actions/map';
import {
  setParentId,
  setStartDateFromFilter,
  setStartDateToFilter,
} from '../../../store/actions/filters';
import { useTitle } from '../../../hooks';
import { prepareImage } from '../../../utils/get-image-src';
import { getInitials } from '../../../utils/get_initials';
import { isAbleToEditEvent } from '../../../utils/user_rights';
import {
  navigateToEvents,
  navigateToEventEdit,
  navigateToUser,
} from '../../../utils/navigator';
import { getLocaleDateTimeFromUTC } from '../../../utils/time';
import colors from '../../../constants/colors';
import './EventsView.scss';

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

const Event = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, account } = useSelector((state) => state.account);
  const { eventInfo, isFetchingEvent } = useSelector((state) => state.event);
  const { userInfo } = useSelector((state) => state.user);
  const { isDarkTheme } = useSelector((state) => state.app);
  const {
    positionResults,
    isFetchingPosition,
  } = useSelector((state) => state.map);

  const [isAbleToEdit, setIsAbleToEdit] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { id } = useParams();
  useTitle('Событие');

  const preparedImage = eventInfo
    ? prepareImage(eventInfo.avatarPath, isDarkTheme)
    : null;
  const position = positionResults.length > 0 ? positionResults[0] : null;

  const handleUserClick = useCallback((user) => {
    if (isAuthenticated) {
      navigateToUser(user.identityUserId);
    } else {
      dispatch(showNotAuthenticated());
    }
  }, [dispatch, isAuthenticated]);

  const preparedManagers = useMemo(
    () => (eventInfo ? prepareUsers(eventInfo.managers, handleUserClick) : []),
    [eventInfo, handleUserClick],
  );

  const preparedSubscribers = useMemo(
    () => (eventInfo ? prepareUsers(
      eventInfo.applicationUsers,
      handleUserClick,
    ) : []),
    [eventInfo, handleUserClick],
  );

  useEffect(() => {
    if (account) {
      if (!userInfo || userInfo.identityUserId !== account.sub) {
        const [name, surname] = account.given_name.split(' ');
        const {
          sub: identityUserId,
          email,
        } = account;
        dispatch(fetchOrCreateUserInfo({
          identityUserId,
          email,
          name,
          surname,
        }));
      }
    }
  }, [dispatch, account, id, userInfo]);

  useEffect(() => {
    setIsAbleToEdit(isAbleToEditEvent(userInfo, account, eventInfo));
  }, [account, eventInfo, userInfo]);

  useEffect(() => {
    if (eventInfo?.location) {
      dispatch(fetchPosition(eventInfo.location));
    }
  }, [dispatch, eventInfo]);

  useEffect(() => {
    if (eventInfo && userInfo) {
      setSubscribed(
        eventInfo
          ? eventInfo.applicationUsers.filter(
            (user) => user.id === userInfo.id,
          ).length > 0
          : false,
      );
    }
  }, [dispatch, eventInfo, userInfo]);

  useEffect(() => {
    dispatch(fetchEvent(id));
  }, [dispatch, id]);

  const handleEditButtonClick = useCallback(() => {
    navigateToEventEdit(id);
  }, [id]);

  const handleShowEventStatistics = useCallback(() => {
    if (eventInfo) {
      dispatch(showEventStatistics({ event: eventInfo }));
    }
  }, [dispatch, eventInfo]);

  const handleShowLocation = useCallback(() => {
    dispatch(showEventLocation({ position }));
  }, [dispatch, position]);

  const handleNavigateToChildrenClick = useCallback(() => {
    if (eventInfo) {
      dispatch(setStartDateFromFilter(null));
      dispatch(setStartDateToFilter(null));
      dispatch(setParentId(eventInfo.id));
      navigateToEvents();
    }
  }, [dispatch, eventInfo]);

  const handleSubcribersChange = useCallback(() => {
    if (userInfo && eventInfo) {
      const subscribersIds = eventInfo.applicationUsers.map((user) => user.id);

      if (subscribersIds.includes(userInfo.id)) {
        dispatch(unsubscribe({ eventId: eventInfo.id }));
      } else {
        dispatch(subscribe({ eventId: eventInfo.id }));
      }
    }
  }, [dispatch, userInfo, eventInfo]);

  return (
    <div className="event">
      {isFetchingEvent
        ? (
          <div className="event__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { eventInfo
            && (
            <>
              <Paper className="event__body">
                <div className="event__header-section">
                  <div className="event__header-section__name">
                    <HugeText>
                      {eventInfo.name}
                    </HugeText>
                    <div className="event__header-section__name__buttons">
                      <IconButton
                        type={iconTypes.stats}
                        size="small"
                        title="Статистика"
                        onClick={handleShowEventStatistics}
                      />
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
                  <Date date={getLocaleDateTimeFromUTC(eventInfo.startDate)} />
                </div>
                <div className="event__buttons-section">
                  <Button
                    startIcon={
              subscribed
                ? iconTypes.personAddDisabled
                : iconTypes.personAdd
              }
                    disabled={!userInfo}
                    onClick={handleSubcribersChange}
                  >
                    {subscribed ? 'Отписаться' : 'Записаться'}
                  </Button>
                  {eventInfo.hierarchy && (
                  <Button
                    startIcon={iconTypes.events}
                    onClick={handleNavigateToChildrenClick}
                  >
                    Дочерние события
                  </Button>
                  )}
                </div>
                <div className="event__info-section">
                  <div className="event__info-section__horizontal_icon_text">
                    <Icon
                      type={iconTypes.description}
                      color={colors.disabled}
                    />
                    <NormalText>
                      Описание
                    </NormalText>
                  </div>
                  <div className="event__info-section__info">
                    <SmallText>
                      {eventInfo.description}
                    </SmallText>
                  </div>
                </div>
                <div className="event__image-section">
                  <ZoomImage
                    className="event__image-section__image"
                    src={preparedImage}
                    alt={eventInfo.name}
                  />
                </div>
                <div className="event__info-section">
                  <div className="event__info-section__horizontal_icon_text">
                    <Icon type={iconTypes.business} color={colors.disabled} />
                    <NormalText>Организация</NormalText>
                  </div>
                  <div className="event__info-section__info">
                    <SmallText>
                      {`${eventInfo.organization?.name
                  || 'Организация отсутствует'}`}
                    </SmallText>
                  </div>
                  {isFetchingPosition
                    ? (
                      <div className="event__loader-section">
                        <Loader />
                      </div>
                    )
                    : (
                      <>
                        <div
                          className="event__info-section__horizontal_icon_text"
                        >
                          <Icon
                            type={iconTypes.location}
                            color={colors.disabled}
                          />
                          <NormalText>Адрес</NormalText>
                        </div>
                        <div className="event__info-section__info">
                          {eventInfo.location
                            ? (
                              <Button
                                type={buttonTypes.text}
                                onClick={handleShowLocation}
                              >
                                {eventInfo.location}
                              </Button>
                            )
                            : (
                              <SmallText>Местоположение не указано</SmallText>
                            )}
                        </div>
                      </>
                    )}
                </div>
                <div className="event__info-section">
                  <div className="event__info-section__horizontal_icon_text">
                    <Icon type={iconTypes.settings} color={colors.disabled} />
                    <NormalText>
                      Менеджеры
                    </NormalText>
                  </div>
                  <div className="event__info-section__info">
                    {eventInfo.managers?.length > 0
                      ? (
                        <Scrollbars autoHide autoHeight autoHeightMax={500}>
                          <List
                            items={preparedManagers}
                          />
                        </Scrollbars>
                      )
                      : (
                        <SmallText>
                          Менеджеры отсутствуют
                        </SmallText>
                      )}
                  </div>
                </div>
                <div className="event__info-section">
                  <div className="event__info-section__horizontal_icon_text">
                    <Icon
                      type={iconTypes.supervisedUser}
                      color={colors.disabled}
                    />
                    <NormalText>
                      Подписчики
                    </NormalText>
                  </div>
                  <div className="event__info-section__info">
                    {eventInfo.applicationUsers?.length > 0
                      ? (
                        <Scrollbars autoHide autoHeight autoHeightMax={500}>
                          <List
                            items={preparedSubscribers}
                          />
                        </Scrollbars>
                      )
                      : (
                        <SmallText>
                          Подписчиков нет. Станьте первым!
                        </SmallText>
                      )}
                  </div>
                </div>
              </Paper>
              <EventFiles className="event-files" />
            </>
            )}
          </>
        )}
    </div>
  );
};

export default Event;
