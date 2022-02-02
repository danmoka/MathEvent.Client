const paletteDark2 = {
  type: 'dark',
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
  primary: {
    light: '#e2cdfd',
    main: '#cfabfd',
    dark: '#BB86FC',
  },
  secondary: {
    light: '#d4f6f2',
    main: '#92e9dc',
    dark: '#03dac6',
  },
  error: {
    light: '#e49cad',
    main: '#d87a8f',
    dark: '#CF6679',
  },
  success: {
    light: '#41c300',
    main: '#09af00',
    dark: '#008b00',
  },
  warning: {
    light: '#fed6b4',
    main: '#fcbb86',
    dark: '#fb9f59',
  },
  info: {
    light: '#cdcdfd',
    main: '#aaadfd',
    dark: '#868cfc',
  },
  tonalOffset: 0.2,
  contrastThreshold: 3,
};

const palette2 = {
  type: 'light',
  background: {
    default: '#F5F5F5',
    paper: '#fff',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  primary: {
    light: '#803ff2',
    main: '#6300ee',
    dark: '#5600e8',
  },
  secondary: {
    light: '#009b9e',
    main: '#018787',
    dark: '#05635e',
  },
  error: {
    light: '#cc1d33',
    main: '#bf152c',
    dark: '#b00020',
  },
  success: {
    light: '#41c300',
    main: '#09af00',
    dark: '#008b00',
  },
  warning: {
    light: '#f47400',
    main: '#ee6300',
    dark: '#e54602',
  },
  info: {
    light: '#e256f2',
    main: '#da00ee',
    dark: '#d100ea',
  },
  tonalOffset: 0.2,
  contrastThreshold: 3,
};

const palette = {
  background: {
    default: '#F5F5F5',
  },
  error: {
    light: '#e33371',
    main: '#dc004e',
    dark: '#9a0036',
    contrastText: '#fff',
  },
  warning: {
    light: '#ffab40',
    main: '#ff9100',
    dark: '#ff6d00',
    contrastText: '#fff',
  },
  info: {
    light: '#536dfe',
    main: '#3d5afe',
    dark: '#304ffe',
    contrastText: '#fff',
  },
  secondary: {
    light: '#536dfe',
    main: '#3d5afe',
    dark: '#304ffe',
    contrastText: '#fff',
  },
  primary: {
    light: '#9891ff',
    main: '#6C63FF',
    dark: '#4b45b2',
    contrastText: '#fff',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: '#fff',
  },
  default: {
    light: '#F5F5F5',
    main: '#EEEEEE',
    dark: '#E0E0E0',
    contrastText: '#000',
  },
};

const paletteDark = {
  type: 'dark',
  error: {
    light: '#e33371',
    main: '#dc004e',
    dark: '#9a0036',
    contrastText: '#fff',
  },
  warning: {
    light: '#ffab40',
    main: '#ff9100',
    dark: '#ff6d00',
    contrastText: '#fff',
  },
  info: {
    light: '#536dfe',
    main: '#3d5afe',
    dark: '#304ffe',
    contrastText: '#fff',
  },
  secondary: {
    light: '#536dfe',
    main: '#3d5afe',
    dark: '#304ffe',
    contrastText: '#fff',
  },
  primary: {
    light: '#f3e5f5',
    main: '#e1bee7',
    dark: '#ce93d8',
    contrastText: '#424242',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: '#fff',
  },
  default: {
    light: '#F5F5F5',
    main: '#EEEEEE',
    dark: '#E0E0E0',
    contrastText: '#000',
  },
};

export {
  palette, paletteDark, palette2, paletteDark2,
};
