import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements';
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy = () => {
    const [checked, setChecked] = useState(false)
    const navigation = useNavigation()

    const terms_data = ['We’re constantly developing new technologies and features to improve our services. For example, we use artificial intelligence and machine learning to provide you with simultaneous translations, and to better detect and block spam and malware. As part of this continual improvement, we sometimes add or remove features and functionalities, increase or decrease limits to our services, and start offering new services or stop offering old ones. When a service requires or includes downloadable software, that software sometimes updates automatically on your device once a new version or feature is available. Some services let you adjust your automatic update settings.'
    ,'If we make material changes that negatively impact your use of our services or if we stop offering a service, we’ll provide you with reasonable advance notice, except in urgent situations such as preventing abuse, responding to legal requirements, or addressing security and operability issues. We’ll also provide you with an opportunity to export your content from your Google Account using Google Takeout, subject to applicable law and policies.']     
  
    const privacy_data = ['We collect information about the apps, browsers, and devices you use to access Google services, which helps us provide features like automatic product updates and dimming your screen if your battery runs low.', 'The information we collect includes unique identifiers, browser type and settings, device type and settings, operating system, mobile network information including carrier name and phone number, and application version number. We also collect information about the interaction of your apps, browsers, and devices with our services, including IP address, crash reports, system activity, and the date, time, and referrer URL of your request.',
    
    'We collect this information when a Google service on your device contacts our servers — for example, when you install an app from the Play Store or when a service checks for automatic updates. If you’re using an Android device with Google apps, your device periodically contacts Google servers to provide information about your device and connection to our services. This information includes things like your device type and carrier name, crash reports, which apps you\'ve installed, and, depending on your device settings, other information about how youre using your Android device.']

 return (
    
    <ScrollView style={tw`pt-10 px-5 mb-10`}>
      <Text style={styles.Title}>Privacy Policy</Text>
      <View>
          {
             privacy_data.map((item, index) => (
                <Text style={tw`mb-3`} key={index}>{item}</Text>
            )) 
          }
      </View>

      <Text style={styles.Title}>Terms and Conditions</Text>
      
      <View>
          {
             terms_data.map((item, index) => (
                <Text key={index}>{item}</Text>
             )) 
          }
      </View>

      <View style={tw`flex-row items-center mr-20 mt-10`}>
        <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked}
            onPress={() => setChecked(!checked)}
        />
        <Text style={tw`text-blue-500 font-semibold`}>By clicking this checkbox you agree to all the terms and Conditions</Text>
      </View>

        <TouchableOpacity 
            disabled={checked ? false : true} 
            style={tw`mb-20 ${checked ? 'bg-blue-500' : 'bg-gray-300'} rounded-lg text-white p-3 text-center`}
            onPress={() => navigation.goBack()}
        >
          <Text style={tw`${checked ? 'text-white' : 'text-black' } text-center`}>Accept Terms and Conditions</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    Title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 10,
    }
})