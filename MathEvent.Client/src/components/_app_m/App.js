import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import AppContent from './AppContent';
import AppMenu from './AppMenu';
import { HugeText } from '../_common/Text/Text';
import { navigateToLogin } from '../../utils/navigator';
import { fetchTokens, fetchUserInfo } from '../../store/actions/account';
import { palette, paletteDark } from '../../styles/palette';
import colors from '../../constants/colors';
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
  const { hasToken } = useSelector((state) => state.account);
  const { isDarkTheme } = useSelector((state) => state.app);

  const theme = createMuiTheme({
    palette: isDarkTheme ? paletteDark : palette,
  });

  useEffect(() => {
    dispatch(fetchTokens({ userName: null, password: null }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, hasToken]);

  useInterval(() => {
    dispatch(fetchTokens({ userName: null, password: null }));
  }, tokenInterval);

  const handleLoginClick = () => navigateToLogin();

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
          <HugeText>
            MathEvent
          </HugeText>
          <Button
            color="inherit"
            onClick={handleLoginClick}
          >
            Войти
          </Button>
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
