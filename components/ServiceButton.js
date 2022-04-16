import React from "react";
import { Image } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const ServiceButton = ({title, onPress, image}) => {
  return (
    <TouchableOpacity
      style={tw` w-1/4 h-20 ml-5 rounded-full bg-white justify-center items-center mb-5`}
      onPress={onPress}
    >
      <Image source={image} />
      <Text style={tw`text-center`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ServiceButton;

const styles = StyleSheet.create({});
