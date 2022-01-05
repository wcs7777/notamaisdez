import { fieldElements } from '../utils/elementFunctions.js';
import { students } from './students.js';
import { inputFeedback } from './form.js';

export default {
	form: recoveryPasswordForm,
	inputs: { 'email': emailInput }
};

function recoveryPasswordForm(form, event) {
	return emailInput(fieldElements('email', form)).yes(() => {
		window.location.href = form.action;
		return false;
	});
}

function emailInput(field) {
	return inputFeedback(
		students.validEmailRecoveryPassword(field.input.value),
		field
	);
}
