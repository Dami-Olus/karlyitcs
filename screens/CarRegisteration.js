import React, { useCallback, useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Alert,
  Pressable
} from "react-native";
import tw from "tailwind-react-native-classnames";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setNextDate,
  selectMake,
  selectModel,
} from "../slices/carSlice";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { add } from "date-fns";
import { bodyData, car_years } from "../cardata";


const firestore = Firebase.firestore();

const CarRegisteration = () => {
  const { user } = useContext(AuthenticatedUserContext);
  
  const make = useSelector(selectMake);
  const model = useSelector(selectModel);
  const dispatch = useDispatch();
  const garageId = user.uid;

  const navigation = useNavigation();
 
  const [year, setYear] = useState(car_years);
  const [body, setBody] = useState(bodyData);
  const [dateText, setdateText] = useState("Select Last Service Date")

  const [bodyValue, setBodyValue] = useState(null);
  const [yearValue, setYearValue] = useState(null);

  const [yearOpen, setYearOpen] = useState(false);
  const [bodyOpen, setBodyOpen] = useState(false);

  const onYearOpen = useCallback(() => {
    setBodyOpen(false);
    Keyboard.dismiss()
  }, []);

  const onBodyOpen = useCallback(() => {
    setYearOpen(false);
    Keyboard.dismiss()
  }, []);

  
  const [lastServiceDate, setLastServiceDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const [input, setinput] = useState({
    license: "",
    mileage: 0,
  })

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || lastServiceDate;
    setShow(Platform.OS === "ios");
    setLastServiceDate(currentDate);

    setdateText(currentDate.toLocaleDateString())
  };

  
  const showDatepicker = () => {
    Keyboard.dismiss()
    setShow(true);
  };

  const handleTextChange = (text, name) => {
    if(name === 'license'){
      return setinput({ ...input, license: text })
    }else if(name === 'mileage'){
      return setinput({ ...input, mileage: text })
    }
    else {
      return
    }
  }

  const newLastServiceDate = lastServiceDate.toString();
  const nextDate = add(lastServiceDate, {months: 4});
  
  const submit = () => {
    const carRef = firestore
    .collection("Garage")
    .doc(garageId)
    .collection("Garage");
    
    if(Number.parseInt(input.mileage) < 1000) return Alert.alert("invalid mileage")
    if(!input.license) return Alert.alert("Enter a license for the car")
    if(!yearValue) return Alert.alert("Select the year for the car")
    if(!bodyValue) return Alert.alert("Select the type of body for the car")

    const data = {
      Make: make,
      Model: model,
      License: input.license,
      Mileage: input.mileage,
      Year: yearValue,
      BodyType: bodyValue,
      garageId,
      lastServiceDate: newLastServiceDate,
      nextServiceDate: nextDate.toDateString()
    };
    
    carRef.doc().set(data);
    dispatch(setNextDate(nextDate.toString()))
    navigation.navigate("Garage");
  };

  return (
    <View style={tw`py-10 px-4`}>
      
      <View style={tw`flex-row mt-5`}>
        <View style={tw`mb-8`}>
          <Text style={tw`font-bold text-lg text-black`}>
            Car registeration
          </Text>
          <Text>Register your car</Text>
        </View>
      </View>

      <KeyboardAvoidingView>
        <View>
          <TextInput style={styles.input} autoFocus={true} value={input.license} onChangeText={(e) => handleTextChange(e, "license")} placeholder="licence" />
          <TextInput keyboardType="numeric" maxLength={8} style={styles.input} value={input.mileage} onChangeText={(e) => handleTextChange(e, "mileage")} placeholder="Mileage per year" />
          
          <DropDownPicker
            placeholder="select Year"
            zIndex={3000}
            zIndexInverse={1000}
            open={yearOpen}
            onOpen={onYearOpen}
            value={yearValue}
            items={year}
            setOpen={setYearOpen}
            setValue={setYearValue}
            setItems={setYear}
            style={tw`mb-5`}
          />

          <DropDownPicker
            placeholder="Select Body Type"
            zIndex={2000}
            zIndexInverse={2000}
            open={bodyOpen}
            onOpen={onBodyOpen}
            value={bodyValue}
            items={body}
            setOpen={setBodyOpen}
            setValue={setBodyValue}
            setItems={setBody}
            style={tw`mb-5`}
          />

          <TouchableOpacity onPress={() => showDatepicker()} style={tw`mb-5 w-5/6 border-2 mx-auto rounded-lg border-blue-300 py-2`}>
            <Text style={tw`text-blue-500 font-semibold text-center text-xl`}>{dateText}</Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={lastServiceDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date(Date.now())}
            />
          )}

          <Pressable style={[tw`mt-8 px-3 rounded-lg flex-row justify-center mx-auto py-2 w-36`, { backgroundColor: "#2bced6" }]}  onPress={submit}>
            <Text style={tw`text-white text-lg`}>submit</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CarRegisteration;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    fontSize: 20
  }
});
