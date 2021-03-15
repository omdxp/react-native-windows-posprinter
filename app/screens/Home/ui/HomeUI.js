// import react native
import React, {useState, useReducer, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  TextInput,
  ScrollView,
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
  // states
  const [storeName, setStoreName] = useState(state.storeName);
  const [address, setAddress] = useState(state.address);
  const [phoneNumber, setPhoneNumber] = useState(state.phoneNumber);
  const [numberOfCopies, setNumberOfCopies] = useState(state.numberOfCopies);
  const [products, setProducts] = useState([
    {
      productName: '',
      price: '',
      quantity: '',
    },
  ]);
  const [collectedAmount, setCollectedAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [charge, setCharge] = useState('');
  const [caissier, setCaissier] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [thanks, setThanks] = useState('');
  // component did mount
  useEffect(() => {
    setStoreName(state.storeName);
    setAddress(state.address);
    setPhoneNumber(state.phoneNumber);
    setNumberOfCopies(state.numberOfCopies);
  }, []);
  // print receipt press handler
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
      [
        storeName, // store name
        address, // address
        phoneNumber, // phone number
        numberOfCopies, // number of copies
        '1125', // ticket no
        '23600 DA', // collected amount
        '0 DA', // discount
        '0.00 DA', // charge
        'Jaden', // caissier
        '23600 DA', // total
      ],
      [
        'Kertou Shizao : 200.00 DA x (1)',
        'What : 200.00 DA x (2)',
        'hei : 200.00 DA x (3)',
      ], // list of products
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
              storeName: text,
              address,
              phoneNumber,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
        />
        <TextInput
          placeholder={'Your address'}
          style={{width: 200, textAlign: 'center'}}
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            const payload = {
              storeName,
              address: text,
              phoneNumber,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
        />
        <TextInput
          placeholder={'Your phone number'}
          style={{width: 200, textAlign: 'center'}}
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            const payload = {
              storeName,
              address,
              phoneNumber: text,
              numberOfCopies,
            };
            dispatch(updateReceipt(payload));
          }}
        />
        <Text>-------------------------------------------------</Text>
        {products.map((product, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder={'Product name'}
              onChangeText={(text) => {
                console.log(index);
                products[index].productName = text;
                console.log(products);
                setProducts(products);
              }}
              defaultValue={product.productName}
            />
            <Text> : </Text>
            <TextInput
              placeholder={'Price'}
              onChangeText={(text) => {
                product.price = text;
              }}
              defaultValue={product.price}
            />
            <Text> * (</Text>
            <TextInput
              placeholder={'Qtt'}
              onChangeText={(text) => {
                product.quantity = text;
              }}
              defaultValue={product.quantity}
            />
            <Text>)</Text>
          </View>
        ))}
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
          }}
          onPress={() => {
            setProducts([
              ...products,
              {
                productName: '',
                price: '',
                quantity: '',
              },
            ]);
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'white',
            }}>
            +
          </Text>
        </TouchableOpacity>
        <Text>-------------------------------------------------</Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Collected amount : </Text>
          <TextInput placeholder={'Price'} />
          <Text> DA</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Discount : </Text>
          <TextInput placeholder={'Price'} />
          <Text> DA</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Charge : </Text>
          <TextInput placeholder={'Price'} />
          <Text> DA</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Caissier : </Text>
          <TextInput placeholder={'Name'} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Total : </Text>
          <TextInput style={{fontSize: 20}} placeholder={'Price'} />
          <Text style={{fontSize: 20}}> DA</Text>
        </View>
        <Text>-------------------------------------------------</Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Ticket number : #</Text>
          <TextInput placeholder={'Number'} />
        </View>
        <Text style={{alignSelf: 'flex-start'}}>Date PM/AM</Text>
        <TextInput
          style={{fontSize: 20, textAlign: 'center'}}
          placeholder={'Thanks'}
        />
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
              numberOfCopies: text,
            };
            dispatch(updateReceipt(payload));
          }}
        />
      </View>
      <TouchableOpacity
        onPress={printPressHandler}
        style={{padding: 10, borderRadius: 30, backgroundColor: 'green'}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Print receipt</Text>
      </TouchableOpacity>
    </View>
  );
}
