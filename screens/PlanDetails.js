import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { ChooseImageForPlan } from '../components/PlansForCar'
import tw from "tailwind-react-native-classnames";

const PlanDetails = () => {
    const route = useRoute()
    const startDate = route.params.plan.createdAt ? new Date(route.params.plan.createdAt.seconds*1000) : new Date(Date.now())
    const endDate = route.params.plan.createdAt ? new Date((route.params.plan.createdAt.seconds+31556926.000001)*1000) : new Date(Date.now()+(31556926.000001*1000))

    const addCommaToValue = (num) =>{
        let to_string = `${num}`
    
        if(to_string.length > 4 && to_string.length <= 5) return to_string.substring(0, 2) + ',' + to_string.substring(2, to_string.length);
        if(to_string.length > 5 && to_string.length <= 6) return to_string.substring(0, 3) + ',' + to_string.substring(3, to_string.length);
        if(to_string.length > 6 ) return to_string.substring(0, 1) + ',' + to_string.substring(1, 4)+','+to_string.substring(4, to_string.length);
        if(to_string.length < 4) return to_string
    
        return to_string.substring(0, 1) + ',' + to_string.substring(1, to_string.length);
      }


  return (
    <View style={tw`flex-grow bg-gray-100 py-10 px-5`}>
        <View style={tw`bg-white w-4/6 items-center px-3 mx-auto py-3 rounded-lg shadow-lg mb-10`}>
            <ChooseImageForPlan name={route.params.name} />
            <Text style={tw`text-2xl`}>{route.params.name} Plan</Text>
            <Text style={tw`text-lg font-medium text-gray-400`}>Type: {route.params.type}</Text>            
        </View>
    
        <View>
            <View style={tw`w-full mb-5 flex-row justify-between px-3  rounded-lg mx-auto bg-white py-2`}>
                <Text style={tw`text-lg text-gray-400`}>Car: </Text>
                <Text style={tw`text-lg`}>{route.params.car}</Text>
            </View>

            <View style={tw`w-full mb-5 flex-row justify-between px-3  rounded-lg mx-auto bg-white py-2`}>
                <Text style={tw`text-lg text-gray-400`}>Start Date: </Text>
                <Text style={tw`text-lg`}>{startDate.toLocaleDateString()}</Text>
            </View>
            
            <View style={tw`w-full mb-5 flex-row justify-between px-3  rounded-lg mx-auto bg-white py-2`}>
                <Text style={tw`text-lg text-gray-400`}>Expiration Date: </Text>
                <Text style={tw`text-lg`}>{endDate.toLocaleDateString()}</Text>
            </View>
            
            {/* <View style={tw`w-full  mb-5 flex-row justify-between px-3 rounded-lg mx-auto bg-white py-2`}>
                <Text style={tw`text-lg text-gray-400`}>Price: </Text>
                <Text style={tw`text-lg`}>{addCommaToValue(route.params.plan.plan.price)}</Text>
            </View> */}
        </View>

    </View>
  )
}

export default PlanDetails