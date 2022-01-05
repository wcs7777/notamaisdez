import { fieldElements } from '../utils/elementFunctions.js';
import { students } from './students.js';
import Student from '../models/Student.js';
import Valid from '../models/Valid.js';
import { inputFeedback } from './form.js';

const inputs = {
	'email': emailInput,
	'password': passwordInput,
	'confirm-password': confirmPasswordInput
};

export default {
	form: registerForm,
	inputs
};

let password = '';

function registerForm(form, event) {
	return Valid.all(
		Object.keys(inputs).map(inputName => {
			return inputs[inputName](fieldElements(inputName, form));
		})
	).yes(() => {
		students.register(
			fieldElements('email', form).input.value,
			fieldElements('password', form).input.value
		);
		window.location.href = form.action;
		return false;
	});
}

function emailInput(field) {
	return inputFeedback(
		students.validNewEmail(field.input.value),
		field
	);
}

function passwordInput(field) {
	password = field.input.value;
	return inputFeedback(
		Student.validNewPassword(password),
		field
	);
}

function confirmPasswordInput(field) {
	return inputFeedback(
		Student.validConfirmPassword(password, field.input.value),
		field
	);
}
