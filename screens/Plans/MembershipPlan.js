import React from 'react'
import { useState, useContext } from 'react';
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { MembershipPlanData } from '../../cardata'
import { useNavigation } from "@react-navigation/native";
import { addToBasket } from '../../slices/carSlice';
import Firebase from '../../config/firebase'
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import { useEffect } from 'react';

const firestore = Firebase.firestore()

function MembershipPlan() {
  
  const [plan, setplan] = useState(null)
  const [usersPlans, setusersPlans] = useState([])

  const { basket } = useSelector(state => state.car)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const fetchUsersPlans = async () =>{
      let plansD = []

      await firestore.
      collection("Plans")
      .doc(user.uid)
      .collection("Plans")
      .get()
      .then((data) => {
        data.forEach(item => {
          return plansD.push(item.data())
        })
      }).catch(err => console.log(err))

      setusersPlans(plansD)
    }
    
    fetchUsersPlans()
  }, [])
  

  const addCommaToValue = (num) =>{
    let to_string = `${num}`

    if(to_string.length > 4) return to_string.substring(0, 2) + ',' + to_string.substring(2, to_string.length);

    return to_string.substring(0, 1) + ',' + to_string.substring(1, to_string.length);
  }

  const handleNext = (selectedPlan) =>{
    return setplan(selectedPlan)
  } 

  const addPlanToBasket = () =>{
    
      const filteredPlans = basket.filter(carPlan => carPlan?.Name === plan.Name && carPlan?.type === plan.type)

      if(filteredPlans.length === 0 ){
        dispatch(addToBasket(plan))
      }else {
        Alert.alert(`This plan is already in basket`)
      }
    
    return  navigation.navigate("Basket")
  }

  return (
    <ScrollView style={tw`mt-10 px-5`}>
      <Text style={tw`text-xl font-semibold`}>Membership Plan</Text>
      
      <View style={tw`flex-row mb-6 mt-5 items-center`}>
        <View
          style={tw` w-1/4 h-20 rounded-xl bg-white justify-center items-center`}
        >
          <Image source={require("../../assets/icons/membership.png")} />
          <Text style={tw`text-center`}>Membership Plan</Text>
        </View>

        <View style={tw`mr-28 ml-5`}>
          <Text style={tw`text-gray-500`}>
            "Get exclusive benefits like discounts on all requests and plans, priority response and much more."
          </Text>
        </View>
      </View>

      <View style={tw`items-center`}>
          {/* Gold plan */}
          <View style={[styles.plan, tw`shadow-lg`]}>
            <Text style={styles.planHeader}>Gold </Text>

            <View>
              {
                MembershipPlanData.Gold.features.map((feature, index) => (
                  <Text key={index+1}>- {feature}</Text>
                ))
              }
            </View>
            
            

            <TouchableOpacity
              style={[tw`border-0 rounded-3xl  w-32 p-2 mt-5 mb-5`, styles.pryColor]}
              onPress={() => handleNext({Name: 'Membership', type: 'Gold', price: MembershipPlanData.Gold.price })}
            >
              <Text style={tw`text-white text-center`}>Select and Pay <Text>{addCommaToValue(MembershipPlanData.Gold.price)}</Text></Text>
            </TouchableOpacity>
          </View>
        
          {/* Silver plan */}
          <View style={[styles.plan, tw`shadow-lg`]}>
            <Text style={styles.planHeader}>Silver </Text>

            <View>
              {
                MembershipPlanData.Silver.features.map((feature, index) => (
                  <Text key={index+1}>- {feature}</Text>
                ))
              }
            </View>
            
            

            <TouchableOpacity
              style={[tw`border-0 rounded-3xl  w-32 p-2 mt-5 mb-5`, styles.pryColor]}
              onPress={() => handleNext({Name: 'Membership', type: 'Silver', price: MembershipPlanData.Silver.price })}
            >
              <Text style={tw`text-white text-center`}>Select and Pay <Text>{addCommaToValue(MembershipPlanData.Silver.price)}</Text></Text>
            </TouchableOpacity>
          </View>

          {
            plan && 
            <TouchableOpacity 
              style={[tw`w-10/12 mx-auto p-3 rounded-md shadow-md my-8`, { backgroundColor: "#2bced6" }]}
              onPress={() => addPlanToBasket()}
            >
            <Text style={tw`text-center`}>Add the <Text style={tw`font-semibold`}>{plan?.Name} {plan.type}</Text> to basket- Total: <Text style={tw`text-lg font-semibold`}>{addCommaToValue(plan?.price)}</Text></Text>
          </TouchableOpacity>
          }
         
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  plan: {
    backgroundColor: '#e5e5ea',
    width: "90%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 15
  },

  planHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },

  pryColor: {
    backgroundColor: "#2bced6"
  }
})

export default MembershipPlan
