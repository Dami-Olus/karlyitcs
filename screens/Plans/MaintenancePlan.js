import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaintenancePlanData } from '../../cardata'
import { useSelector, useDispatch } from 'react-redux'
import CarItem from "../../components/CarItem";
import { addToBasket } from "../../slices/carSlice";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import Firebase from "../../config/firebase";

const firestore = Firebase.firestore() 

function MaintenancePlan() {

  const navigation = useNavigation()
  const [modalVisible, setmodalVisible] = useState(false)
  const [plan, setplan] = useState(null)
  const [selectedCars, setselectedCars] = useState([])
  const [usersPlans, setusersPlans] = useState([])

  const { cars, basket } = useSelector(state => state.car)
  const dispatch = useDispatch()

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
    setmodalVisible(true)
    setplan(selectedPlan)
  } 

  const handleClose = () =>{
    setmodalVisible(false)
    setselectedCars([])
  }

  const addPlanToBasket = () =>{
    selectedCars.forEach(car => {
      const filteredPlans = basket.filter(carPlan => carPlan.key === car.key && carPlan.plan.Name === plan.Name)
      if(filteredPlans.length < 1){
        dispatch(addToBasket({ ...car, plan }))
      }else {
        Alert.alert(`A ${plan.Name} plan is already active for your ${car.make} ${car.model} car`)
      }
      
    })
    navigation.navigate("Basket")
    return handleClose()
  }

  return (
    <ScrollView style={tw`mt-10 px-5 mb-5`}>
      <Modal
        animationType="slide"
        visible={modalVisible}

      >
        <View style={tw`flex-grow mb-10 mt-10 px-5`}>
          <View style={tw`flex-row justify-between mb-5`}>
            <View>
              <Text style={tw`text-xl font-semibold`}>Select Car for {plan?.Name} Plan</Text>
              <Text style={tw`text-gray-600 font-medium`}>What Car are you selecting the {plan?.type} for?</Text>
            </View>

            <TouchableOpacity style={tw`items-center`} onPress={() => handleClose()}>
              <Text style={tw`text-xl capitalize text-red-600`}>close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={[tw`pb-8 mb-10`, { maxHeight: "80%" }]}>
            {
              cars.map(item => {
               return <CarItem 
                  car={item} 
                  plan={plan}
                  usersPlans={usersPlans} 
                  selectedCars={selectedCars} 
                  setselectedCars={setselectedCars}  
                />
              })
            }
          </ScrollView>

          {
            selectedCars.length > 0 &&
            <TouchableOpacity 
              style={[tw`w-10/12 mx-auto p-3 rounded-md shadow-md`, { backgroundColor: "#2bced6" }]}
              onPress={() => addPlanToBasket()}
            >
              <Text style={tw`text-center`}>Add the <Text style={tw`font-semibold`}>{plan?.Name} {plan.type}</Text> to basket- Total: <Text style={tw`text-lg font-semibold`}>{addCommaToValue(plan?.price*(selectedCars.length))}</Text></Text>
            </TouchableOpacity>
          }
        </View>
        
      </Modal>

      <Text style={tw`text-xl font-semibold`}>Maintenance Plan</Text>
      
      <View style={tw`flex-row mb-6 mt-5 items-center`}>
        <View
          style={tw` w-1/4 h-20 rounded-xl bg-white justify-center items-center`}
        >
          <Image source={require("../../assets/icons/maintain.png")} />
          <Text style={tw`text-center`}>Maintenance Plan</Text>
        </View>

        <View style={tw`mr-28 ml-5`}>
          <Text style={tw`text-gray-500`}>
            "Sign up and get your car in tip top shape while making savings."
          </Text>
        </View>
      </View>

      <View style={tw`items-center`}>
        <View style={[styles.plan, tw`shadow-lg`]}>
          <Text style={styles.planHeader}>Basic</Text>

          <View>
            {
              MaintenancePlanData.Basic.features.map((feature, index) => (
                <Text key={index+1}>- {feature}</Text>
              ))
            }
          </View>
          
          
          
          <TouchableOpacity
            style={[tw`border-0 rounded-3xl  w-32 p-2 mt-5 mb-5`, styles.pryColor]}
            onPress={() => handleNext({Name: 'Maintenance', type: 'Basic', price: MaintenancePlanData.Basic.price})}
          >
            <Text style={tw`text-white text-center`}>Select and Pay <Text>{addCommaToValue(MaintenancePlanData.Basic.price)}</Text></Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.plan, tw`shadow-lg`]}>
          <Text style={styles.planHeader}>Standard </Text>
          
          <View>
            {
              MaintenancePlanData.Standard.features.map((feature, index) => (
                <Text key={index+1}>- {feature}</Text>
              ))
            }
          </View>

          

          <TouchableOpacity 
            style={[tw`border-0 text-white text-center rounded-3xl  w-32 p-2 mt-5 mb-5`, styles.pryColor]}
            onPress={() => handleNext({Name: 'Maintenance', type: 'Standard', price: MaintenancePlanData.Standard.price})}
          >
            <Text style={tw`text-white text-center`}>Select and Pay {addCommaToValue(MaintenancePlanData.Standard.price)}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.plan, tw`shadow-lg`]}>
          <Text style={styles.planHeader}>Comprehensive </Text>
          
          <View>
            {
              MaintenancePlanData.Comprehensive.features.map((feature, index) => (
                <Text key={index+1}>- {feature}</Text>
              )
            )}
          </View>

          

          <TouchableOpacity 
            style={[tw`border-0 text-white text-center rounded-3xl  w-32 p-2 mt-5 mb-5`, styles.pryColor]}
            onPress={() => handleNext({Name: 'Maintenance', type: 'Comprehensive', price: MaintenancePlanData.Comprehensive.price})}
          >
            <Text style={tw`text-white text-center`}>Select and Pay {addCommaToValue(MaintenancePlanData.Comprehensive.price)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default MaintenancePlan;

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