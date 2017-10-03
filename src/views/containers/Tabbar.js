import React from 'react';
import { StyleSheet, View } from 'react-native';
import store from '../../stores/todos';
import TabItem from './TabItem';

const styles = StyleSheet.create({
  container: {
    height: 49,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#588d64',
  },
});

const Tabbar = () => (
  <View style={styles.container}>
    <View style={styles.wrap}>
      <TabItem
        disabled
        title="Share"
        iconName="ios-person-add-outline"
        onPress={() => store.tabItemPressed('share')}
      />
      <TabItem
        title="Sort"
        iconName="ios-swap-outline"
        onPress={() => store.tabItemPressed('sort')}
      />
      <TabItem
        disabled
        title="More"
        iconName="ios-more-outline"
        onPress={() => store.tabItemPressed('more')}
      />
    </View>
  </View>
);

export default Tabbar;
