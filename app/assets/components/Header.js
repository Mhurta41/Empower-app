import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

function Header(props) {
	return (
		<SafeAreaView>
			<View style={styles.headerContainer}>
				<Image
					style={{ width: 70, height: 30 }}
					source={require('../Images/empower ADHD app.png')}
				/>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 80,
		paddingTop: 38,
		marginBottom: 20,
		backgroundColor: '#14b274',
	},
});

export default Header;
