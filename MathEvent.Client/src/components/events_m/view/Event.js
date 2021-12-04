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
  patchEvent,
  showEventLocation,
} from '../../../store/actions/event';
import {
  fetchOrCreateUserInfo,
} from '../../../store/actions/user';
import { fetchPosition } from '../../../store/actions/map';
import { setParentId } from '../../../store/actions/filters';
import { useTitle } from '../../../hooks';
import { prepareImage } from '../../../utils/get-image-src';
import { getInitials } from '../../../utils/get_initials';
import { isAbleToEditEvent } from '../../../utils/user_rights';
import {
  navigateToEvents,
  navigateToEventEdit,
} from '../../../utils/navigator';
import { getLocaleDateTimeFromUTC } from '../../../utils/time';
import colors from '../../../constants/colors';
import './EventsView.scss';

const prepareUsers = (users) => (users
  ? users.map((user, index) => ({
    id: user.id,
    primaryText: `${user.name} ${user.surname}`,
    secondaryText: user.userName,
    avatarText: getInitials(user.name, user.surname),
    index: index + 1,
    onClick: () => {},
  }))
  : []);

const Event = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
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

  const preparedManagers = useMemo(
    () => (eventInfo ? prepareUsers(eventInfo.managers) : []),
    [eventInfo],
  );

  const preparedSubscribers = useMemo(
    () => (eventInfo ? prepareUsers(eventInfo.applicationUsers) : []),
    [eventInfo],
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

  const handleShowLocation = useCallback(() => {
    dispatch(showEventLocation({ position }));
  }, [dispatch, position]);

  const handleNavigateToChildrenClick = useCallback(() => {
    if (eventInfo) {
      dispatch(setParentId(eventInfo.id));
      navigateToEvents();
    }
  }, [dispatch, eventInfo]);

  const handlePatchEvent = useCallback(
    (data) => {
      dispatch(
        patchEvent({
          eventId: id,
          data,
        }),
      );
    },
    [dispatch, id],
  );

  const handleSubcribersChange = useCallback(() => {
    // TODO: патч не подходит из-за особенностей авторизации
    if (userInfo && eventInfo) {
      let subscribersIds = eventInfo.applicationUsers.map((user) => user.id);

      if (subscribersIds.includes(userInfo.id)) {
        subscribersIds.splice(subscribersIds.indexOf(userInfo.id), 1);
      } else {
        subscribersIds = [...subscribersIds, userInfo.id];
      }

      handlePatchEvent([
        {
          value: subscribersIds,
          path: '/ApplicationUsers',
          op: 'replace',
        },
      ]);
    }
  }, [handlePatchEvent, userInfo, eventInfo]);

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
                    {isAbleToEdit && (
                    <IconButton
                      type={iconTypes.edit}
                      size="small"
                      title="Редактировать"
                      onClick={handleEditButtonClick}
                    />
                    )}
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
