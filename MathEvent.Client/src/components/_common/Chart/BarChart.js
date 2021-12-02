import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Title as ChartTitle,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import Title from './Title';
import Image from '../Image';
import schemeCollection from '../../../constants/chart-color-scheme';
import images from '../../../constants/images';
import './Chart.scss';

const BarChart = ({
  className, data, valueField, argumentField, title,
}) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.app);
  const [scheme, setScheme] = useState(schemeCollection.schemeCategory10);
  const [img, setImg] = useState(images.emptyChartDefault);

  useEffect(() => {
    if (isDarkTheme) {
      setScheme(schemeCollection.schemeDark2);
      setImg(images.emptyChartDark);
    } else {
      setScheme(schemeCollection.schemeCategory10);
      setImg(images.emptyChartDefault);
    }
  }, [dispatch, isDarkTheme]);

  return (
    data?.length > 0
      ? (
        <Paper className={className}>
          <Chart
            data={data}
          >
            <Palette scheme={scheme} />
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              valueField={valueField}
              argumentField={argumentField}
            />
            <ChartTitle
              text={title}
              textComponent={Title}
            />
          </Chart>
        </Paper>
      )
      : (
        <Paper className={className}>
          <Title
            className="chart__no-data-title"
            text={title}
          />
          <div className="chart__image-section">
            <Image
              className="chart__image-section__image"
              src={img}
              alt="Данные отсутствуют"
            />
          </div>
        </Paper>
      )
  );
};

BarChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.number,
  })),
  valueField: PropTypes.string,
  argumentField: PropTypes.string,
  title: PropTypes.string,
};

BarChart.defaultProps = {
  className: 'chart',
  data: [],
  valueField: '',
  argumentField: '',
  title: '',
};

export default BarChart;
