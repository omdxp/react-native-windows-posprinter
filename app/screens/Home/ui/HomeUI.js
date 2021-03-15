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
    let listOfProducts = [];
    products.map((product, index) => {
      listOfProducts.push(
        `${product.productName} : ${product.price} DA x (${product.quantity})`,
      );
    });
    NativeModules.PosPrinter.printReceipt(
      [
        storeName, // store name
        address, // address
        phoneNumber, // phone number
        numberOfCopies, // number of copies
        ticketNumber, // ticket no
        collectedAmount, // collected amount
        discount, // discount
        charge, // charge
        caissier, // caissier
        totalPrice, // total
        thanks, // thanks
      ], // product details
      listOfProducts, // list of products
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
          style={{width: 200, textAlign: 'center', height: 40}}
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
          style={{width: 200, textAlign: 'center', height: 40}}
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
          style={{width: 200, textAlign: 'center', height: 40}}
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
              style={{height: 40}}
              placeholder={'Product name'}
              onChangeText={(text) => {
                products[index].productName = text;
                setProducts(products);
              }}
              defaultValue={product.productName}
            />
            <Text> : </Text>
            <TextInput
              style={{height: 40}}
              placeholder={'Price'}
              onChangeText={(text) => {
                products[index].price = text;
                setProducts(products);
              }}
              defaultValue={product.price}
            />
            <Text> x (</Text>
            <TextInput
              style={{height: 40}}
              placeholder={'Qtt'}
              onChangeText={(text) => {
                products[index].quantity = text;
                setProducts(products);
              }}
              defaultValue={product.quantity}
            />
            <Text>)</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                margin: 1,
              }}
              onPress={() => {
                setProducts(products.filter((item) => item !== product));
              }}>
              <Text style={{color: 'white'}}>x</Text>
            </TouchableOpacity>
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
          <TextInput
            style={{height: 40}}
            placeholder={'Price'}
            onChangeText={(text) => {
              setCollectedAmount(text);
            }}
          />
          <Text> DA</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Discount : </Text>
          <TextInput
            style={{height: 40}}
            placeholder={'Price'}
            onChangeText={(text) => {
              setDiscount(text);
            }}
          />
          <Text> DA</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Charge : </Text>
          <TextInput
            style={{height: 40}}
            placeholder={'Price'}
            onChangeText={(text) => {
              setCharge(text);
            }}
          />
          <Text> DA</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Caissier : </Text>
          <TextInput
            style={{height: 40}}
            placeholder={'Name'}
            onChangeText={(text) => {
              setCaissier(text);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Total : </Text>
          <TextInput
            style={{fontSize: 20, height: 40}}
            placeholder={'Price'}
            onChangeText={(text) => {
              setTotalPrice(text);
            }}
          />
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
          <TextInput
            style={{height: 40}}
            placeholder={'Number'}
            onChangeText={(text) => {
              setTicketNumber(text);
            }}
          />
        </View>
        <Text style={{alignSelf: 'flex-start'}}>Date PM/AM</Text>
        <TextInput
          style={{fontSize: 20, textAlign: 'center', height: 40}}
          placeholder={'Thanks'}
          onChangeText={(text) => {
            setThanks(text);
          }}
        />
        <Text>Combien de copie?</Text>
        <TextInput
          placeholder={'Type a number'}
          style={{width: 200, textAlign: 'center', height: 40}}
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
