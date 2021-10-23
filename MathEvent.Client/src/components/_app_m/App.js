import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import AppContent from './AppContent';
import AppMenu from './AppMenu';
import { HugeText } from '../_common/Text/Text';
import { Icon, iconTypes } from '../_common/Icon';
import Image from '../_common/Image';
import Loader from '../_common/Loader';
import {
  navigateToRegister,
  navigateToLogin,
  navigateToUserEdit,
} from '../../utils/navigator';
import {
  fetchTokens,
  fetchUserInfo,
  showLogoutModal,
} from '../../store/actions/account';
import { palette, paletteDark } from '../../styles/palette';
import colors from '../../constants/colors';
import images from '../../constants/images';
import './App.scss';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
};

const tokenInterval = 1000 * 60 * 4;

const App = () => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.app);
  const {
    userInfo,
    hasToken,
    isAuthenticated,
    isFetchingAccount,
  } = useSelector((state) => state.account);

  const [anchorEl, setAnchorEl] = useState(null);

  const theme = createMuiTheme({
    palette: isDarkTheme ? paletteDark : palette,
  });

  useEffect(() => {
    dispatch(fetchTokens({ userName: null, password: null }));
  }, [dispatch]);

  useEffect(() => {
    if (hasToken) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, hasToken]);

  useInterval(() => {
    dispatch(fetchTokens({ userName: null, password: null }));
  }, tokenInterval);

  const handleRegisterClick = () => navigateToRegister();
  const handleLoginClick = () => navigateToLogin();
  const handleLogoutClick = () => {
    setAnchorEl(null);
    dispatch(showLogoutModal());
  };

  const handleUserEditClick = () => {
    setAnchorEl(null);
    navigateToUserEdit(userInfo.sub);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        className="app-header"
        position="fixed"
        color={colors.inherit}
        elevation={1}
      >
        <Toolbar className="app-header__toolbar">
          <div className="app-header__toolbar__name-section">
            <Image
              className="app-header__toolbar__logo"
              src={images.favicon}
            />
            <HugeText>
              athEvent
            </HugeText>
          </div>
          {isAuthenticated ? (
            <>
              {isFetchingAccount
                ? (
                  <div className="app-header__loader-section">
                    <Loader />
                  </div>
                )
                : (
                  <div>
                    <Button
                      endIcon={iconTypes.account}
                      onClick={handleMenuOpen}
                    >
                      {userInfo.name}
                    </Button>
                    <Popover
                      id="app-bar-popover"
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem onClick={handleUserEditClick}>
                        {userInfo.email}
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogoutClick}>
                        <ListItemIcon>
                          <Icon type={iconTypes.logout} />
                        </ListItemIcon>
                        Выйти
                      </MenuItem>
                    </Popover>
                  </div>
                )}
            </>
          ) : (
            <div>
              <Button
                onClick={handleRegisterClick}
              >
                Регистрация
              </Button>
              <Button
                color={colors.inherit}
                onClick={handleLoginClick}
              >
                Войти
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Scrollbars autoHide>
        <div className="app-content">
          <div className="app-content__body">
            <AppMenu />
            <AppContent />
          </div>
        </div>
      </Scrollbars>
    </ThemeProvider>
  );
};

export default App;
