import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import store from '../../stores/todos';
import TextWrapper from '../components/Text';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Tabbar from './Tabbar';
import TabDropdown from './TabDropdown';
import TodoDetail from './TodoDetail';

const { width, height } = Dimensions.get('window');

const navbarHeight = 80;

const styles = StyleSheet.create({
  bg: {
    width,
    height: height - navbarHeight - 49,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  navbar: {
    height: navbarHeight,
    backgroundColor: '#588d64',
    paddingTop: 20,
    justifyContent: 'center',
  },
  navbarTitle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },

  btn: {
    alignSelf: 'center',
    marginVertical: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(88,141,100,0.8)',
    borderRadius: 2,
  },
  btnText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});

@observer
class TodoList extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const refreshControl = (
      <RefreshControl
        tintColor="#fff"
        refreshing={store.refreshing}
        onRefresh={() => store.refresh()}
      />
    );

    const animatedStyle = {
      flex: 1,
      opacity: store.detailAnim.interpolate({
        inputRange: [0, width],
        outputRange: [1, 0.75],
      }),
      transform: [{
        scale: store.detailAnim.interpolate({
          inputRange: [0, width],
          outputRange: [1, 0.95],
        }),
      }],
    };

    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TextWrapper style={styles.navbarTitle}>
            Todos
          </TextWrapper>
        </View>
        <Image style={styles.bg} source={require('../../assets/bg.jpg')}>
          <Animated.View style={animatedStyle}>
            <ScrollView
              keyboardShouldPersistTaps
              keyboardDismissMode="on-drag"
              refreshControl={refreshControl}
              style={styles.content}
              scrollEventThrottle={200}
              scrollEnabled={store.scrollable}
              onScroll={() => store.resetOpenId()}
            >
              <TodoForm />
              <View style={{ flexDirection: 'column-reverse' }}>
                {store.openTodos.map(todo => (
                  <Todo key={todo.id} todo={todo} />
                ))}
              </View>
              {store.completedTodos.length > 0 && (
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'rgba(0,0,0,0.4)'}
                  style={styles.btn}
                  onPress={() => store.toggleCompletedTodos()}
                >
                  <Text style={styles.btnText}>
                    {store.completedVisible ? 'HIDE' : 'SHOW'} COMPLETED TO-DOS
                  </Text>
                </TouchableHighlight>
              )}
              {store.completedVisible && (
                <View style={{ flexDirection: 'column-reverse' }}>
                  {store.completedTodos.map(todo => (
                    <Todo key={todo.id} todo={todo} />
                  ))}
                </View>
              )}
            </ScrollView>
          </Animated.View>
        </Image>
        <TabDropdown />
        <Tabbar />
        <TodoDetail />
      </View>
    );
  }
}

export default TodoList;
