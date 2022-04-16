import React, { useContext, useEffect, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { useNavigation } from "@react-navigation/native";
import Firebase from "../config/firebase";

import { useDispatch, useSelector } from "react-redux";
import { selectRequest } from "../slices/carSlice";

const firestore = Firebase.firestore();

const DiagnosticCard = ({ system, issue }) => {
  const request = useSelector(selectRequest);

  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const [display, setDisplay] = useState("none");
  const [report, setReport] = useState();

  const toggle = () => {
    setExpanded(!expanded);
    if (display == "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };

  const diagItem = [
    {
      system: "Interior",
      components: [
        {
          name: "Dashboard/Fittings",
          status: "Passed",
        },
        {
          name: "Door fittings rim",
          status: "Passed",
        },
        {
          name: "Seat upholstery",
          status: "Passed",
        },
        {
          name: "Roof upholstery",
          status: "Passed",
        },
        {
          name: "Arm or headrest upholstery",
          status: "Passed",
        },
      ],
    },
    {
      system: "Exterior",
      components: [
        {
          name: "Door frt lh",
          status: "Passed",
        },
        {
          name: "Fender frt lh",
          status: "Passed",
        },
        {
          name: "Bonnet",
          status: "Passed",
        },
        {
          name: "Front windshield",
          status: "Passed",
        },
        {
          name: "Bumper front",
          status: "Passed",
        },
      ],
    },
  ];

  useEffect(() => {
    const subscriber = firestore
      .collection("Report")
      .onSnapshot((querySnapshot) => {
        const report = [];

        querySnapshot.forEach((documentSnapshot) => {
          report.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        // console.log(requests);
        setReport(report);
        // setLoading(false);
      });
  }, []);

  // console.log(report);

  return (
    <View style={tw`bg-white mx-4  mb-2 p-2 justify-center shadow-2xl`}>
      <View style={tw`flex-row justify-between`}>
        {/* <Icon name="gas-pump" type="font-awesome-5" /> */}
        <Text>{system}</Text>
        <Text>{issue}</Text>
        <Icon name="sort-down" type="font-awesome" onPress={toggle} />
      </View>
      <View style={{ display: display }}>
        <CollapsibleView
          noArrow={true}
          expanded={expanded}
          style={{ borderWidth: 0 }}
        >
          {/* {diagItem.map((diag) => {
            return (
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`mb-5`}>{diag.name}</Text>
                <Text>{diag.test.status}</Text>
              </View>
            );
          })} */}
          <Text>Brake pad</Text>
          <Text>steering rack</Text>
          <Text>clutch</Text>
        </CollapsibleView>
      </View>
    </View>
  );
};

export default DiagnosticCard;

const styles = StyleSheet.create({});
