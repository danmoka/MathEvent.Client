import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import './Map.scss';

const Location = ({ location, label, zoom }) => (
  <MapContainer
    className="map-location"
    center={location}
    zoom={zoom}
  >
    <Marker
      position={location}
    >
      <Popup>
        {label}
      </Popup>
    </Marker>
    <TileLayer
      // eslint-disable-next-line max-len
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
);

Location.propTypes = {
  location: PropTypes.arrayOf(PropTypes.number),
  label: PropTypes.string,
  zoom: PropTypes.number,
};

Location.defaultProps = {
  location: [],
  label: 'Карта',
  zoom: 13,
};

export default Location;
