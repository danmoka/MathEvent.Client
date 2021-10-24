import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Card as MuiCard } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Icon, IconButton, iconTypes } from '../Icon';
import './CardCollection.scss';

const Card = ({
  className,
  primaryText,
  secondaryText,
  additionalText,
  image,
  actions,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = useCallback(
    (e) => {
      e.stopPropagation();
      setAnchorEl(null);
    },
    [],
  );

  const handleSecondaryAction = useCallback(
    (e, action) => {
      handleMenuClose(e);
      action();
    },
    [handleMenuClose],
  );

  return (
    <MuiCard
      className={className}
      onClick={onClick}
    >
      <CardHeader
        title={primaryText}
        subheader={secondaryText}
        action={actions.length > 0
          ? (
            <>
              <IconButton type={iconTypes.more} onClick={handleMenuOpen} />
              <Popover
                id="list-item-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <div>
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
          )
          : (<></>)}
      />
      <CardMedia
        className={`${className}__media`}
        title={primaryText}
        image={image}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {additionalText}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  additionalText: PropTypes.string,
  image: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

Card.defaultProps = {
  className: 'card',
  primaryText: '',
  secondaryText: '',
  additionalText: '',
  image: '',
  actions: [],
  onClick: () => {},
};

export default Card;
