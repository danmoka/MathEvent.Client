import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setParentId } from '../../../store/actions/filters';
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
  const { isFetchingEventBreadcrumbs } = useSelector((state) => state.event);
  let { crumbs } = useSelector((state) => state.event);
  crumbs = crumbs.length > 0 ? [{ id: null, name: 'Корень' }, ...crumbs] : [];

  const handleCrumbClick = useCallback((crumb) => {
    dispatch(setParentId(crumb.id));
  }, [dispatch]);

  const handleBackButtonClick = useCallback(() => {
    const lastCrumb = crumbs[crumbs.length - 2];
    dispatch(setParentId(lastCrumb ? lastCrumb.id : null));
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
