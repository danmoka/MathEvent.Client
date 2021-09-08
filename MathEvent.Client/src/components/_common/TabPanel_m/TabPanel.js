import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Icon } from '../Icon';

const useStyles = makeStyles({
  iconLabelWrapper: {
    flexDirection: 'row',
  },
  iconLabel: {
    minHeight: 48,
    height: 48,
  },
  icon: {
    marginRight: 5,
    marginTop: 6,
  },
});

const TabPanel = ({ tabs, value }) => {
  const classes = useStyles();
  const [tabsValue, setTabsValue] = useState(value);

  useEffect(() => {
    setTabsValue(value);
  }, [value]);

  const handleChange = (e, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={tabsValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="on"
      >
        {tabs.map((tab) => (
          <Tab
            classes={{
              root: classes.tabRoot,
              wrapper: classes.iconLabelWrapper,
              labelIcon: classes.iconLabel,
            }}
            key={tab.label}
            label={tab.label}
            wrapped
            icon={
            tab.iconType
              ? (
                <div className={classes.icon}>
                  <Icon type={tab.iconType} />
                </div>
              )
              : null
        }
            onClick={tab.onClick}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

TabPanel.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    iconType: PropTypes.string,
    onClick: PropTypes.func,
  })),
  value: PropTypes.number,
};

TabPanel.defaultProps = {
  tabs: [],
  value: -1,
};

export default TabPanel;
