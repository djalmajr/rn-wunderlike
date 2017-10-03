import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { observer } from 'mobx-react/native';
import { Ionicons } from '@expo/vector-icons';
import TextWrapper from '../components/Text';
import store from '../../stores/todos';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 0,
    right: 0,
    bottom: 49,
    left: 0,
    backgroundColor: 'transparent',
  },
  dropdowns: {
    backgroundColor: '#588d64',
  },
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 46,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.33)',
    paddingHorizontal: 15,
  },
  btnIcon: {
    color: 'white',
    fontSize: 24,
    width: 45,
    textAlign: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
  },
});

@observer
class TabDropdown extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <View style={styles.overlay} pointerEvents={'box-none'}>
        {store.dropdownActive && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.overlay}
            onPress={() => store.hideDropdown()}
          />
        )}
        <Animated.View style={[styles.dropdowns, {
          transform: [{
            translateY: store.dropdownAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [34 * store.dropdownOptions.length, 0],
            }),
          }],
        }]}
        >
          {store.dropdownOptions.map(item => (
            <TouchableOpacity
              key={item.title}
              disabled={this.props.disabled}
              style={styles.btn}
              activeOpacity={0.5}
              onPress={() => store.dropdownPressed(item.value)}
            >
              {false && <Ionicons name={'ios-person-add-outline'} style={styles.btnIcon} />}
              <TextWrapper style={styles.btnText}>{item.title}</TextWrapper>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    );
  }
}

export default TabDropdown;
