import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CardCollection.scss';

const CardCollection = ({ className, items }) => (
  <div className={className}>
    {items.map((item) => (
      <Card
        key={item.id}
        primaryText={item.primaryText}
        secondaryText={item.secondaryText}
        additionalInfo={item.additionalInfo}
        image={item.image}
        isSelected={item.isSelected}
        onClick={item.onClick}
        actions={item.actions}
      />
    ))}
  </div>
);

CardCollection.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      primaryText: PropTypes.string,
      secondaryText: PropTypes.string,
      additionalText: PropTypes.string,
      image: PropTypes.string,
      actions: PropTypes.arrayOf(PropTypes.object),
      onClick: PropTypes.func,
    }),
  ),
};

CardCollection.defaultProps = {
  className: 'card-collection',
  items: [],
};

export default CardCollection;
