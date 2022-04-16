import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectRequest } from "../slices/carSlice";
import { addToBasket } from '../slices/carSlice'


const QuotationCard = ({ partNumber, description, qty, unitPrice, total, id}) => {

  const dispatch = useDispatch()
  const { basket, requestId } = useSelector(state => state.car)

  const addItemToBasket = () => {
    const item_in_basket = basket.filter(item => item.requestId === requestId && item.index === id)

    if(item_in_basket.length > 0) return Alert.alert("Item already added to basket") 

    dispatch(addToBasket({
        partNumber, description, qty, unitPrice, total, index: id, requestId
    }))
  }

  return (
    <View
      style={tw`bg-white mx-4 rounded-xl mb-8 p-5 justify-center shadow-2xl h-28`}
      key={id}
    >
      <View style={tw`flex-row justify-between h-12 items-center`}>
        <Icon name="car-battery" type="font-awesome-5" />
        <View>
          <Text>Part Number: <Text style={tw`font-semibold`}>{partNumber}</Text> </Text>
          <Text>Description: <Text style={tw`font-semibold`}>{description}</Text></Text>
          <Text>Qty: <Text style={tw`font-semibold`}>{qty}</Text></Text>
          <Text>Unit Price: <Text style={tw`font-semibold`}>{unitPrice}</Text></Text>
          <Text style={tw`text-lg`}>Total: <Text style={tw`font-semibold`}>{total}</Text></Text>
        </View>
        <View style={tw`-mt-4`}>
          <TouchableOpacity style={[tw` border-2 items-center mb-1 border-gray-50 py-2 px-2 rounded-xl`, { backgroundColor: '#2bced6' }]} onPress={addItemToBasket}>
            <Text style={tw`text-xs text-white font-semibold`}>Add to Basket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[tw`border-2 mb-1 py-2 items-center rounded-xl`, { borderColor: "#2bced6" } ]}>
            <Text style={[tw`text-xs font-semibold`, { color: "#2bced6" }]}>Save for Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuotationCard;

const styles = StyleSheet.create({});
