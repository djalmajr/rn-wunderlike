import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import SwipeableRow from 'react-native/Libraries/Experimental/SwipeableRow/SwipeableRow';
import store from '../../stores/todos';
import TextWrapper from '../components/Text';
import StarButton from './StarButton';

const size = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    marginBottom: 1,
    height: size,
    overflow: 'hidden',
  },
  wrap: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  btn: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 3,
  },
  title: {
    color: '#111',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  checked: {
    textDecorationLine: 'line-through',
    color: '#555',
  },
  swipeBtns: {
    width: size * 2,
    height: size - 6,
    top: 3,
    borderRadius: 3,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  swipeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#ee3229',
  },
  editBtn: {
    backgroundColor: '#0f85d9',
  },
  swipeIcon: {
    fontSize: 24,
    color: 'white',
  },
});

@observer
export default class extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
  };

  state = {
    pressedIn: false,
  };

  handleCheckPressIn = () => {
    this.setState({ pressedIn: true });
  };

  handleCheckPressOut = () => {
    this.setState({ pressedIn: false });
  };

  handleComplete = () => {
    store.toggleCompleted(this.props.todo);
  };

  handleStarred = () => {
    this.props.todo.toggleStarred();
  };

  handleEdit = () => {
    store.openTodo(this.props.todo);
  };

  handleDelete = () => {
    store.deleteTodo(this.props.todo);
  };

  handleTodoPressed = () => {
    if (this.props.todo.id === store.openId) {
      store.setOpenId(null);
      return;
    }

    store.openTodo(this.props.todo);
  };

  showDeleteAlert = () => {
    const message = `"${this.props.todo.title}" will be deleted forever.`;
    const options = [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: this.handleDelete.bind(this) },
    ];

    Alert.alert(message, null, options);
  };

  renderSlideoutView() {
    return (
      <View style={styles.swipeBtns}>
        <TouchableOpacity
          style={[styles.swipeBtn, styles.editBtn]}
          activeOpacity={0.9}
          onPress={this.handleEdit}
        >
          <Icon name={'ios-create-outline'} style={styles.swipeIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.swipeBtn, styles.deleteBtn]}
          activeOpacity={0.9}
          onPress={this.showDeleteAlert}
        >
          <Icon name={'ios-trash-outline'} style={styles.swipeIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { todo } = this.props;
    const checkmarkVisible = todo.completed || this.state.pressedIn;
    const selectedTodo = store.selectedTodo && store.selectedTodo.id === todo.id;

    return (
      <SwipeableRow
        shouldBounceOnMount={false}
        maxSwipeDistance={(size * 2) + 6}
        swipeThreshold={size / 2}
        slideoutView={this.renderSlideoutView()}
        onSwipeEnd={() => store.setScrollable(true)}
        onSwipeStart={() => {
          store.resetOpenId();
          store.setScrollable(false);
        }}
        onOpen={() => store.setOpenId(todo.id)}
        isOpen={todo.id === store.openId}
      >
        <TouchableHighlight
          style={[styles.container, {
            backgroundColor: selectedTodo ? '#d6eeff' : 'white',
          }]}
          underlayColor={'#d6eeff'}
          activeOpacity={1}
          onPress={this.handleTodoPressed}
        >
          <View style={[styles.wrap, { opacity: todo.completed ? 0.75 : 1 }]}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={1}
              onPress={this.handleComplete}
              onPressIn={this.handleCheckPressIn}
              onPressOut={this.handleCheckPressOut}
            >
              <View style={styles.checkbox}>
                {checkmarkVisible && <Icon name="ios-checkmark-outline" size={28} color="#555" />}
              </View>
            </TouchableOpacity>

            <View style={styles.body}>
              <TextWrapper
                numberOfLines={1}
                style={[styles.title, todo.completed && styles.checked]}
              >
                {todo.title}
              </TextWrapper>
            </View>

            <StarButton todo={todo} />
          </View>
        </TouchableHighlight>
      </SwipeableRow>
    );
  }
}
