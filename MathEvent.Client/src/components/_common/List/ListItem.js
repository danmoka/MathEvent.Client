import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction
from '@material-ui/core/ListItemSecondaryAction';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import Popover from '@material-ui/core/Popover';
import { Icon, IconButton, iconTypes } from '../Icon';
import Checkbox from '../Checkbox';
import './List.scss';

const useItemTextStyles = makeStyles({
  secondary: {
    fontSize: '14px',
  },
});

const useStyles = makeStyles((theme) => ({
  notSelected: {
    width: '100%',
    listStyleType: 'none',
    borderLeft: '6px !important',
  },
  selected: {
    width: '100%',
    listStyleType: 'none',
    borderLeft: `6px solid ${theme.palette.primary.main} !important`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: 10,
  },
}));

const ListItem = ({
  id,
  primaryText,
  secondaryText,
  avatarText,
  isSelected,
  checked,
  actions,
  onClick,
  onCheck,
}) => {
  const classes = useStyles(useTheme());
  const listItemTextClasses = useItemTextStyles();
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setIsHovered(false);
  };

  const handleMenuClose = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleSecondaryAction = useCallback(
    (e, action) => {
      handleMenuClose(e);
      action();
    },
    [handleMenuClose],
  );

  const handleCheck = useCallback(
    (newValue) => {
      onCheck(id, newValue);
    },
    [id, onCheck],
  );

  return (
    <MuiListItem
      className={isSelected ? classes.selected : classes.notSelected}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      selected={isSelected}
      button
    >
      {avatarText && (
        <Avatar aria-label="Avatar" className={classes.avatar}>
          {avatarText}
        </Avatar>
      )}

      {onCheck && (
        <MuiListItemIcon>
          <Checkbox value={checked} onChange={handleCheck} />
        </MuiListItemIcon>
      )}

      <MuiListItemText
        classes={listItemTextClasses}
        primary={primaryText}
        secondary={secondaryText}
      />

      {actions && (
        <>
          <MuiListItemSecondaryAction
            className={
              isHovered
                ? 'list-item__secondary--hovered'
                : 'list-item__secondary'
            }
            onClick={handleMenuOpen}
          >
            <IconButton type={iconTypes.more} />
          </MuiListItemSecondaryAction>
          <Popover
            id="list-item-popover"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div className="list-item__secondary-menu">
              {actions.map((action) => (
                <MuiMenuItem
                  key={action.id}
                  onClick={(e) => handleSecondaryAction(e, action.onClick)}
                >
                  <MuiListItemIcon>
                    <Icon type={action.icon} />
                  </MuiListItemIcon>
                  {action.label}
                </MuiMenuItem>
              ))}
            </div>
          </Popover>
        </>
      )}
    </MuiListItem>
  );
};

ListItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  avatarText: PropTypes.string,
  isSelected: PropTypes.bool,
  checked: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  onClick: PropTypes.func,
  onCheck: PropTypes.func,
};

ListItem.defaultProps = {
  id: 0,
  primaryText: '',
  secondaryText: '',
  avatarText: '',
  isSelected: false,
  checked: false,
  actions: undefined,
  onClick: () => {},
  onCheck: undefined,
};

export default ListItem;
