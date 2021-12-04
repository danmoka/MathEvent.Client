import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Button, { buttonTypes } from '../Button';
import { SmallText } from '../Text/Text';
import { cropText } from '../../../utils/text';

const textLength = 10;

const Breadcrumb = ({
  primaryText, isLast, onClick,
}) => {
  const {
    text: originalPrimaryText,
    croppedText: croppedPrimaryText,
  } = cropText(textLength, primaryText.toUpperCase() || '');

  return isLast ? (
    <Tooltip title={originalPrimaryText} placement="bottom">
      <div>
        <SmallText>
          {croppedPrimaryText || originalPrimaryText}
        </SmallText>
      </div>
    </Tooltip>
  ) : (
    <Tooltip title={originalPrimaryText} placement="bottom">
      <div>
        <SmallText>
          <Button
            type={buttonTypes.text}
            onClick={onClick}
          >
            {croppedPrimaryText || originalPrimaryText}
          </Button>
        </SmallText>
      </div>
    </Tooltip>
  );
};

Breadcrumb.propTypes = {
  primaryText: PropTypes.string,
  isLast: PropTypes.bool,
  onClick: PropTypes.func,
};

Breadcrumb.defaultProps = {
  primaryText: '',
  isLast: false,
  onClick: () => {},
};

export default Breadcrumb;
