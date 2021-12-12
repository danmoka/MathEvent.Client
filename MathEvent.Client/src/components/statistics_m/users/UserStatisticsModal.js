import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStatistics } from '../../../store/actions/user';
import { ShowModal, modalSizes } from '../../_common/Modal';
import BarChart from '../../_common/Chart/BarChart';
import Loader from '../../_common/Loader';
import PieChart from '../../_common/Chart/PieChart';
import './UsersStatistics.scss';

const UserStatisticsModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.modal.modalProps);
  const { userStatistics, isFetchingUserStatistics } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(fetchUserStatistics(user.identityUserId));
  }, [dispatch, user]);

  return (
    <ShowModal
      title={`Статистика пользователя ${user.name}`}
      size={modalSizes.small}
    >
      {isFetchingUserStatistics ? (
        <div className="user-statistics__loader-section">
          <Loader />
        </div>
      ) : (
        <div className="user-statistics">
          {userStatistics.map((chart) => {
            switch (chart.type) {
              case 'pie':
                return (
                  <div key={chart.title} className="user-statistics__item">
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
                  <div key={chart.title} className="user-statistics__item">
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
                  <div key={chart.title} className="user-statistics__item">
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

export default UserStatisticsModal;
