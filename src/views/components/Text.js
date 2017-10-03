import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Font } from 'expo';

const TextWrapper = props => (
  <Text {...props} style={[Font.style('lato-regular'), props.style]}>
    {props.children}
  </Text>
);

TextWrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

TextWrapper.defaultProps = {
  children: null,
  style: {},
};

export default TextWrapper;
