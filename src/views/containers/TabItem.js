import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import TextWrapper from '../components/Text';

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    color: 'white',
    fontSize: 24,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
  },
});

@observer
class TabItem extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        activeOpacity={0.5}
        style={styles.btn}
        onPress={this.props.onPress}
      >
        <Icon name={this.props.iconName} style={styles.btnIcon} />
        <TextWrapper style={styles.btnText}>{this.props.title}</TextWrapper>
      </TouchableOpacity>
    );
  }
}

export default TabItem;
