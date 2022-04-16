import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import PlanCard from "../components/PlanCard";

function Plans() {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-grow justify-center px-5`}>
      <Text style={tw`mb-5 text-xl font-semibold`}>Subscribe to a Plan</Text>
      <PlanCard
        image={require("../assets/icons/maintain.png")}
        description={
          "Sign up and get your car in tip top shape while making savings."
        }
        title={"Maintenance plan"}
        subscribe={() => navigation.navigate("MaintenancePlan")}
      />
      <PlanCard
        image={require("../assets/icons/membership.png")}
        description={
          "Get exclusive benefits like discounts on all requests and plans, priority response and much more."
        }
        title={"Membership plan"}
        subscribe={() => navigation.navigate("MembershipPlan")}
      />
      <PlanCard
        image={require("../assets/icons/insurance.png")}
        description={
          "Insure your vehicle today and pay either weekly, monthly or yearly."
        }
        title={"Insurance plan"}
        subscribe={() => navigation.navigate("InsurancePlan")}
      />
      <PlanCard
        image={require("../assets/icons/healthplan.png")}
        description={
          "Get your vehicle inspected and diagnosed and get a detailed health report highlighting recommended actions to keep your car in the best possible shape"
        }
        title={"Vehicle health plan"}
        subscribe={() => navigation.navigate("VehicleHealthPlan")}
      />
    </View>
  );
}

export default Plans;
