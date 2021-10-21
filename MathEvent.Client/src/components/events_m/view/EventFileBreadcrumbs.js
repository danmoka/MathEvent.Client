import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFiles, fetchFileBreadcrumbs } from '../../../store/actions/file';
import CommonBreadcrumbs from '../../_common/Breadcrumbs';
import Loader from '../../_common/Loader';
import './EventsView.scss';

const prepareCrumbs = (crumbs, onClick) => crumbs.map((crumb, index) => ({
  id: crumb.id,
  primaryText: crumb.name,
  index: index + 1,
  isLast: index === crumbs.length - 1,
  onClick: () => onClick(crumb),
}));

const EventFileBreadcrumbs = ({ className }) => {
  const dispatch = useDispatch();
  const { eventInfo } = useSelector((state) => state.event);
  const { isFetchingFileBreadcrumbs } = useSelector((state) => state.file);
  let { crumbs } = useSelector((state) => state.file);

  crumbs = crumbs.length > 0 ? [{ id: null, name: 'Корень' }, ...crumbs] : [];

  const handleCrumbClick = useCallback((crumb) => {
    dispatch(fetchFiles({ fileId: crumb.id, ownerId: eventInfo.ownerId }));
    dispatch(fetchFileBreadcrumbs(crumb.id));
  }, [dispatch, eventInfo.ownerId]);

  const handleBackButtonClick = useCallback(() => {
    const lastCrumb = crumbs[crumbs.length - 2];
    dispatch(
      fetchFiles({
        fileId: lastCrumb ? lastCrumb.id : null,
        ownerId: eventInfo.ownerId,
      }),
    );
    dispatch(fetchFileBreadcrumbs(lastCrumb ? lastCrumb.id : null));
  }, [crumbs, dispatch, eventInfo.ownerId]);

  const preparedCrumbs = useMemo(() => prepareCrumbs(crumbs, handleCrumbClick),
    [crumbs, handleCrumbClick]);

  return (
    <div className={className}>
      {isFetchingFileBreadcrumbs
        ? (
          <div className={`${className}__loader-section`}>
            <Loader />
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
        )}
    </div>
  );
};

EventFileBreadcrumbs.propTypes = {
  className: PropTypes.string,
};

EventFileBreadcrumbs.defaultProps = {
  className: 'event-files__breadcrumbs',
};

export default EventFileBreadcrumbs;
