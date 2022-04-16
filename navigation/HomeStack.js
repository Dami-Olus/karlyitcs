import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Diagnostic from '../screens/Diagnostic';
import Quotation from '../screens/Quotation';
import Basket from '../screens/Basket';
import Maintenance from '../screens/Maintenance';
import Inspection from '../screens/Inspection';
import Repairs from '../screens/Repairs';
import CarRegisteration from '../screens/CarRegisteration';
import CarMakes from '../screens/CarMakes';
import CarModels from '../screens/CarModels';
import Scan from '../screens/Scan';
import Checkout from '../screens/Checkout';
import Plans from '../screens/Plans';
import MaintenancePlan from '../screens/Plans/MaintenancePlan';
import MembershipPlan from '../screens/Plans/MembershipPlan';
import InsurancePlan from '../screens/Plans/InsurancePlan';
import VehicleHealthPlan from '../screens/Plans/VehicleHealthPlan';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import PlanDetails from '../screens/PlanDetails';
import Shop from '../screens/Shop';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
   
    <Stack.Navigator headerMode='none' screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Diagnostic" component={Diagnostic} />
            <Stack.Screen name="Quotation" component={Quotation} />
            <Stack.Screen name="Basket" component={Basket} />
            <Stack.Screen name="Maintenance" component={Maintenance} />
            <Stack.Screen name="Inspection" component={Inspection} />
            <Stack.Screen name="Repairs" component={Repairs} />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen name="CarMake" component={CarMakes} />
            <Stack.Screen name="CarModel" component={CarModels} />
            <Stack.Screen name="CarRegisteration" component={CarRegisteration} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Plans" component={Plans} />
            <Stack.Screen name="MaintenancePlan" component={MaintenancePlan} />
            <Stack.Screen name="MembershipPlan" component={MembershipPlan} />
            <Stack.Screen name="InsurancePlan" component={InsurancePlan} />
            <Stack.Screen name="VehicleHealthPlan" component={VehicleHealthPlan} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="PlanDetails" component={PlanDetails} />
            <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
   
  );
}