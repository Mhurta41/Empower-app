import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
	View,
	Text,
	Button,
	TextInput,
	AsyncStorage,
	Alert,
} from 'react-native';
import { TASKS_KEY } from '../storageKeys';

const MAX_ID_NUMBER = 1000000;

function NewTaskScreen(props) {
	const [category, setCategory] = useState('');
	const [taskName, setTaskName] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [reminder, setReminder] = useState('');
	const [givenTaskId, setGivenTaskId] = useState(undefined);

	useEffect(() => {
		const taskId = props.route.params?.taskId;
		const task = props.route.params?.task;
		setGivenTaskId(taskId);
		if (task) {
			setCategory(task['category']);
			setTaskName(task['taskName']);
			setDueDate(task['dueDate']);
			setReminder(task['reminder']);
		}
	}, []);

	const saveData = async () => {
		try {
			const myTask = { category, taskName, dueDate, reminder };
			const readCurrentTasksAsString = await AsyncStorage.getItem(TASKS_KEY);
			const readCurrentTasks = JSON.parse(readCurrentTasksAsString);

			let taskId = Math.floor(Math.random() * MAX_ID_NUMBER).toString();

			console.log(TASKS_KEY);
			if (readCurrentTasks == null) {
				const myTasksObject = {};
				myTasksObject[taskId] = myTask;
				const stringifiedObject = JSON.stringify(myTasksObject);
				await AsyncStorage.setItem(TASKS_KEY, stringifiedObject);
			} else {
				// While the taskId is taken, we generate a new one
				while (readCurrentTasks[taskId] !== undefined) {
					console.log(taskId);
					taskId = Math.floor(Math.random() * MAX_ID_NUMBER).toString();
				}
				if (givenTaskId) {
					readCurrentTasks[givenTaskId] = myTask;
				} else {
					readCurrentTasks[taskId] = myTask;
				}
				const stringifiedReadObject = JSON.stringify(readCurrentTasks);
				await AsyncStorage.setItem(TASKS_KEY, stringifiedReadObject);
			}
		} catch (e) {
			console.log('Failed to fetch tasks array from storage', e);
		} finally {
			props.navigation.goBack();
		}
	};

	const renderSubmitButton = () => {
		return (
			<Button
				title='Submit'
				onPress={() => {
					saveData();
				}}
			/>
		);
	};

	const renderForm = () => {
		return (
			<View>
				<Text>Category:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newCategory) => setCategory(newCategory)}
					value={category}
				/>
				<Text>Task:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newTask) => setTaskName(newTask)}
					value={taskName}
				/>
				<Text>Due Date:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newDueDate) => setDueDate(newDueDate)}
					value={dueDate}
				/>
				<Text>Reminder Frequency:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newReminder) => setReminder(newReminder)}
					value={reminder}
				/>
			</View>
		);
	};
	return (
		<View>
			<Header />
			{renderForm()}
			{renderSubmitButton()}
		</View>
	);
}

export default NewTaskScreen;
