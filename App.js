import * as React from 'react';
import 'react-native-gesture-handler';
import WelcomeScreen from './app/assets/screens/WelcomeScreen';
import Header from './app/assets/components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewTaskScreen from './app/assets/screens/NewTaskScreen';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	useEffect,
	AsyncStorage,
} from 'react-native';

export default function App() {
	// const renderHeader = () => {
	// 	return (
	// 		<View style={styles.header}>
	// 			<Header />
	// 		</View>
	// 	);
	// };

	const renderBody = () => {
		return (
			<View>
				<WelcomeScreen style={styles.container} />;
			</View>
		);
		//return <NewTaskScreen />;
	};

	const pressHandler = (key) => {};
	const Stack = createStackNavigator();
	AsyncStorage.clear();
	return (
		<NavigationContainer>
			{/* <SafeAreaView> */}
			<Stack.Navigator initialRouteName='WelcomeScreen'>
				<Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
				<Stack.Screen name='NewTaskScreen' component={NewTaskScreen} />
			</Stack.Navigator>
			{/* </SafeAreaView> */}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		justifyContent: 'center',
	},
});

// import Alert api, use .prompt to ask question that needs response but not on android, safeareaview only for ios so use import platform and statusbar
