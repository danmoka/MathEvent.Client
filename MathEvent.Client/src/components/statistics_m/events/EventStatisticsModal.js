import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventStatistics } from '../../../store/actions/event';
import { ShowModal, modalSizes } from '../../_common/Modal';
import BarChart from '../../_common/Chart/BarChart';
import Loader from '../../_common/Loader';
import PieChart from '../../_common/Chart/PieChart';
import './EventsStatistics.scss';

const EventStatisticsModal = () => {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.modal.modalProps);
  const { eventStatistics, isFetchingEventStatistics } = useSelector(
    (state) => state.event,
  );

  useEffect(() => {
    dispatch(fetchEventStatistics(event.id));
  }, [dispatch, event]);

  return (
    <ShowModal
      title={`Статистика события "${event.name}"`}
      size={modalSizes.small}
    >
      {isFetchingEventStatistics || eventStatistics.length < 1 ? (
        <div className="event-statistics__loader-section">
          <Loader />
        </div>
      ) : (
        <div className="event-statistics">
          {eventStatistics.map((chart) => {
            switch (chart.type) {
              case 'pie':
                return (
                  <div
                    key={chart.title}
                    className="event-statistics__item"
                  >
                    <PieChart
                      data={chart.data}
                      title={chart.title}
                      valueField={chart.valueField}
                      argumentField={chart.argumentField}
                      elevation={0}
                    />
                  </div>
                );
              case 'bar':
                return (
                  <div
                    key={chart.title}
                    className="event-statistics__item"
                  >
                    <BarChart
                      data={chart.data}
                      title={chart.title}
                      valueField={chart.valueField}
                      argumentField={chart.argumentField}
                      elevation={0}
                    />
                  </div>
                );
              default:
                return (
                  <div
                    key={chart.title}
                    className="event-statistics__item"
                  >
                    <PieChart
                      data={chart.data}
                      title={chart.title}
                      valueField={chart.valueField}
                      argumentField={chart.argumentField}
                      elevation={0}
                    />
                  </div>
                );
            }
          })}
        </div>
      )}
    </ShowModal>
  );
};

export default EventStatisticsModal;
