import React from 'react'
import { useState, useEffect } from 'react'
import { Image, View, Text } from 'react-native'
import { CheckBox } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

function CarItem({ car, setselectedCars, selectedCars, usersPlans, plan, key }) {

    const [isChecked, setisChecked] = useState(false)
    const [isDisabled, setisDisabled] = useState(false)

    useEffect(() => {
     const fetchPlans = () =>{
      const exist = usersPlans.find(element => element.carId === car.key && element.plan.Name === plan.Name &&  element.plan.type === plan.type)
      
      if(exist){
        setisDisabled(true)
      }
    }
    fetchPlans()
    }, [])
    

    const selectCar = (id) =>{
      const filteredCars = selectedCars.find(car => car.key === id)
  
      if(!filteredCars) {
        setselectedCars([...selectedCars, car])
        setisChecked(true)
      }else {
        setselectedCars(selectedCars.filter(car => car.key !== id))
        setisChecked(false)
      }
    }
  
    return (
      <View key={car.key} style={tw`flex-row items-center bg-gray-100 rounded-lg shadow-md mb-5 p-3`}> 
         <CheckBox
          disabled={isDisabled}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isChecked}
          onPress={() => selectCar(car.key)}
        />
  
        <Image source={require("../assets/icons/garage-car.png")} style={{ resizeMode: "contain", height: 50, width: 70 }} />
        
        <View style={tw`ml-5`}>
          <Text style={tw`font-semibold text-lg`}>{car.Make}</Text>
          <Text style={tw`text-lg text-gray-700`}>model: {car.Model}</Text>
        </View>

        {isDisabled && <Text style={tw`text-green-700 font-semibold text-xs ml-auto`}>plan is active</Text>}
      </View>
    )
}

export default CarItem