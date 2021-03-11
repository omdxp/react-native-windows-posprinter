import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

export default function App() {
  const printPressHandler = () => {
    NativeModules.PosPrinter.printReceipt(function (result) {
      alert('Printing!');
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={printPressHandler}
        style={{padding: 10, borderRadius: 30, backgroundColor: 'green'}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Print receipt</Text>
      </TouchableOpacity>
    </View>
  );
}
