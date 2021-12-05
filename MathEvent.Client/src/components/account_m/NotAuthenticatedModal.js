import React from 'react';
import { ShowModal, modalSizes } from '../_common/Modal';
import { NormalText } from '../_common/Text/Text';

const NotAuthenticatedModal = () => (
  <ShowModal title="Войдите в систему" size={modalSizes.small}>
    <NormalText>
      Для просмотра информации необходимо аутентифицироваться
    </NormalText>
  </ShowModal>
);

export default NotAuthenticatedModal;
