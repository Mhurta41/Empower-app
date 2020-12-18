import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/Header';
import {
	Image,
	TouchableHighlight,
	StyleSheet,
	Text,
	View,
	Button,
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

	const handleClick = () => {
		return {};
	};

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
				// tasks = { {task1}, {task2}, ...}
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

	//delete this when you're done
	const clearStorage = () => {
		AsyncStorage.clear();
		setTasks({});
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

	//delete this when you're done
	const renderClearButton = () => {
		return <Button title='delete storage' onPress={clearStorage} />;
	};

	const renderTasks = () => {
		const renderedTasks = [];
		for (const taskId in tasks) {
			renderedTasks.push(renderTask(taskId));
		}
		return <View>{renderedTasks}</View>;
	};

	return (
		<View>
			<Header />
			{renderTasks()}
			{addTaskButton()}
			{renderClearButton()}
		</View>
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
		width: 50,
		height: 50,
		alignSelf: 'center',
	},
});

export default WelcomeScreen;
