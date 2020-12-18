import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/Header';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';
import { TASKS_KEY } from '../storageKeys';

function WelcomeScreen(props) {
	const [tasks, setTasks] = useState({});
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			readData();
		}
	}, [isFocused]);

	const addTaskButton = () => {
		return (
			<TouchableOpacity
				onPress={() => props.navigation.navigate('NewTaskScreen')}>
				<Image
					style={styles.addButton}
					source={require('../Images/empower-add.png')}
				/>
			</TouchableOpacity>
		);
	};
	const readData = async () => {
		try {
			const readTasksAsString = await AsyncStorage.getItem(TASKS_KEY);
			const readTasks = JSON.parse(readTasksAsString);

			if (readTasks !== null) {
				setTasks(readTasks);
			}
		} catch (e) {
			console.log('Failed to fetch tasks from storage', e);
		}
	};
	const deleteTask = async (taskId) => {
		const tempTasks = { ...tasks };
		delete tempTasks[taskId];
		const stringifiedTasksObject = JSON.stringify(tempTasks);
		await AsyncStorage.setItem(TASKS_KEY, stringifiedTasksObject);
		setTasks(tempTasks);
	};

	const editTask = (taskId) => {
		const task = tasks[taskId];
		props.navigation.navigate('NewTaskScreen', { task, taskId });
	};

	const renderTask = (taskId) => {
		const task = tasks[taskId];
		let categoryValue = task['category'];
		let taskValue = task['taskName'];
		return (
			<View style={styles.item}>
				<Text style={styles.taskText}>
					{categoryValue}: {taskValue}
				</Text>
				<TouchableOpacity onPress={() => editTask(taskId)}>
					<Image
						style={styles.editButton}
						source={require('../Images/empower-edit.png')}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => deleteTask(taskId)}>
					<Image
						style={styles.deleteButton}
						source={require('../Images/empower-delete.png')}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	const renderTasks = () => {
		const renderedTasks = [];
		for (const taskId in tasks) {
			renderedTasks.push(renderTask(taskId));
		}
		if (renderedTasks.length === 0) {
			return (
				<Image
					style={styles.bigLogo}
					source={require('../Images/empower-main-logo.png')}
				/>
			);
		}
		return <View>{renderedTasks}</View>;
	};

	return (
		<ScrollView>
			<View>
				<Header />
				{renderTasks()}
				{addTaskButton()}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 25,
		marginTop: 16,
		borderColor: '#14b274',
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 10,
		width: 350,
		alignItems: 'center',
		alignSelf: 'center',
	},
	taskText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#14b274',
	},
	editButton: {
		width: 20,
		height: 20,
		marginLeft: 310,
		marginBottom: -15,
	},
	deleteButton: {
		width: 20,
		height: 20,
		marginTop: -45,
		marginLeft: 310,
	},
	addButton: {
		width: 60,
		height: 60,
		alignSelf: 'center',
		position: 'absolute',
		bottom: -150,
	},
	bigLogo: {
		alignSelf: 'center',
		width: 350,
		height: 400,
		marginTop: 100,
	},
});

export default WelcomeScreen;
