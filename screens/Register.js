import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";
import { Wave } from 'react-native-animated-spinkit'
import tw from "tailwind-react-native-classnames";

const { uuid } = require('uuidv4');

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";

const auth = Firebase.auth();
const firestore = Firebase.firestore();

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");
  const [users, setUsers] = useState("");
  const [ loading, setloading ] = useState(false)

  useEffect(() => {
    const subscriber = firestore
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        
        setUsers(users);
        // setLoading(false);
      });
  },[]);


  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      setloading(true)
      if (email !== "" && password !== "" && name !== "") {
        await auth.createUserWithEmailAndPassword(email, password)
              .then((response) => {
            
              const uid = response.user.uid;
              const data = {
                name: name,
                email: email,
                uid: uid,
                id: users.length + 1
                
              };

              const userRef = firestore.collection("users");
              userRef.doc(uid).set(data);
              console.log(response);
              console.log(email);
              console.log(name);
              console.log(uid);
          });
      }else {
        setSignupError("Please enter all the fields")
      }
    } catch (error) {
      setSignupError(error.message);
    }

    return setloading(false)
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Create new account</Text>
      
      <InputField
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        leftIcon="account"
        placeholder="Enter Fullname"
        autoCapitalize="words"
        onChangeText={(text) => setName(text)}
      />

      <InputField
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}

        leftIcon="email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      
      <InputField
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        leftIcon="lock"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      
      {
        loading ? 
        <View style={tw`w-full items-center`}>
          <Wave size={30} color="gray" />
        </View>  

        :

        <Button
          onPress={onHandleSignup}
          backgroundColor="#2bced6"
          title="Signup"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 24,
          }}
        />
      }
      
      <RNButton
        onPress={() => navigation.navigate("Login")}
        title="Go to Login"
        color="#2bced6"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    alignSelf: "center",
    paddingBottom: 24,
  },

  inputContainer: {
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2bced6'
  },

  input: {
    fontSize: 16
  }, 

});
