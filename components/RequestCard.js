import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Diagnostic from "../screens/Diagnostic";
import Inspection from "../screens/Inspection";
import Maintenance from "../screens/Maintenance";
import { useDispatch, useSelector } from "react-redux";
import { setRequestId } from '../slices/carSlice'

const RequestCard = ({ car, requestid, schedule, location, requestType, status }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const toggle = () => {
    setExpanded(!expanded);
  };

  let req = requestid

  const openDiagnosis = () => {
    dispatch(setRequestId(req))
    navigation.navigate("Diagnostic")
  }

  const openQuotations = () => {
    dispatch(setRequestId(req))
    navigation.navigate('Quotation')
  }

  return (
    <TouchableOpacity
      onPress={() => toggle()}
      style={tw`bg-white mx-4 rounded-xl mb-4 p-5 justify-center shadow-2xl`}
    >
      <View style={tw`flex-row justify-between`}>
        {requestType == "Maintenance" ? (
          <Image
            style={tw`mt-8`}
            source={require("../assets/icons/maintain.png")}
          />
        ) : requestType == "Inspection" ? (
          <Image
            style={tw`mt-8`}
            source={require("../assets/icons/Inspect.png")}
          />
        ) : requestType == "Repairs" ? (
          <Image
            style={tw`mt-8`}
            source={require("../assets/icons/repair.png")}
          />
        ) : (
          <Image
            style={tw`mt-8`}
            source={require("../assets/icons/scan.png")}
          />
        )}

        <View>
          <Text style={styles.property}>Request ID: <Text style={tw`font-semibold text-black`}>{requestid}</Text></Text>
          <Text style={styles.property}>Request Type: <Text style={tw`font-semibold text-black`}>{requestType}</Text></Text>
          <Text style={styles.property}>Car: <Text style={tw`font-semibold text-black`}>{car}</Text></Text>
          <Text style={styles.property}>Location: <Text style={tw`font-semibold text-black`}>{location}</Text></Text>
          <Text style={styles.property}>Schedule: <Text style={tw`text-sm font-semibold text-black`}>{new Date(schedule).toUTCString()}</Text></Text>
          <Text style={styles.property}>Status: <Text style={tw`font-semibold text-sm ${status === 'Confirmed' ? 'text-green-500' : 'text-yellow-300'}`}>{status}</Text></Text>
          
        </View>
        <Icon name="sort-down" type="font-awesome" />
      </View>
      
      <CollapsibleView
        noArrow={true}
        expanded={expanded}
        style={{ borderWidth: 0 }}
      >
        <View>
          <TouchableOpacity
            style={tw`border-0 rounded-3xl self-center w-10/12 p-2`}
            onPress={openDiagnosis}
          >
            <Text style={tw`text-center font-bold text-blue-500`}>Diagnosis(Ongoing)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`border-0 rounded-3xl self-center w-10/12 p-2`}
            onPress={openQuotations}
          >
            <Text style={tw`text-center font-bold text-blue-600`}>Quotations</Text>
          </TouchableOpacity>
        </View>
      </CollapsibleView>
    </TouchableOpacity>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  property: {
    fontSize: 16,
    color: "grey"
  }
});
