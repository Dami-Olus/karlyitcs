import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import AwesomeAlert from "react-native-awesome-alerts";
import { removeFromBasket } from "../slices/carSlice";
import { useDispatch } from "react-redux";

const ChooseImageForPlan = ({ name }) => {
  if (name === "Membership")
    return (
      <Image
        source={require("../assets/icons/membership.png")}
        style={{ resizeMode: "contain", height: 40 }}
      />
    );

  if (name === "Insurnce")
    return (
      <Image
        source={require("../assets/icons/insurance.png")}
        style={{ resizeMode: "contain", height: 40 }}
      />
    );

  if (name === "Maintenance")
    return (
      <Image
        source={require("../assets/icons/maintain.png")}
        style={{ resizeMode: "contain", height: 40 }}
      />
    );

  return (
    <Image
      source={require("../assets/icons/healthplan.png")}
      style={{ resizeMode: "contain", height: 40 }}
    />
  );

};

const BasketCard = ({ description, qty, total, unitPrice, details, index }) => {
  const [showAlert, setshowAlert] = useState(false);
  const dispatch = useDispatch();

  const confirmRemove = () => {
    dispatch(removeFromBasket(index));
    return setshowAlert(false);
  };

  if(details !== undefined) {
    if(!details.plan && details?.Name) return (
      <TouchableOpacity
        style={tw`bg-white mx-4 rounded-xl mb-5 p-4 shadow-xl`}
        key={index}
        onLongPress={() => setshowAlert(true)}
      >
      
        <View style={tw`flex-row justify-start items-center`}>
          <ChooseImageForPlan name="Membership" />
    
          <View style={tw`ml-5`}>
            <Text style={tw`mb-2`}>
              <Text style={tw`font-semibold`}>{details.type}</Text> package
              for <Text style={tw`font-semibold`}>{details.Name}</Text>{" "}
              plan
            </Text>
    
            <Text style={tw`font-semibold mt-2`}>
              Total: {details.price}
            </Text>
          </View>
        </View>
    
        {/* renders the alert that is shown before item is removed from basket */}
        <AwesomeAlert
          show={showAlert}
          title={"remove from basket?"}
          message={`Are you sure you want to remove ${details.Name} plan from basket`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => setshowAlert(false)}
          onConfirmPressed={() => confirmRemove()}
        />
    </TouchableOpacity>
    );
    
      if (details.plan)
        return (
          <TouchableOpacity
            style={tw`bg-white mx-4 rounded-xl mb-5 p-4 shadow-xl`}
            key={index}
            onLongPress={() => setshowAlert(true)}
          >
            <View style={tw`flex-row justify-start items-center`}>
              <ChooseImageForPlan name={details.plan.Name} />
    
              <View style={tw`ml-5`}>
                <Text style={tw`mb-2`}>
                  <Text style={tw`font-semibold`}>{details.plan.type}</Text> package
                  for <Text style={tw`font-semibold`}>{details.plan.Name}</Text>{" "}
                  plan
                </Text>
                <Text>Make - {details.Make}</Text>
                <Text>Model - {details.Model}</Text>
                <Text style={tw`font-semibold mt-2`}>
                  Total: {details.plan.price}
                </Text>
              </View>
            </View>
    
            {/* renders the alert that is shown before item is removed from basket */}
            <AwesomeAlert
              show={showAlert}
              title={"remove from basket?"}
              message={`Are you sure you want to remove ${details.plan.Name} for your ${details.Make}`}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Yes, delete it"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => setshowAlert(false)}
              onConfirmPressed={() => confirmRemove()}
            />
          </TouchableOpacity>
      );    
  }
  
  return (
    <TouchableOpacity
      style={tw`bg-white mx-4 rounded-xl mb-5 p-4 shadow-xl`}
      key={index}
      onLongPress={() => setshowAlert(true)}
    >
      <View style={tw`flex-row h-12 items-center`}>
        <Icon style={tw`flex-1 mr-10`} name="gas-pump" type="font-awesome-5" />

        <View>
          <Text style={tw`font-semibold`}>{description}</Text>
          <Text>Quantity: {qty}</Text>
          <Text>Unit Price: {unitPrice}</Text>
          <Text style={tw`font-semibold`}>Total: {total}</Text>
        </View>
      </View>
      <AwesomeAlert
          show={showAlert}
          title={"remove from basket?"}
          message={`Are you sure you want to remove ${description}`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => setshowAlert(false)}
          onConfirmPressed={() => confirmRemove()}
        />
    </TouchableOpacity>
  );
};

export default BasketCard;

const styles = StyleSheet.create({});
