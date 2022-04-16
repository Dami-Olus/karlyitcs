import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { Wave } from 'react-native-animated-spinkit'
import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import tw from "tailwind-react-native-classnames";

const auth = Firebase.auth();

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [ loading, setloading ] = useState(false)

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    setloading(true)

    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }else {
        setLoginError("please enter all the fields")
      }
    } catch (error) {
      setLoginError(error.message);
    }

    setloading(false)
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Login</Text>
      <InputField
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      
      {
        loading ?
        <View style={tw`w-full items-center`}>
          <Wave size={30} color="gray" />
        </View>  

        :

        <Button
          onPress={onLogin}
          title='Login'
          containerStyle={styles.login}
        />
      }
      
      <RNButton
        onPress={() => navigation.navigate('Register')}
        title='Go to Signup'
        color='#2bced6'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
    paddingBottom: 24
  },

  inputContainer: {
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2bced6'
  },

  input: {
    fontSize: 24
  }, 

  login: {
    marginBottom: 24,
    backgroundColor: '#2bced6',
    color: '#fff',
    fontSize: 20
  }
});