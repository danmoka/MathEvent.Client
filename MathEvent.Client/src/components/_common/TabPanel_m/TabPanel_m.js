import React, { useEffect, useState } from 'react';
import { arrayOf, string } from 'prop-types';
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
              ? <Icon type={tab.iconType} />
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
  tabs: arrayOf({
    label: string,
    onClick: () => {},
    iconType: string,
  }),
  value: {
    label: string,
    onClick: () => {},
    iconType: string,
  },
};

TabPanel.defaultProps = {
  tabs: [{
    label: '',
    onClick: () => {},
    iconType: null,
  }],
  value: {
    label: '',
    onClick: () => {},
    iconType: null,
  },
};

export default TabPanel;
