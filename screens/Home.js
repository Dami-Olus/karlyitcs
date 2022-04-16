import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import AddCar from "../components/AddCar";
import HealthCard from "../components/HealthCard";
import ServiceButton from "../components/ServiceButton";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import ServiceInfo from "../components/ServiceInfo";
import { useSelector, useDispatch } from "react-redux";
import { getPlans } from "../slices/carSlice";
import { getCars } from "../slices/carSlice";
import PlansForCar from "../components/PlansForCar";
import firebase from 'firebase'

const firestore = Firebase.firestore();

const Home = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [usersFullname, setusersFullname] = useState(null);
  const [showAlert, setshowAlert] = useState(false)

  const navigation = useNavigation();
  const router = useRoute()
  const { user } = useContext(AuthenticatedUserContext);

  const { current_car, cars, plans, basket } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore
      .collection("Garage")
      .doc(user.uid)
      .collection("Garage")
      .where("garageId", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const garage = [];

        querySnapshot.forEach((documentSnapshot) => {
          garage.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        dispatch(getCars(garage));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchuserData = async () => {
      await firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => setusersFullname(doc.data().name))
        .catch((error) => console.log(error));

       
    };

    fetchuserData();
  }, [user]);
 
  useEffect(() => {
    const fetchPlans = async () =>{
      if(!current_car) return 

      let plan_arr = []

      await firestore
      .collection("Plans")
      .doc(user.uid)
      .collection("Plans")
      .where('carId',  '==', current_car.key)
      .get()
      .then(res => {
        res.forEach(plan => {
          plan_arr = [...plan_arr, plan.data()]
        })
      })
      .catch((error) => console.log(error));

      await firestore
      .collection("Plans")
      .doc(user.uid)
      .collection("Plans")
      .where('Name',  '==', "Membership")
      .get()
      .then(res => {
        res.forEach(plan => {
          plan_arr = [...plan_arr, plan.data()]
        })
      })
      .catch((error) => console.log(error))

      return dispatch(getPlans(plan_arr))
    }
    fetchPlans()
  }, [])

  const handleServiceButton = (route) => {
    if (cars.length === 0) return alert("Add car to your garage to access this feature");
    if (!current_car) return alert("Select a car to access these services");

    return navigation.navigate(route);
  };

  const checkModal = () => {
    if(router.params?.alert) return true
    return false
  }

  return (
    <View style={tw`bg-white pt-16`}> 
      <ScrollView>
        <View style={tw`bg-white ${checkModal() && 'opacity-40'}`}>
          <View style={tw`flex-row justify-between px-3`}>
            <View>
              <Text style={tw`font-bold text-lg text-black`}>
                Welcome {usersFullname}{" "}
              </Text>
              <Text>How's your car feeling today</Text>
            </View>

            <TouchableOpacity style={tw`flex-row relative`} onPress={() => navigation.navigate("Basket")}>
              <View style={styles.basket}>
                <Text style={{ color: "white" }}>{basket.length}</Text>
              </View>
             
              <Image
                source={require("../assets/icons/shopping-cart.png")}
                style={{ resizeMode: "contain", height: 40 }}
              />
            </TouchableOpacity>
          </View>

          {cars.length !== 0 ? (
            <View style={tw`px-4 mt-5 mb-3`}>
              {current_car ? (
                <View>
                  <Text
                    style={[
                      tw`text-2xl font-semibold mb-5`,
                      { color: "#2bced6" },
                    ]}
                  >
                    {current_car.Make} {current_car.Model}
                  </Text>

                  <ServiceInfo current_car={current_car} />
                </View>
              ) : (
                <Text style={tw`text-xl text-gray-600 font-medium`}>
                  Select a car from your garage
                </Text>
              )}

            </View>
          ) : (
            <AddCar />
          )}

          {cars.length > 0 ? (
              <TouchableOpacity
                style={[styles.selectCar, tw`mx-auto`]}
                onPress={() => navigation.navigate("Garage")}
              >
                <Text style={tw`text-white text-xl text-center`}>{current_car ? "Change Car" : "Select Car"}</Text>
              </TouchableOpacity>
            ) : (
              <View style={tw`w-full items-center justify-center`}>
                <Text style={tw`font-semibold mb-5 text-gray-400`}>No car(s) yet</Text>
              </View>
            )}

          <View style={tw`bg-gray-100  rounded-t-3xl`}>
            {
              current_car && 
              <View style={tw`bg-gray-100 mt-5 w-full mx-auto p-3 rounded-lg`}>
                <View style={tw`mb-5`}>
                  <Text style={tw`text-xl font-semibold text-gray-800`}>Membership Plan</Text>
                  {
                    plans.filter(item => item.Name === "Membership").length > 0 ?

                    plans.filter(item => item.Name === "Membership").map((mem, index) => (<Text key={index} style={[tw`font-semibold text-sm text-gray-500`]}>{mem.type} {mem.Name}</Text>))
                    :
                    <Text style={tw`text-sm text-gray-400`}>You have no membership plan yet</Text>
                  }
                </View>

                <PlansForCar selectedCar={current_car} plans={plans}  />
              </View>
            }
           
            <View style={tw`mb-5`}>
              <View>
                <HealthCard />
              </View>

              <Text style={tw`ml-7 mt-5 text-center font-bold mb-5 text-lg`}>
                Make a request
              </Text>

              
            </View>

            <View style={tw`flex-row mb-24 flex-wrap items-center justify-center`}>
              <ServiceButton
                title="Repair"
                image={require("../assets/icons/repair.png")}
                onPress={() => handleServiceButton("Repairs")}
              />
              <ServiceButton
                title="Maintenance"
                image={require("../assets/icons/maintain.png")}
                onPress={() => handleServiceButton("Maintenance")}
              />
              <ServiceButton
                title="Inspection"
                image={require("../assets/icons/Inspect.png")}
                onPress={() => handleServiceButton("Inspection")}
              />
              <ServiceButton
                title="Plans"
                image={require("../assets/icons/wpf_renew-subscription.png")}
                onPress={() => handleServiceButton("Plans")}
              />
               <ServiceButton
                title="Buy parts"
                image={require("../assets/icons/shop.png")}
                onPress={() => handleServiceButton("Shop")}
              />
               <ServiceButton
                title="Scan your car"
                image={require("../assets/icons/scan.png")}
                onPress={() => handleServiceButton("Scan")}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

{/* <Modal
  transparent={true}
  visible={showAlert}
>
  <View style={tw`mt-10 bg-green-400 mx-auto w-11/12 p-3 rounded-lg`}>
    <TouchableOpacity style={tw`w-full items-end`} onPress={() => setshowAlert(false)}>
      <Icon name="close" type="font-awesome" color='white' size={20} />
    </TouchableOpacity>
    
    <View style={tw`w-full items-center`}>
      <Icon name="check-circle-o" color='white' type="font-awesome" />
      <Text style={tw`text-white font-semibold`}>{router.params?.alert}</Text>
    </View>
  </View>
  
</Modal> */}

export default Home;

const styles = StyleSheet.create({
  selectCar: {
    backgroundColor: "#2bced6",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 20,
    width: "80%",
    paddingVertical: 5
  },

  basket: {   
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2bced6",
    height: 16,
    width: 16,
    zIndex: 2,
    left: -3,
    borderRadius: 999
  }
});
