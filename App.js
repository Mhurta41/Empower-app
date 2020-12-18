import * as React from 'react';
import 'react-native-gesture-handler';
import WelcomeScreen from './app/assets/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewTaskScreen from './app/assets/screens/NewTaskScreen';
import { StyleSheet, View } from 'react-native';

export default function App() {
	const renderBody = () => {
		return (
			<View>
				<WelcomeScreen style={styles.container} />;
			</View>
		);
	};
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName='WelcomeScreen'>
				<Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
				<Stack.Screen name='NewTaskScreen' component={NewTaskScreen} />
			</Stack.Navigator>
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
