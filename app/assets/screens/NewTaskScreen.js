import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Dropdown } from 'react-native-material-dropdown';
import {
	View,
	Text,
	Button,
	TextInput,
	AsyncStorage,
	StyleSheet,
	TouchableHighlight,
	Image,
} from 'react-native';
import { TASKS_KEY } from '../storageKeys';

const MAX_ID_NUMBER = 1000000;

function NewTaskScreen(props) {
	const [category, setCategory] = useState('');
	const [taskName, setTaskName] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [reminder, setReminder] = useState('');
	const [givenTaskId, setGivenTaskId] = useState(undefined);

	let categoryData = [
		{
			value: 'Work',
		},
		{
			value: 'Social',
		},
		{
			value: 'School',
		},
		{
			value: 'Important',
		},
		{
			value: 'Miscellaneous',
		},
	];

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
			<TouchableHighlight
				onPress={() => {
					saveData();
				}}>
				<Image
					style={styles.submitButton}
					source={require('../Images/empower-submit.png')}
				/>
			</TouchableHighlight>
		);
	};

	const renderForm = () => {
		return (
			<View>
				<Dropdown
					onChangeText={(newCategory) => setCategory(newCategory)}
					style={styles.dropdown}
					label='Select a category'
					data={categoryData}
					value={category}
				/>
				<Text style={styles.formText}>Task:</Text>
				<TextInput
					style={styles.formField}
					onChangeText={(newTask) => setTaskName(newTask)}
					value={taskName}
				/>
				<Text style={styles.formText}>Due Date:</Text>
				<TextInput
					style={styles.formField}
					onChangeText={(newDueDate) => setDueDate(newDueDate)}
					value={dueDate}
				/>
				<Text style={styles.formText}>Reminder Frequency:</Text>
				<TextInput
					style={styles.formField}
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

const styles = StyleSheet.create({
	formField: {
		height: 40,
		borderColor: '#14b274',
		borderWidth: 1,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 10,
		width: 400,
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 10,
	},
	formText: {
		fontWeight: 'bold',
		marginLeft: 20,
		marginBottom: 10,
	},
	dropdown: {
		marginLeft: 20,
		fontWeight: 'bold',
		color: '#14b274',
	},
	submitButton: {
		width: 150,
		height: 40,
		alignSelf: 'center',
		marginTop: 30,
	},
});
export default NewTaskScreen;
