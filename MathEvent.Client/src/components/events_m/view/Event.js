import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Scrollbars from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import Button, { buttonTypes } from '../../_common/Button';
import { HugeText, NormalText, SmallText } from '../../_common/Text/Text';
import { Date } from '../../_common/Date';
import { Icon, IconButton, iconTypes } from '../../_common/Icon';
import Image from '../../_common/Image';
import List from '../../_common/List';
import EventFiles from './EventFiles';
import {
  fetchEvent,
} from '../../../store/actions/event';
import { useTitle } from '../../../hooks';
import { getImageSrc } from '../../../utils/get-image-src';
import images from '../../../constants/images';
import getInitials from '../../../utils/get_initials';
import { isAbleToEditEvent } from '../../../utils/user_rights';
import { navigateToEventEdit } from '../../../utils/navigator';
import './EventsView.scss';

const prepareImage = (path, isDarkTheme) => {
  if (path) {
    return getImageSrc(path);
  }
  if (isDarkTheme) {
    return images.eventDefaultDark;
  }

  return images.eventDefault;
};

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
  const { eventInfo, isFetchingEvent } = useSelector((state) => state.event);
  const { userInfo } = useSelector((state) => state.account);
  const { isDarkTheme } = useSelector((state) => state.app);

  const { id } = useParams();
  useTitle('Событие');

  useEffect(() => {
    dispatch(fetchEvent(id));
  }, [dispatch, id]);

  const handleEditButtonClick = useCallback(() => {
    navigateToEventEdit(id);
  }, [id]);

  const preparedImage = useMemo(
    () => prepareImage(eventInfo.avatarPath, isDarkTheme),
    [eventInfo.avatarPath, isDarkTheme],
  );

  const preparedManagers = useMemo(
    () => prepareUsers(eventInfo.managers),
    [eventInfo.managers],
  );

  const preparedSubscribers = useMemo(
    () => prepareUsers(eventInfo.applicationUsers),
    [eventInfo.applicationUsers],
  );

  // TODO: после ауфа - использовать
  const isAbleToEdit = useMemo(
    () => isAbleToEditEvent(userInfo, eventInfo), [userInfo, eventInfo],
  );

  return (
    <div className="event">
      {isFetchingEvent
        ? (
          <div className="event__loader-section">
            <Loader />
          </div>
        )
        : (
          <Paper className="event__body">
            <div className="event__header-section">
              <div className="event__header-section__name">
                <HugeText>
                  {eventInfo.name}
                </HugeText>
                {true && (
                <IconButton
                  type={iconTypes.edit}
                  size="small"
                  onClick={handleEditButtonClick}
                />
                )}
              </div>
              <Date date={eventInfo.startDate} />
            </div>
            <div className="event__buttons-section">
              <Button
                startIcon={
              eventInfo.subscribed
                ? iconTypes.personAddDisabled
                : iconTypes.personAdd
              }
                onClick={() => {}}
              >
                {eventInfo.subscribed ? 'Отписаться' : 'Записаться'}
              </Button>
              {eventInfo.hierarchy && (
              <Button
                startIcon={iconTypes.events}
                onClick={() => {}}
              >
                Дочерние события
              </Button>
              )}
            </div>
            <div className="event__info-section">
              <div className="event__info-section__horizontal_icon_text">
                <Icon type={iconTypes.description} />
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
              <Image
                className="event__image-section__image"
                src={preparedImage}
                alt={eventInfo.name}
              />
            </div>
            <div className="event__info-section">
              <div className="event__info-section__horizontal_icon_text">
                <Icon type={iconTypes.business} />
                <NormalText>Организация</NormalText>
              </div>
              <div className="event__info-section__info">
                <SmallText>
                  {`${eventInfo.organizationName
                  || 'Организация отсутствует'}`}
                </SmallText>
              </div>
              {eventInfo.isFetchingPosition
                ? (
                  <div className="event__loader-section">
                    <Loader />
                  </div>
                )
                : (
                  <>
                    <div className="event__info-section__horizontal_icon_text">
                      <Icon type={iconTypes.location} />
                      <NormalText>Адрес</NormalText>
                    </div>
                    <div className="event__info-section__info">
                      {eventInfo.location
                        ? (
                          <Button type={buttonTypes.text} onClick={() => {}}>
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
                <Icon type={iconTypes.settings} />
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
                <Icon type={iconTypes.supervisedUser} />
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
        )}
      <EventFiles className="event-files" />
    </div>
  );
};

export default Event;