import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import store from '../../stores/todos';

const size = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(88,141,100,0.8)',
    borderRadius: 2,
    marginBottom: 5,
    height: size,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  placeholder: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    height: size,
    lineHeight: size,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
  },
});

class TodoForm extends Component {
  state = {
    todo: '',
    starred: false,
  };

  onSubmit = () => {
    const { starred, todo } = this.state;

    if (!todo) {
      return;
    }

    store.addTodo(todo, starred);
    this.setState({ todo: '', starred: false });
  };

  handleStarred = () => {
    this.setState({ starred: !this.state.starred });
  };

  render() {
    const { starred } = this.state;

    return (
      <View style={styles.container}>
        <View style={[styles.placeholder, { paddingTop: 2 }]}>
          <Ionicons name="ios-add-outline" size={32} color="white" />
        </View>

        <View style={styles.wrap}>
          <TextInput
            placeholder="Add a to-do..."
            placeholderTextColor="white"
            returnKeyType="done"
            style={styles.title}
            value={this.state.todo}
            onChangeText={todo => this.setState({ todo })}
            onSubmitEditing={this.onSubmit}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.placeholder}
          onPress={this.handleStarred}
        >
          <Ionicons
            size={20}
            color="white"
            name={`ios-star${starred ? '' : '-outline'}`}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TodoForm;
