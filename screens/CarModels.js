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
import { useDispatch, useSelector } from "react-redux";
import { addModel, selectMake } from "../slices/carSlice";
import models from './models'

const CarModels = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const make = useSelector(selectMake)
  
  let target = [];

  models.filter((mod)=>{
    return mod.model_make_id === make
  }).map((mod) => {
    target.push(mod.model_name)
  })
  
  const handleNext = (item) => {
    navigation.navigate('CarRegisteration')
    dispatch(addModel(item))
  }

  return (
    <View style={tw`mt-10 pb-20`}>
      <View style={tw`flex-row justify-center mb-4`}>
        <Text style={tw`font-bold text-xl`}>{make}</Text>
      </View>
      
      <FlatList
        data={target}
        renderItem={({item}) => (
          <TouchableOpacity style={tw`bg-gray-100 text-lg h-10 text-center py-1 border-t justify-center `} onPress={() => handleNext(item)}>
            <Text style={tw`px-3`}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.index}
      />
    </View>
  );
};

export default CarModels;

const styles = StyleSheet.create({});
