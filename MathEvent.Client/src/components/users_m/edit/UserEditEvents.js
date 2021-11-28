import React, {
  useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Divider from '@material-ui/core/Divider';
import CardCollection from '../../_common/CardCollection';
import { iconTypes } from '../../_common/Icon';
import { NormalText } from '../../_common/Text/Text';
import {
  navigateToEvent,
  navigateToEventEdit,
} from '../../../utils/navigator';
import { prepareImage } from '../../../utils/get-image-src';
import colors from '../../../constants/colors';
import './UserEdit.scss';

const prepareEvents = (
  events,
  onClick,
  prepareActions,
  isDarkTheme,
) => events.map((event, index) => ({
  id: event.id,
  primaryText: event.name,
  additionalInfo: event.description,
  image: prepareImage(event.avatarPath, isDarkTheme),
  actions: prepareActions(event),
  index: index + 1,
  onClick: () => onClick(event),
}));

const UserEditEvents = ({ identityUserId, managedEvents, events }) => {
  const { isDarkTheme } = useSelector((state) => state.app);

  const handleEventClick = useCallback((event) => {
    navigateToEvent(event.id);
  }, []);

  const preparedManagedEvents = useMemo(
    () => (identityUserId
      ? prepareEvents(
        managedEvents,
        handleEventClick,
        (ev) => [
          {
            id: 'edit',
            label: 'Редактировать',
            icon: iconTypes.edit,
            onClick: () => navigateToEventEdit(ev.id),
          },
        ],
        isDarkTheme,
      )
      : []),
    [handleEventClick, identityUserId, isDarkTheme, managedEvents],
  );

  const preparedEvents = useMemo(
    () => (identityUserId
      ? prepareEvents(
        events,
        handleEventClick,
        () => [],
        isDarkTheme,
      )
      : []),
    [events, handleEventClick, identityUserId, isDarkTheme],
  );

  return (
    <div>
      <div className="user-edit__events">
        <div className="user-edit__events__title">
          <NormalText
            className="user-edit__events__title__name"
            color="textSecondary"
          >
            События, которыми вы управляете
          </NormalText>
          <Divider className="user-edit__events__title__divider" />
        </div>
        { preparedManagedEvents.length > 0
          ? (
            <Scrollbars autoHeight autoHeightMax={450}>
              <CardCollection
                className="user-edit__events__card-collection"
                items={preparedManagedEvents}
              />
            </Scrollbars>
          )
          : (
            <NormalText
              className="user-edit__events__card-info"
              color={colors.textSecondary}
            >
              Событий нет
            </NormalText>
          )}
      </div>

      <div className="user-edit__events">
        <div className="user-edit__events__title">
          <NormalText
            className="user-edit__events__title__name"
            color="textSecondary"
          >
            События, на которые вы подписаны
          </NormalText>
          <Divider className="user-edit__events__title__divider" />
        </div>
        { preparedEvents.length > 0
          ? (
            <Scrollbars autoHeight autoHeightMax={450}>
              <CardCollection
                className="user-edit__events__card-collection"
                items={preparedEvents}
              />
            </Scrollbars>
          )
          : (
            <NormalText
              className="user-edit__events__card-info"
              color={colors.textSecondary}
            >
              Событий нет
            </NormalText>
          )}
      </div>
    </div>
  );
};

UserEditEvents.propTypes = {
  identityUserId: PropTypes.string,
  managedEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      avatarPath: PropTypes.string,
    }),
  ),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      avatarPath: PropTypes.string,
    }),
  ),
};

UserEditEvents.defaultProps = {
  identityUserId: undefined,
  managedEvents: [],
  events: [],
};

export default UserEditEvents;
