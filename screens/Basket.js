import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import BasketCard from "../components/BasketCard";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket } from "../slices/carSlice";
import { useNavigation } from "@react-navigation/native";
import { setGrandTotal } from "../slices/carSlice";

const Basket = () => {
  const basket = useSelector(selectBasket);
  const navigation = useNavigation()

  const dispatch = useDispatch()
  
  let y = []

 basket.map((item) => {
   if(item.plan){
    return y.push(Number(item.plan.price))
   }else if (!item.plan && item.Name) {
    return y.push(Number(item.price))
   }else {
    return y.push(Number(item.total))
   }
    
  })

  const addCommaToValue = (num) =>{
    let to_string = `${num}`

    if(to_string.length > 4 && to_string.length <= 5) return to_string.substring(0, 2) + ',' + to_string.substring(2, to_string.length);
    if(to_string.length > 5 && to_string.length <= 6) return to_string.substring(0, 3) + ',' + to_string.substring(3, to_string.length);
    if(to_string.length > 6 ) return to_string.substring(0, 1) + ',' + to_string.substring(1, 4)+','+to_string.substring(4, to_string.length);
    if(to_string.length < 4) return to_string

    return to_string.substring(0, 1) + ',' + to_string.substring(1, to_string.length);
  }

  const sum = y.reduce((partial_sum, a) => partial_sum + a, 0);
  
  const grandTotal = sum 
  
  const SendToCheckout = () => {
    if(basket.length > 0) {
      dispatch(setGrandTotal(grandTotal))
      navigation.navigate('Checkout')
    }else {
      Alert.alert("Please add items to basket first")
    }
  } 

  return (
    <View style={tw`flex-grow pt-10 pb-5`}>
      <View style={tw`flex-row justify-around mb-8`}>
        
        <View style={tw`flex-row`}>
          <View>
            <Text style={tw`font-bold text-lg text-black`}>Basket</Text>
            <Text>View your basket</Text>
          </View>
          <View>
            <Icon name="shopping-basket" type="font-awesome" />
          </View>
        </View>
        
        <TouchableOpacity
          style={tw`items-center flex-row bg-green-400 px-3 rounded-lg`}
          onPress={() => SendToCheckout()}
        > 
          <Text style={tw`mr-2 text-white font-semibold`}>Checkout</Text>
          <Icon name="chevron-right" color={'white'} type="font-awesome" />
        </TouchableOpacity>
      </View>

      {
        basket.length < 1 ? 
        <View style={tw`flex-grow justify-center items-center`}>
          <Text style={tw`text-lg font-semibold`}>You have no items in your basket yet</Text>
        </View>

        :

      <ScrollView style={[tw`flex-grow pb-5`, { maxHeight: "80%" }]}>
        {basket.map((item, index) => {
          if(item.plan) {
            return (
              <BasketCard
                details={item}
                index={index+1}
              /> 
            )
          }

          if(item.Name) return (
            <BasketCard
              details={item}
              index={index+1}
            /> 
          )

          return (
            <BasketCard
              description={item.description}
              qty={item.qty}
              unitPrice={item.unitPrice}
              total={item.total}
              index={index+1}
            />
          )

        })}
      </ScrollView>
      }
      
      {
        basket.length > 0 &&
        <View style={tw`items-center mt-5`}>
          <Text style={tw`text-2xl`}>Grand Total: <Text style={tw`font-semibold`}>{addCommaToValue(Number.parseInt(grandTotal))}</Text> </Text>
        </View>
      }

    </View>
  );
};

export default Basket;

const styles = StyleSheet.create({});
