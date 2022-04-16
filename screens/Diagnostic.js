import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DiagnosticCard from "../components/DiagnosticCard";
import { useDispatch, useSelector } from "react-redux";
import { selectRequest } from "../slices/carSlice";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase from "../config/firebase";

const firestore = Firebase.firestore();

const Diagnostic = () => {
  const request = useSelector(selectRequest);
  const { user } = useContext(AuthenticatedUserContext);
  const [report, setReport] = useState();

  const userId = user.uid;

  useEffect(() => {
    const subscriber = firestore
      .collection("Report")
      .doc(userId)
      .collection("Report")
      .doc(request)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setReport(doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  
  console.log(report);

  const navigation = useNavigation();
  return (
    <View style={tw`mb-8`}>
      <View style={tw`flex-row justify-around mt-12`}>
        <View style={tw`mb-8`}>
          <Text>Request ID:<Text style={tw`font-semibold`}>{request}</Text></Text>
          <Text style={tw`font-bold text-lg text-black`}>Diagnosis</Text>
          <Text>View your car diagnosis below</Text>
        </View>
      
        <TouchableOpacity 
          style={tw`items-center flex-row`} 
          onPress={() => navigation.navigate("Quotation")}
        >
          <Text>Quotation</Text>
          <Icon
            style={tw`ml-2`}
            name="chevron-right"
            type="font-awesome"
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={tw`mb-5`}>
        <View style={tw`mb-24`}>
          <View style={tw`mb-5 bg-white p-3 shadow-lg`}>
            <Text style={tw`text-green-800 font-semibold text-lg`}>Interior</Text>
            <Text>Fuel door release: <Text style={tw`font-semibold`}>{report?.fuelDoorRelease|| 'N/A'}</Text></Text>
            <Text>Hood release: <Text style={tw`font-semibold`}>{report?.hoodRelease || 'N/A'}</Text></Text>
            <Text>Trunk release: <Text style={tw`font-semibold`}>{report?.trunkRelease || 'N/A'}</Text></Text>
            <Text>Air bags: <Text style={tw`font-semibold`}>{report?.airBags || 'N/A'}</Text></Text>
            <Text>Tilt/telescopic steering wheels: <Text style={tw`font-semibold`}>{report?.steeringWheels || 'N/A'}</Text></Text>
            <Text>Horn: <Text style={tw`font-semibold`}>{report?.horn || 'N/A'}</Text></Text>
            <Text>Wiper controls: <Text style={tw`font-semibold`}>{ report?.wiperControls || 'N/A'}</Text></Text>
            <Text>Wind Shield Washer controls: <Text style={tw`font-semibold`}>{ report?.washerControls || 'N/A'}</Text></Text>
            <Text>AC: <Text style={tw`font-semibold`}>{report?.ac || 'N/A'}</Text></Text>
          </View>

          <View style={tw`mb-5 bg-white p-3 shadow-lg`}>
            <Text style={tw`text-green-800 font-semibold text-lg`}>Exterior</Text>
            <Text>windshield: <Text style={tw`font-semibold`}>{ report?.windShield || 'N/A'}</Text></Text>
            <Text>Wiper: <Text style={tw`font-semibold`}>{ report?.wiper || 'N/A'}</Text></Text>
            <Text>Mirrors: <Text style={tw`font-semibold`}>{ report?.sideMirrors || 'N/A'}</Text></Text>
            <Text>Head Lights: <Text style={tw`font-semibold`}>{ report?.headLights || 'N/A'}</Text></Text>
            <Text>Turn signals: <Text style={tw`font-semibold`}>{ report?.turnSignals || 'N/A'}</Text></Text>
            <Text>Tail lights: <Text style={tw`font-semibold`}>{ report?.tailLights || 'N/A'}</Text></Text>
            <Text>Brake lights: <Text style={tw`font-semibold`}>{ report?.brakeLight || 'N/A'}</Text></Text>
            <Text>Reverse lights: <Text style={tw`font-semibold`}>{ report?.reverseLights || 'N/A'}</Text></Text>
            <Text>Front bumber: <Text style={tw`font-semibold`}>{ report?.frontBumper || 'N/A'}</Text></Text>
            <Text>Rear bumber: <Text style={tw`font-semibold`}> {report?.rearBumper || 'N/A'}</Text></Text>
          </View>

          <View style={tw`mb-5 bg-white p-3 shadow-lg`}>
            <Text style={tw`text-green-800 font-semibold text-lg`}>Tires</Text>
            <Text>Alignment: <Text style={tw`font-semibold`}>{report?.alignment || 'N/A'}</Text></Text>
            <Text>Left front tire: <Text style={tw`font-semibold`}>{report?.leftFrontTire || 'N/A'}</Text></Text>
            <Text>Left rear tire:  <Text style={tw`font-semibold`}>{report?.leftRearTire || 'N/A'}</Text></Text>
            <Text>Right front tire:  <Text style={tw`font-semibold`}>{report?.rightFrontTire || 'N/A'}</Text></Text>
            <Text>Right rear tire:  <Text style={tw`font-semibold`}>{report?.rightRearTire || 'N/A'}</Text></Text>
            <Text>Spare tire:  <Text style={tw`font-semibold`}>{report?.spareTire || 'N/A'}</Text></Text>
          </View>

          <View style={tw`mb-5 bg-white p-3 shadow-lg`}>
            <Text style={tw`text-green-800 font-semibold text-lg`}>Underhood</Text>
            <Text>Engine Oil:  <Text style={tw`font-semibold`}>{report?.engineOil || 'N/A'}</Text></Text>
            <Text>Brake Fluid:  <Text style={tw`font-semibold`}>{report?.brakeFluid || 'N/A'}</Text></Text>
            <Text>Coolant:  <Text style={tw`font-semibold`}>{report?.coolant || 'N/A'}</Text></Text>
            <Text>Power Steering Fluid:  <Text style={tw`font-semibold`}>{report?.powerSteeringFluid || 'N/A'}</Text></Text>
            <Text>Transmission Fluid:  <Text style={tw`font-semibold`}>{report?.transmissionFluid || 'N/A'}</Text></Text>
            <Text>Engine Mounts:  <Text style={tw`font-semibold`}>{report?.engineMounts || 'N/A'}</Text></Text>
            <Text>Engine Belts:  <Text style={tw`font-semibold`}>{report?.engineBelts || 'N/A'}</Text></Text>
            <Text>Radiator:  <Text style={tw`font-semibold`}>{report?.radiator || 'N/A'}</Text></Text>
            <Text>Battery:  <Text style={tw`font-semibold`}>{report?.battery || 'N/A'}</Text></Text>
            <Text>Alternator:  <Text style={tw`font-semibold`}>{report?.alternator || 'N/A'}</Text></Text>
            <Text>Fuel Filter:  <Text style={tw`font-semibold`}>{report?.fuelFilter || 'N/A'}</Text></Text>
            <Text>Fuel Pump:  <Text style={tw`font-semibold`}>{report?.fuelPump || 'N/A'}</Text></Text>
          </View>

          <View style={tw`mb-5 bg-white p-3 shadow-lg`}>
            <Text style={tw`text-green-800 font-semibold text-lg`}>Road test</Text>
            <Text>Starting:  <Text style={tw`font-semibold`}>{report?.starting || 'N/A'}</Text></Text>
            <Text>Idling:  <Text style={tw`font-semibold`}>{report?.idling || 'N/A'}</Text></Text>
            <Text>Engine Noise:  <Text style={tw`font-semibold`}>{report?.engineNoise || 'N/A'}</Text></Text>
            <Text>Throttle:  <Text style={tw`font-semibold`}>{report?.throttle || 'N/A'}</Text></Text>
            <Text>Transmission Shift:  <Text style={tw`font-semibold`}>{report?.transmissionShift || 'N/A'}</Text></Text>
            <Text>Accelerating:  <Text style={tw`font-semibold`}>{report?.accelerating || 'N/A'}</Text></Text>
            <Text>Steering Alignment: <Text style={tw`font-semibold`}>{report?.steeringAlignment || 'N/A'}</Text></Text>
            <Text>Braking: <Text style={tw`font-semibold`}>{report?.braking || 'N/A'}</Text></Text>
            <Text>ABS: <Text style={tw`font-semibold`}>{report?.abs || 'N/A'}</Text></Text>
          </View>
        </View>

      </ScrollView>
      <View style={tw`mt-5`}></View>
    </View>
  );
};

export default Diagnostic;

const styles = StyleSheet.create({});
