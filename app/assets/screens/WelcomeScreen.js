import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';


import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableHighlight,
	AsyncStorage,
} from 'react-native';
import { TASKS_KEY } from '../storageKeys';

function WelcomeScreen(props) {
	const [tasks, setTasks] = useState([]);
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
			}
		} catch (e) {
			console.log('Failed to fetch tasks from storage', e);
		}
	};

	const renderTask = (task) => {
		console.log(task);
		let categoryValue = task['category'];
		let taskValue = task['task'];
		return (
			<Text>
				{categoryValue}: {taskValue}
			</Text>
		);
	};

	const renderTasks = () => {
		const renderedTasks = [];
		for (const task of tasks) {
			renderedTasks.push(renderTask(task));
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
	test: {
		backgroundColor: 'pink',
	},
});

export default WelcomeScreen;
