import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { addMake, selectMake } from '../slices/carSlice'
import { cars } from "../cardata";

const CarMakes = () => {

  const dispatch = useDispatch()

  const navigation = useNavigation()
  
  const handleNext = (item) => {
    navigation.navigate('CarModel')
    dispatch(addMake(item.model))
  }

  return (
    <View style={tw`mt-20`}>
      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <TouchableOpacity style={tw`bg-gray-100 text-lg h-10 text-center py-1 border-t justify-center`} onPress={() => handleNext(item)} >
            <Text style={tw`px-3`}>{item.model}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.index}
      />
    </View>
  );
};

export default CarMakes;

const styles = StyleSheet.create({});
