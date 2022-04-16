import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import AwesomeAlert from "react-native-awesome-alerts";
import Firebase from "../config/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { changeTime } from "../cardata";

const firestore = Firebase.firestore();

const Inspection = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const location = ["On-Site", "Pick-up", "Drop-off"];
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [garage, setGarage] = useState([]); // Initial empty array of users
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showAlert, setshowAlert] = useState(false)
  const [error, seterror] = useState("")

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setdateText] = useState({
    date: "Choose Date",
    time: "Choose Time"
  })


  const onChange = (selectedDate, dateTime) => {
    const currentDate = dateTime || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if(mode === 'date') {
      setdateText({
        ...dateText,
        date: currentDate.toLocaleDateString()
      })
    }else {
      setdateText({
        ...dateText,
        time: `${changeTime(currentDate.getUTCHours(), 'hours')}: ${changeTime(currentDate.getUTCMinutes())} `
      })
    }
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const submit = () => {
    if(!selectedCar) {
      seterror("Please a select a car for scan")
      return setshowAlert(true)
    }

    if(!selectedLocation) {
      seterror("Please Choose location for car pickup")
      return setshowAlert(true)
    }

    const newdate = date.toString();

    const requestId = user.uid;
    const data = {
      requestIcon: "../assets/icons/Inspect.png",
      requestType: "Inspection",
      Car: selectedCar,
      Location: selectedLocation,
      Schedule: newdate,
      requestId,
      status: "Pending"
    };

    const requestRef = firestore
      .collection("Requests")
      .doc(requestId)
      .collection("Requests");

    requestRef.doc().set(data);

    navigation.navigate("Requests");
  };

  useEffect(() => {
    const subscriber = firestore
      .collection("Garage")
      .doc(user.uid)
      .collection("Garage")
      .where("garageId", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const garage = [];

        querySnapshot.forEach((documentSnapshot) => {
          garage.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        // console.log(garage);
        setGarage(garage);
        setLoading(false);
      });
  }, []);

  const confirm = () =>{
    return setshowAlert(false)
  }

  return (
    <View style={tw`bg-white flex-grow`}>
      <View style={tw`ml-5 mt-8`}>
        <View style={tw`mb-8`}>
          <Text style={tw`font-bold text-lg text-black`}>
            Request Inspection
          </Text>
          <Text>Select a car</Text>
        </View>
      </View>

      <View>
        <AwesomeAlert
          show={showAlert}
          title={"Failed to make request"}
          message={error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Try Again"
          confirmButtonColor="red"
          onConfirmPressed={() => confirm()}
        />

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
       
        <SelectDropdown
         buttonStyle={tw`mb-5 self-center bg-gray-200 rounded-lg w-5/6 shadow-lg`}
          data={location}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setSelectedLocation(selectedItem);
          }}
          defaultButtonText="Select Location"
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <TouchableOpacity onPress={() => showDatepicker()} style={tw`mb-5 w-5/6 border-2 mx-auto rounded-lg border-blue-300 py-2`}>
          <Text style={tw`text-blue-500 font-semibold text-center text-xl`}>{dateText.date}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showTimepicker()} style={tw`mb-5 w-5/6 border-2 mx-auto rounded-lg border-blue-300 py-2`}>
          <Text style={tw`text-blue-500 font-semibold text-center text-xl`}>{dateText.time}</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <TouchableOpacity style={[{ backgroundColor: "#2bced6" }, tw`mx-auto w-5/6 rounded-lg p-3 mt-3 shadow-lg`]} onPress={() => submit()}>
        <Text style={tw`text-white text-center`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Inspection;

const styles = StyleSheet.create({});
