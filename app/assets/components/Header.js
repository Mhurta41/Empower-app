import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

function Header() {
	return (
		<SafeAreaView>
			<View style={styles.headerContainer}>
				<Image
					style={{ width: 250, height: 35 }}
					source={require('../Images/empower.png')}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		height: 80,
		paddingTop: 25,
		paddingBottom: 50,
		marginBottom: 20,
		backgroundColor: '#14b274',
	},
});

export default Header;
