import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Header(props) {
	console.log('my props;', props);
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>Title!</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: 'blue',
	},
	headerText: {
		color: 'red',
	},
});

export default Header;
