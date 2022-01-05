import { fieldElements } from '../utils/elementFunctions.js';
import { students } from './students.js';
import { inputFeedback } from './form.js';

export default {
	form: loginForm,
	inputs: {
		'email': emailInput,
		'password': passwordInput
	}
};

function loginForm(form, event) {
	const emailField = fieldElements('email', form);
	const passwordField = fieldElements('password', form);
	return students.validLogin(
		emailField.input.value,
		passwordField.input.value
	)
		.yes(() => {
			window.location.href = form.action;
			return false;
		})
		.no(reason => {
			emailField.error.textContent = reason;
			emailField.input.setCustomValidity(reason);
			emailField.input.reportValidity();
			return reason;
		});
}

function emailInput(field) {
	return inputFeedback(
		students.validEmailLogin(field.input.value),
		field
	);
}

function passwordInput(field) {
	return inputFeedback(
		students.validPasswordLogin(field.input.value),
		field
	);
}
