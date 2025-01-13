import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';

// screenHome
import Home from "./src/components/home/Pages/Home";
import UserConf from "./src/components/user/User";
import CellNum from "./src/components/Registrer/CellNum";
import Login from "./src/components/login/Login";
import Code from "./src/components/Registrer/Code";
import Name from "./src/components/Registrer/Name";
import LastName from "./src/components/Registrer/LastName";
import LocationAdd from "./src/components/Location/LocationsAdd";
import LocSearch from "./src/components/Location/LocationsSearch";
import SearchProduct from "./src/components/home/Pages/SearchProduct";
import MapScreen from "./src/components/Location/MapPage";
import Unavaliable from "./src/components/user/ConfPages/unavailable";
import OrderHistorial from "./src/components/user/ConfPages/OrdersHistorial";
import DetailOrderState from "./src/components/home/Pages/DetailOrderState";
import DataFacturation from "./src/components/user/ConfPages/DataFacturation";
import PageLocation from "./src/components/Location/LocationsPage";
import Pay from "./src/components/home/Pages/PayOrder";
import Resume from "./src/components/home/Pages/resume";
import SuppliersPage from "./src/components/login/SupliersPage";
import Chat  from "./src/components/chat/chat";
import Cart from "./src/components/home/Pages/Cart";
import DataUser from "./src/components/user/ConfPages/DataUser";

const ColorComponents = "#76ABAE";

const Stack = createStackNavigator();

function RoutesNv() {
    return (
        <Stack.Navigator initialRouteName="Login"
            screenOptions={{ gestureEnabled: false }}


        >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, headerTitle: 'Atrás' }} />
            <Stack.Screen name="SelectSupplier" component={SuppliersPage} options={{ headerShown: false, headerTitle: 'Atrás' }} />
            <Stack.Screen name="ButonLog" component={HomeNv} options={{ headerShown: false, headerBackTitleVisible: false }} />
            <Stack.Screen name="Register" component={Regg} options={{ headerShown: false, headerBackTitleVisible: false }} />
            <Stack.Screen name="Search" component={LocSearch} options={{ headerShown: false, headerBackTitleVisible: false }} />

        </Stack.Navigator>
    );
}

function Regg() {
    return (
        <Stack.Navigator

        >
            <Stack.Screen name="Number" component={CellNum} options={{ headerTitle: ' ', headerTintColor: ColorComponents }} />
            <Stack.Screen name="Code" component={Code} options={{ headerTitle: ' ', headerTintColor: ColorComponents }} />
            <Stack.Screen name="Name" component={Name} options={{ headerTitle: ' ', headerTintColor: ColorComponents }} />
            <Stack.Screen name="LastN" component={LastName} options={{ headerTitle: ' ', headerTintColor: ColorComponents }} />
            <Stack.Screen name="HomeNav" component={HomeNv} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
  
// navigator from home layout


function HomeNv() {
    return (
        <Stack.Navigator initialRouteName="Home"
        >
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='User' component={Accnv} options={{ headerShown: false , gestureEnabled: false }} />
            <Stack.Screen name='Cart' component={Cart} options={{ headerShown: false}} />
            <Stack.Screen name='Pay' component={Pay} options={{ headerShown: false}} />
            <Stack.Screen name='Resume' component={Resume} options={{ headerShown: false}} />
            <Stack.Screen name='SearchBar' component={SearchProduct} options={{ headerTintColor: ColorComponents, headerBackTitleVisible: false, headerTitle: ' ' }} />
            <Stack.Screen name='DetailOrder' component={DetailOrderState} options={{ headerShown: false}} />
            <Stack.Screen name='ChangeLoc' component={LocNv} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

// navigator from Acc layout
function Accnv() {
    return (
        <Stack.Navigator initialRouteName='UserConf' >
            <Stack.Screen name='UserConf' component={UserConf} options={{ headerShown: false }} />
            <Stack.Screen name="Looc" component={PageLocation} options={{ headerTintColor: ColorComponents, headerBackTitleVisible: false, headerTitle: ' '}} />
            <Stack.Screen name="OrderList" component={OrderHistorial} options={{ headerShown: false  }} />
            <Stack.Screen name="unav" component={Unavaliable} options={{ headerTintColor: ColorComponents, headerBackTitleVisible: false, headerTitle: ' ' }} />
            <Stack.Screen name="DataFac" component={DataFacturation} options={{ headerShown: false }} />
            <Stack.Screen name="DataUser" component={DataUser} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

// navigator from Location layout
function LocNv() {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name='Maps' component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name='LocAdd' component={LocationAdd} options={{ headerShown: false }} />
            <Stack.Screen name='Search' component={LocSearch} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function Navigations() {
    return (
        <NavigationContainer>
            <RoutesNv />
        </NavigationContainer>
    );
}
