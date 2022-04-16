import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import SelectDropdown from "react-native-select-dropdown";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase from "../config/firebase";

const firestore = Firebase.firestore();

function Shop() {

  useEffect(() => {
    const subscriber = firestore
      .collection("Garage").doc(user.uid).collection('Garage').where('garageId', '==', user.uid)
      .onSnapshot((querySnapshot) => {
        const garage = [];

        querySnapshot.forEach((documentSnapshot) => {
          garage.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setGarage(garage);
        setLoading(false);
      });
  },[]);

  const { user } = useContext(AuthenticatedUserContext);
  const [garage, setGarage] = useState([]); // Initial empty array of users
  const [selectedCar, setSelectedCar] = useState("");
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const buy = () => {
    if(!selectedCar) {
      seterror("Please a select a car")
      return setshowAlert(true)
    }

  
    const requestId = user.uid;
    const data = {
      requestIcon: "../assets/icons/shop.png",
      requestType: "Purchase",
      Car: selectedCar,
      requestId,
      status: "Pending"
    };

    const requestRef = firestore
      .collection("Requests")
      .doc(requestId)
      .collection("Purchase");

    requestRef.doc().set(data);

    navigation.navigate("Basket");
  };

  return (
    
    <View style={tw`ml-5 mt-8`}>
      <View style={tw`mb-8`}>
          <Text style={tw`font-bold text-lg text-black`}>
            Buy parts for your car
          </Text>
          <Text>Select a car</Text>
        </View>
        <View>
        <SelectDropdown
          buttonStyle={tw`mb-5 self-center bg-gray-200 rounded-lg w-5/6 shadow-lg`}
          data={garage}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.Make, index);
            setSelectedCar(selectedItem.Make + " " + selectedItem.Model);
          }}
          defaultButtonText="Select your Car"
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.Make + " " + selectedItem.Model;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.Make + " " + item.Model;
          }}
        />
        </View>
        <View>
          <Text>
            Coming Soon
          </Text>
        </View>
      </View>
   
  )
}

export default Shop

const styles = StyleSheet.create({});