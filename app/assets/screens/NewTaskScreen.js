import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Dropdown } from 'react-native-material-dropdown';
import {
	View,
	Text,
	Button,
	TextInput,
	AsyncStorage,
	Alert,
} from 'react-native';
import { TASKS_KEY } from '../storageKeys';

function NewTaskScreen(props) {
	const [category, setCategory] = useState('');
	const [task, setTask] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [reminder, setReminder] = useState('');

	const saveData = async () => {
		try {
			const myTask = { category, task, dueDate, reminder };
			const readCurrentTasksAsString = await AsyncStorage.getItem(TASKS_KEY);
			const readCurrentTasks = JSON.parse(readCurrentTasksAsString);
			console.log(TASKS_KEY);
			if (readCurrentTasks == null) {
				const myTasksArray = [];
				myTasksArray.push(myTask);
				const stringifiedArray = JSON.stringify(myTasksArray);
				await AsyncStorage.setItem(TASKS_KEY, stringifiedArray);
			} else {
				readCurrentTasks.push(myTask);
				const stringifiedReadArray = JSON.stringify(readCurrentTasks);
				await AsyncStorage.setItem(TASKS_KEY, stringifiedReadArray);
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
				/>
				<Text>Task:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newTask) => setTask(newTask)}
				/>
				<Text>Due Date:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newDueDate) => setDueDate(newDueDate)}
				/>
				<Text>Reminder Frequency:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(newReminder) => setReminder(newReminder)}
				/>
			</View>
		);
	};
	return (
		<View>
			{renderForm()}
			{renderSubmitButton()}
		</View>
	);
}

export default NewTaskScreen;
