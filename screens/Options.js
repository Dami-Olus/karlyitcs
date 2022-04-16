import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import Firebase from "../config/firebase";
import tw from "tailwind-react-native-classnames";
import { IconButton } from "../components";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentCar } from "../slices/carSlice";

const auth = Firebase.auth();

const Options = () => {
  const dispatch = useDispatch();


  const handleSignOut = async () => {
    try {
      await auth.signOut().then(() => {
        dispatch(setCurrentCar(null))
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation()

  return (
    <View style={tw`mt-16 px-3`}>
      <Text style={tw`mb-3 font-semibold p-3 bg-white`}>Profile</Text>
      <Text style={tw`mb-3 font-semibold p-3 bg-white`}>Help and Support</Text>

      <TouchableOpacity style={tw`mb-3 font-semibold p-3 bg-white`} onPress={() => Linking.openURL('https://www.karlytics.com/privacy_policy')}>
        <Text style={tw`font-semibold`} >Privacy policy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => handleSignOut()}
        style={[tw`flex-row px-3 py-2 items-center rounded-lg w-32 bg-red-400`]}
      >
          <IconButton
            name="logout"
            size={24}
            color="white"
          />
          <Text style={tw`ml-5 text-white`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({});
