import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../_common/Loader';
import BarChart from '../../_common/Chart/BarChart';
import PieChart from '../../_common/Chart/PieChart';
import { fetchStatistics } from '../../../store/actions/event';
import './EventsStatistics.scss';

const eventSubsStatisticsTop = 10;

const EventsStatistics = () => {
  const dispatch = useDispatch();
  const {
    statistics,
    isFetchingEventsStatistics,
  } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchStatistics(eventSubsStatisticsTop));
  }, [dispatch]);

  return (
    <div className="events-statistics-collection">
      { isFetchingEventsStatistics ? (
        <div className="events-statistics-collection__loader-section">
          <Loader />
        </div>
      ) : (
        <div className="events-statistics-collection__collection-info">
          {statistics.map((chart) => {
            switch (chart.type) {
              case 'pie':
                return (
                  <div
                    key={chart.title}
                  >
                    <PieChart
                      className="events-statistics-collection__item"
                      data={chart.data}
                      title={chart.title}
                      valueField={chart.valueField}
                      argumentField={chart.argumentField}
                    />
                  </div>
                );
              case 'bar':
                return (
                  <div
                    key={chart.title}
                  >
                    <BarChart
                      className="events-statistics-collection__item"
                      data={chart.data}
                      title={chart.title}
                      valueField={chart.valueField}
                      argumentField={chart.argumentField}
                    />
                  </div>
                );
              default:
                return (
                  <div
                    key={chart.title}
                  >
                    <PieChart
                      className="events-statistics-collection__item"
                      data={chart.data}
                      title={chart.title}
                      valueField={chart.valueField}
                      argumentField={chart.argumentField}
                    />
                  </div>
                );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default EventsStatistics;
