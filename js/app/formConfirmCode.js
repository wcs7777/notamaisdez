import { fieldElements } from '../utils/elementFunctions.js';
import { students } from './students.js';
import { inputFeedback } from './form.js';

export default {
	form: confirmCodeForm,
	inputs: { 'code': codeInput }
};

function confirmCodeForm(form, event) {
	return codeInput(fieldElements('code', form)).yes(() => {
		window.location.href = form.action;
		return false;
	});
}

function codeInput(field) {
	return inputFeedback(
		students.validConfirmCode(field.input.value),
		field
	);
}
