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
		console.log('using effect');
		if (isFocused) {
			readData();
		}
	}, [isFocused]);

	const handleClick = () => {
		return {};
	};

	const addTaskButton = () => {
		return (
			<TouchableHighlight
				onPress={() => props.navigation.navigate('NewTaskScreen')}>
				<Image
					style={styles.addButton}
					source={require('../Images/empower-add.png')}
				/>
			</TouchableHighlight>
		);
	};
	const readData = async () => {
		console.log('data is being read');
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

	const renderTask = (taskId) => {
		const task = tasks[taskId];
		console.log(task);
		let categoryValue = task['category'];
		let taskValue = task['taskName'];
		return (
			<View style={styles.item}>
				<Text style={styles.taskText}>
					{categoryValue}: {taskValue}
				</Text>
				<TouchableHighlight onPress={() => editTask(taskId)}>
					<Image
						style={styles.taskButtons}
						source={require('../Images/empower-edit.png')}
					/>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => deleteTask(taskId)}>
					<Image
						style={styles.taskButtons}
						source={require('../Images/empower-delete.png')}
					/>
				</TouchableHighlight>
			</View>
		);
	};

	const renderTasks = () => {
		const renderedTasks = [];
		console.log('tasks', tasks);
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
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 16,
		marginTop: 16,
		borderColor: '#14b274',
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 10,
		width: 400,
		alignItems: 'center',
		alignSelf: 'center',
	},
	taskText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#14b274',
	},
	taskButtons: {
		width: 20,
		height: 20,
	},
	addButton: {
		width: 50,
		height: 50,
		alignSelf: 'center',
	},
});

export default WelcomeScreen;
