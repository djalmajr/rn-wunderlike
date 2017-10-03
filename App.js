import 'moment/locale/pt-br';
import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { StatusBar, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { App } from './src/constants';
import TodoList from './src/views/containers/TodoList';

const styles = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'black',
    position: 'absolute',
    height: App.STATUS_SIZE,
    top: 0,
    left: 0,
    right: 0,
  },
};

class InfinityClub extends Component {
  state = {
    isLoadingComplete: false,
  };

  handleLoadResources = async () => Promise.all([
    Asset.loadAsync([
      require('./src/assets/images/bg.jpg'),
    ]),
    Font.loadAsync([
      FontAwesome.font,
      Ionicons.font,
      { 'lato-regular': require('./src/assets/fonts/Lato-Regular.ttf') },
    ]),
  ]);

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error); // eslint-disable-line
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.handleLoadResources}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <TodoList />
        {App.OS === 'ios' && <View style={styles.statusBar} />}
      </View>
    );
  }
}

export default InfinityClub;
