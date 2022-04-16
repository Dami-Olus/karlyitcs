import React from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames'

function PlanCard({onPress, image, title, description, subscribe}) {
  return (
    <View style={tw`flex-row mb-10`}>
      <View
        style={tw` w-1/4 h-20 rounded-xl bg-white justify-center items-center`}
        onPress={onPress}
      >
        <Image source={image} />
        <Text style={tw`text-center`}>{title}</Text>
      </View>
      
      <View style={tw`mr-32 ml-5`}>
        <Text>
          {description}
        </Text>

        <TouchableOpacity style={[tw`border-0 rounded-3xl w-20 p-2 mt-5`, styles.pryColor]} onPress={subscribe}>
          <Text>Subscribe</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PlanCard

const styles = StyleSheet.create({
  pryColor: {
    backgroundColor: '#2bced6'
  }
})
