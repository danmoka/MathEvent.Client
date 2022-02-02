import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import { HugeText, NormalText, SmallText } from '../../_common/Text/Text';
import { Icon, IconButton, iconTypes } from '../../_common/Icon';
import {
  fetchOrganization,
  showDeleteOrganizationModal,
} from '../../../store/actions/organization';
import { useTitle } from '../../../hooks';
import { navigateToOrganizationEdit } from '../../../utils/navigator';
import colors from '../../../constants/colors';
import { isMathEventExecutive } from '../../../utils/user_rights';
import './OrganizationsView.scss';

const Organization = () => {
  const dispatch = useDispatch();
  const {
    organization, isFetchingOrganization,
  } = useSelector((state) => state.organization);
  const { account } = useSelector((state) => state.account);

  const [isAbleToEdit, setIsAbleToEdit] = useState(false);

  const { id } = useParams();
  useTitle('Организация');

  useEffect(() => {
    dispatch(fetchOrganization(id));
  }, [dispatch, id]);

  useEffect(() => {
    setIsAbleToEdit(isMathEventExecutive(account));
  }, [account]);

  const handleEditButtonClick = useCallback(() => {
    navigateToOrganizationEdit(id);
  }, [id]);

  const handleOrganizationDeleteClick = useCallback(() => {
    dispatch(showDeleteOrganizationModal({
      id: organization.id, name: organization.name,
    }));
  }, [dispatch, organization]);

  return (
    <div className="organization">
      {isFetchingOrganization
        ? (
          <div className="organization__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { organization
            && (
            <>
              <Paper className="organization__body">
                <div className="organization__header-section">
                  <div className="organization__header-section__name">
                    <HugeText>
                      {organization.name}
                    </HugeText>
                    {isAbleToEdit && (
                    <div
                      className="organization__header-section__name__buttons"
                    >
                      <IconButton
                        type={iconTypes.edit}
                        size="small"
                        title="Редактировать"
                        onClick={handleEditButtonClick}
                      />
                      <IconButton
                        type={iconTypes.delete}
                        size="small"
                        title="Удалить"
                        onClick={handleOrganizationDeleteClick}
                      />
                    </div>
                    )}
                  </div>
                </div>
                <div className="organization__info-section">
                  <div
                    className="organization__info-section__horizontal_icon_text"
                  >
                    <Icon
                      type={iconTypes.description}
                      color={colors.disabled}
                    />
                    <NormalText>
                      Описание
                    </NormalText>
                  </div>
                  <div className="organization__info-section__info">
                    <SmallText>
                      {`${organization.description || 'Описание отсутствует'}`}
                    </SmallText>
                  </div>
                </div>
                <div className="organization__info-section">
                  <div
                    className="organization__info-section__horizontal_icon_text"
                  >
                    <Icon type={iconTypes.business} color={colors.disabled} />
                    <NormalText>ИНН</NormalText>
                  </div>
                  <div className="organization__info-section__info">
                    <SmallText>
                      {`${organization.itn || 'ИНН отсутствует'}`}
                    </SmallText>
                  </div>
                </div>
              </Paper>
            </>
            )}
          </>
        )}
    </div>
  );
};

export default Organization;
