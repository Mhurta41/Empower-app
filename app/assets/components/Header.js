import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Header(props) {
	console.log('my props;', props);
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>Empower</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	headerContainer: {
		height: 80,
		paddingTop: 38,
		backgroundColor: 'green',
	},
	headerText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default Header;
// '#14b274';
