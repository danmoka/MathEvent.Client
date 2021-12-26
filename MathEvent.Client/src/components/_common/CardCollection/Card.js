import React from 'react';
import PropTypes from 'prop-types';
import { Card as MuiCard } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import { IconButton } from '../Icon';
import { SmallText } from '../Text/Text';
import './CardCollection.scss';

const Card = ({
  className,
  primaryText,
  secondaryText,
  additionalInfo,
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
        <SmallText color="textSecondary">
          {additionalInfo}
        </SmallText>
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
  additionalInfo: PropTypes.string,
  image: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

Card.defaultProps = {
  className: 'card',
  primaryText: '',
  secondaryText: '',
  additionalInfo: '',
  image: '',
  actions: [],
  onClick: () => {},
};

export default Card;
