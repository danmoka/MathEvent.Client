import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../_common/Loader';
import BarChart from '../../_common/Chart/BarChart';
import PieChart from '../../_common/Chart/PieChart';
import { fetchStatistics } from '../../../store/actions/user';
import './UsersStatistics.scss';

const activeUsersTop = 10;

const UsersStatistics = () => {
  const dispatch = useDispatch();
  const { statistics, isFetchingUserStatistics } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(fetchStatistics(activeUsersTop));
  }, [dispatch]);

  return (
    <div className="users-statistics-collection">
      { isFetchingUserStatistics ? (
        <div className="users-statistics-collection__loader-section">
          <Loader />
        </div>
      ) : (
        <div className="users-statistics-collection__collection-info">
          {statistics.map((chart) => {
            switch (chart.type) {
              case 'pie':
                return (
                  <div
                    key={chart.title}
                  >
                    <PieChart
                      className="users-statistics-collection__item"
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
                      className="users-statistics-collection__item"
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
                      className="users-statistics-collection__item"
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

export default UsersStatistics;
