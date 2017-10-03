import color from 'color';
import { Dimensions, Platform, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');
const PRIMARY = '#FA6000';
const BLUE = '#013F6E'; // "#0a3c5a"
const GREEN = '#1A5716';
const RED = '#BA1212';

export const URL = 'http://infinityclub.herokuapp.com/api/v1';

export const Colors = {
  PRIMARY,
  BLUE,
  BLUE_DARK: color(BLUE).darken(0.2).hex(),
  BLUE_DARKEN: color(BLUE).darken(0.3).hex(),
  BLUE_LIGHT: color(BLUE).lighten(0.2).hex(),
  BLUE_LIGHTEN: color(BLUE).lighten(0.5).hex(),
  GRAY: '#999',
  GRAY_DARK: '#777',
  GRAY_DARKEN: '#555',
  GRAY_LIGHT: '#ddd',
  GRAY_LIGHTEN: '#eee',
  GREEN,
  GREEN_DARK: color(GREEN).darken(0.2).hex(),
  GREEN_DARKEN: color(GREEN).darken(0.3).hex(),
  GREEN_LIGHT: color(GREEN).lighten(0.2).hex(),
  GREEN_LIGHTEN: color(GREEN).lighten(0.5).hex(),
  RED,
  RED_DARK: color(RED).darken(0.2).hex(),
  RED_DARKEN: color(RED).darken(0.3).hex(),
  RED_LIGHT: color(RED).lighten(0.2).hex(),
  RED_LIGHTEN: color(RED).lighten(0.5).hex(),
  TEXT: 'rgba(0,0,0,0.6)',
  WHITE_SMOKE: '#f5f5f5',
};

export const App = {
  GAP: 15,
  IMG_GAP: 12,
  IMG_SIZE: 80,
  HEADER_SIZE: 48,
  HEIGHT: height,
  WIDTH: width,
  OS: Platform.OS === 'ios' ? 'ios' : 'md',
  STATUS_SIZE: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  ERROR_MSG: 'Ocorreu um erro ao tentar realizar esta operação. Por favor, tente novamente.',
};
