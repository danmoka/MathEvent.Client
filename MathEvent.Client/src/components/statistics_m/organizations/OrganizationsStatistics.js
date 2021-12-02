import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../_common/Loader';
import BarChart from '../../_common/Chart/BarChart';
import PieChart from '../../_common/Chart/PieChart';
import { fetchStatistics } from '../../../store/actions/organization';
import './OrganizationsStatistics.scss';

const OrganizationsStatistics = () => {
  const dispatch = useDispatch();
  const { statistics, isFetchingOrganizationStatistics } = useSelector(
    (state) => state.organization,
  );

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className="organizations-statistics-collection">
      { isFetchingOrganizationStatistics ? (
        <div className="organizations-statistics-collection__loader-section">
          <Loader />
        </div>
      ) : (
        <div className="organizations-statistics-collection__collection-info">
          {statistics.map((chart) => {
            switch (chart.type) {
              case 'pie':
                return (
                  <div
                    key={chart.title}
                  >
                    <PieChart
                      className="organizations-statistics-collection__item"
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
                      className="organizations-statistics-collection__item"
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
                      className="organizations-statistics-collection__item"
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

export default OrganizationsStatistics;
