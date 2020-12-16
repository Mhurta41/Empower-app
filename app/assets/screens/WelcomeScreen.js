import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
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
			<Button
				title='Add Task'
				onPress={() => props.navigation.navigate('NewTaskScreen')}
			/>
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
			<TouchableOpacity style={styles.item}>
				<Text>
					{categoryValue}: {taskValue}
				</Text>
				<Button title='delete' onPress={() => deleteTask(taskId)} />
				<Button title='edit' onPress={() => editTask(taskId)} />
			</TouchableOpacity>
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
			{renderTasks()}
			{addTaskButton()}
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 16,
		marginTop: 16,
		borderColor: '#bbb',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 10,
	},
});

export default WelcomeScreen;
