import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  fetchEventBreadcrumbs,
} from '../../../store/actions/event';
import CommonBreadcrumbs from '../../_common/Breadcrumbs';
import Loader from '../../_common/Loader';
import './EventsView.scss';

const prepareCrumbs = (crumbs, onClick) => crumbs.map((crumb, index) => ({
  id: crumb.id,
  primaryText: crumb.name,
  index: index + 1,
  isLast: index === (crumbs.length - 1),
  onClick: () => onClick(crumb),
}));

const EventsBreadcrumbs = () => {
  const dispatch = useDispatch();
  let { crumbs } = useSelector((state) => state.event);
  const { isFetchingEventBreadcrumbs } = useSelector((state) => state.event);
  crumbs = crumbs.length > 0 ? [{ id: null, name: '' }, ...crumbs] : [];

  const handleCrumbClick = useCallback((crumb) => {
    dispatch(fetchEvents(crumb.id));
    dispatch(fetchEventBreadcrumbs(crumb.id));
  }, [dispatch]);

  const handleBackButtonClick = useCallback(() => {
    const lastCrumb = crumbs[crumbs.length - 2];
    dispatch(fetchEvents(lastCrumb ? lastCrumb.id : null));
    dispatch(fetchEventBreadcrumbs(lastCrumb ? lastCrumb.id : null));
  }, [crumbs, dispatch]);

  const preparedCrumbs = prepareCrumbs(
    crumbs,
    handleCrumbClick,
  );

  return (
    isFetchingEventBreadcrumbs
      ? (
        <div className="events-breadcrumbs__loader-section">
          <Loader size="small" />
        </div>
      )
      : (
        <>
          {crumbs.length > 0
            && (
              <CommonBreadcrumbs
                items={preparedCrumbs}
                backButtonOnClick={handleBackButtonClick}
              />
            )}
        </>
      )
  );
};

export default EventsBreadcrumbs;
