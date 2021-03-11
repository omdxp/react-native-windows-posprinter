import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  TextInput,
} from 'react-native';

export default function App() {
  // states
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfCopies, setNumberOfCopies] = useState('');
  const printPressHandler = () => {
    if (
      storeName === '' ||
      address === '' ||
      phoneNumber === '' ||
      numberOfCopies === ''
    ) {
      alert('Please enter all fields');
      return;
    }
    NativeModules.PosPrinter.printReceipt(
      storeName,
      address,
      phoneNumber,
      numberOfCopies,
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
          width: 300,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <TextInput
          placeholder={'Store name'}
          style={{width: 200, textAlign: 'center'}}
          value={storeName}
          onChangeText={(text) => setStoreName(text)}
        />
        <Text>Address</Text>
        <TextInput
          placeholder={'Your address'}
          style={{width: 200, textAlign: 'center'}}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Text>Phone number</Text>
        <TextInput
          placeholder={'Your phone number'}
          style={{width: 200, textAlign: 'center'}}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text>---------------------------------------</Text>
        <Text style={{alignSelf: 'flex-start'}}>* Product example</Text>
        <Text style={{alignSelf: 'flex-start'}}>5000.00 DA * (1)</Text>
        <Text style={{alignSelf: 'flex-start'}}>Aspirine Upsa</Text>
        <Text>---------------------------------------</Text>
        <Text style={{alignSelf: 'flex-start'}}>
          Collected amount : 5600 DA
        </Text>
        <Text style={{alignSelf: 'flex-start'}}>Discount : 0 DA</Text>
        <Text style={{alignSelf: 'flex-start'}}>0.00 DA</Text>
        <Text style={{fontSize: 20}}>Total : 5600 DA</Text>
        <Text>---------------------------------------</Text>
        <Text style={{alignSelf: 'flex-start'}}>Ticket number : #1125</Text>
        <Text style={{alignSelf: 'flex-start'}}>Date PM/AM</Text>
        <Text>Combien de copie?</Text>
        <TextInput
          placeholder={'Type a number'}
          style={{width: 200, textAlign: 'center'}}
          value={numberOfCopies}
          onChangeText={(text) => setNumberOfCopies(text)}
        />
        <Text style={{fontSize: 20}}>Merci pour votre visite</Text>
      </View>
      <TouchableOpacity
        onPress={printPressHandler}
        style={{padding: 10, borderRadius: 30, backgroundColor: 'green'}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Print receipt</Text>
      </TouchableOpacity>
    </View>
  );
}
