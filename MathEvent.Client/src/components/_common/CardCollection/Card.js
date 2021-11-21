import React from 'react';
import PropTypes from 'prop-types';
import { Card as MuiCard } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '../Icon';
import './CardCollection.scss';

const Card = ({
  className,
  primaryText,
  secondaryText,
  additionalText,
  image,
  actions,
  onClick,
}) => (
  <MuiCard
    className={className}
  >
    <CardActionArea
      onClick={onClick}
    >
      <CardHeader
        title={primaryText}
        subheader={secondaryText}
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
    </CardActionArea>
    { actions.length > 0 && (
    <>
      <Divider />
      <CardActions className={`${className}__actions`}>
        {actions.map((action) => (
          <IconButton
            key={action.id}
            type={action.icon}
            title={action.label}
            size="small"
            onClick={action.onClick}
          />
        ))}
      </CardActions>
    </>
    )}
  </MuiCard>
);

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
