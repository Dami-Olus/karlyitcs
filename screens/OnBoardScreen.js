import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'

const OnBoardScreen = () => {

const screen_data = [
    {
      id: 1,
      source: require('../assets/OnBoardIcons/connect-your-car.png'),
      title: 'Keep Your Cars(s) in good shape',
      info: 'Request services on demand through app',  
    },

    {
        id: 2,
        source: require('../assets/OnBoardIcons/maintain-your-car.png'),
        title: 'Subscribe to a plan',
        info: 'Subscribe to one of our plans and never have to worry about your car again'  
    },

    {
        id: 3,
        source: require('../assets/OnBoardIcons/monitor-your-car.png'),
        title: 'Transparent Transactions',
        info: 'Have a clear understanding of the health of your car, repairs, cost and delivery'  
    },

    {
        source: require('../assets/OnBoardIcons/connect-your-car.png'),
        title: '',
        info: '',
        id: 4  
    }
]
  
    const [value, setvalue] = useState(screen_data[0])   
    const navigation = useNavigation()

    const handleNext = () => {
        const current_screen = screen_data.find(item => item.id === value.id+1)
        setvalue(current_screen)
    }

    return(
    <View style={tw`bg-white flex-grow items-center justify-center`}>
            <View style={tw`items-center px-5`}>
                <Image source={value.source} />
                
                <View style={tw`mt-7 items-center mb-7`}>
                    <Text style={tw`text-xl font-semibold`}>{value.title}</Text>
                    <Text style={tw`text-gray-400 font-medium text-center text-lg`}>{value.info}</Text>
                </View>

                {
                    value.id === 4 ? 
                    <View style={tw`items-center`}>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[tw`w-64 px-8 py-2 rounded-lg my-3`, styles.pryColor]}>
                            <Text style={tw`text-lg text-center text-gray-700`}>Sign up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={[tw`w-64 px-8 border-2 py-2 rounded-lg`, { borderColor: '#2bced6' }]}>
                            <Text style={[ tw`text-lg text-center font-semibold`, { color: '#2bced6' } ]}>Login</Text>
                        </TouchableOpacity>
                    </View>    

                    :

                    <TouchableOpacity onPress={() => handleNext()}>
                        <Text style={[tw`font-bold text-lg` , { color: '#2bced6' }]}>Next</Text>
                    </TouchableOpacity>
                }
            </View> 
    </View>)
}
export default OnBoardScreen;

const styles = StyleSheet.create({
    pryColor: {
        backgroundColor: '#2bced6',
    }
})