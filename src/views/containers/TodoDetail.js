import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  // TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import TextWrapper from '../components/Text';
import store from '../../stores/todo';
import StarButton from './StarButton';

const { width } = Dimensions.get('window');

const navbarHeight = 80 - 20;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fafafa',
    transform: [{ translateX: width }],
  },
  header: {
    minHeight: navbarHeight,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  backBtn: {
    width: 50,
    height: navbarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnIcon: {
    color: '#555',
    fontSize: 34,
  },
  title: {
    paddingVertical: 16,
    fontSize: 20,
    color: 'black',
  },
});

@observer
export default class extends Component {
  state = {
    height: 0,
  };

  componentWillMount() {
    this.pan = store.detailAnim;

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => gestureState.dx > 5,
      onPanResponderGrant: () => {
        this.pan.setOffset(this.pan._value);
        this.pan.setValue(0);
        // this.input.blur();
      },
      onPanResponderMove: (e, { dx }) => {
        if (dx < 0) {
          return;
        }

        this.pan.setValue(-dx);
      },
      onPanResponderRelease: (e, { dx }) => {
        this.pan.flattenOffset();

        if (dx > 100) {
          store.closeDetail();
          return;
        }

        store.openDetail();
      },
    });
  }

  handleContentSizeChange = (evt) => {
    this.setState({ height: evt.nativeEvent.contentSize.height });
  };

  handleSubmitEditing = f => f;

  handleBack = () => {
    // this.input.blur();
    store.closeDetail();
  };

  render() {
    const todo = store.selectedTodo;
    const animatedStyle = [styles.container, {
      transform: [{
        translateX: this.pan.interpolate({
          inputRange: [0, width],
          outputRange: [width, 0],
        }),
      }],
    }];

    if (!todo) {
      return <View style={styles.container} />;
    }

    return (
      <Animated.View {...this.panResponder.panHandlers} style={animatedStyle}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.backBtn}
            onPress={this.handleBack}
          >
            <Icon name="ios-arrow-round-back-outline" style={styles.backBtnIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            {/*
            <TextInput
              ref={el => (this.input = el)}
              multiline
              blurOnSubmit
              value={todo.title}
              returnKeyType="done"
              style={[styles.title, { height: Math.max(54, this.state.height) }]}
              onChangeText={title => store.selectedTodo.title = title}
              onContentSizeChange={this.handleContentSizeChange}
              onSubmitEditing={this.handleSubmitEditing}
            />
            */}
            <TextWrapper style={styles.title}>{todo.title}</TextWrapper>
          </View>
          <StarButton todo={todo} />
        </View>
      </Animated.View>
    );
  }
}
