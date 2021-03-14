// import react native
import React, {useState, useReducer} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  TextInput,
} from 'react-native';

// import redux
import {initState, ReceiptReducer} from '../../../redux/reducers';
import {updateReceipt, updateQuantityReceipt} from '../../../redux/actions';

// import Home functions
import {} from '../functions';

// export Home UI
export default function HomeUI() {
  // use reducer
  const [state, dispatch] = useReducer(ReceiptReducer, initState);
  console.log(state);
  // states
  const [storeName, setStoreName] = useState(state.storeName);
  const [address, setAddress] = useState(state.address);
  const [phoneNumber, setPhoneNumber] = useState(state.phoneNumber);
  const [numberOfCopies, setNumberOfCopies] = useState(state.numberOfCopies);
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
      '1125',
      function (result) {
        if (result) {
          dispatch(updateQuantityReceipt());
        }
      },
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
          onChangeText={(text) => {
            setStoreName(text);
            const payload = {
              storeName,
              address,
              phoneNumber,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
        />
        <Text>Address</Text>
        <TextInput
          placeholder={'Your address'}
          style={{width: 200, textAlign: 'center'}}
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            const payload = {
              storeName,
              address,
              phoneNumber,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
        />
        <Text>Phone number</Text>
        <TextInput
          placeholder={'Your phone number'}
          style={{width: 200, textAlign: 'center'}}
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            const payload = {
              storeName,
              address,
              phoneNumber,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
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
          onChangeText={(text) => {
            setNumberOfCopies(text);
            const payload = {
              storeName,
              address,
              phoneNumber,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
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
