import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import File from './File';

const Files = ({ items }) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
  >
    {items.map((item) => (
      <Grid key={item.id} item>
        <File
          key={item.id}
          name={item.name}
          ext={item.ext}
          hierarchy={item.hierarchy}
          onClick={item.onClick}
          actions={item.actions}
        />
      </Grid>
    ))}
  </Grid>
);

Files.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    ext: PropTypes.string,
    hierarchy: PropTypes.bool,
    onClick: PropTypes.func,
    actions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
    })),
  })),
};

Files.defaultProps = {
  items: [],
};

export default Files;
