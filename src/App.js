import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { List } from './components/List';
import { PersistGate } from 'redux-persist/integration/react';
import Wrapper from './components/Wrapper';

export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PersistGate loading={null} persistor={persistor}>
          <Wrapper />
        </PersistGate>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
