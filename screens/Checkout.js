import React, { useContext, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import  { Paystack }  from 'react-native-paystack-webview';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { resetBasket, selectGrandTotal } from "../slices/carSlice";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase from '../config/firebase';
import firebase from 'firebase';
import tw from "tailwind-react-native-classnames";

const firestore = Firebase.firestore()

const Checkout = () => {
  const navigation = useNavigation()
  const grandTotal = useSelector(selectGrandTotal)
  const { basket } = useSelector(state => state.car)

  const { user } = useContext(AuthenticatedUserContext);
  const paystackWebViewRef = useRef(); 
  const dispatch = useDispatch()

  const handleSuccess = () =>{
    const plansRef = firestore.collection("Plans")
              .doc(user.uid)
              .collection("Plans")

    const plans_in_basket = basket.filter(item => "plan" in item || "Name" in item)
  
    plans_in_basket.forEach(async (plan) => {
      if(plan?.Name) {
        await plansRef.doc().set({...plan, createdAt: firebase.firestore.FieldValue.serverTimestamp()})
      }else {
        await plansRef.doc().set({ carId: plan.key,  plan: plan.plan, garage_id: plan.garageId, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      }
      
    })

    dispatch(resetBasket())
    return navigation.push('Tabs', { alert: `Payment was successful` })
  }
   

  return (
    <View>
      <Paystack  
        paystackKey="pk_test_0adc58258fd0cb5fc19574e4e371ab721109d35d"
        amount={grandTotal}
        billingEmail={user.email}
        activityIndicatorColor="green"
        onCancel={() => navigation.push('Basket')}
        onSuccess={() => handleSuccess()}
        autoStart={true}
      />
    </View>
  )
}

export default Checkout