import { fieldElements } from '../utils/elementFunctions.js';
import { closeModal } from '../components/modal.js';
import { addCard } from '../templates/card.js';
import { section } from './section.js';
import { inputFeedback } from './form.js';

export default {
	form: addForm,
	inputs: { 'name': nameInput }
};

function addForm(form, event) {
	const field = fieldElements('name', form);
	return nameInput(field).yes(() => {
		addCard(section.createContent(field.input.value));
		closeModal();
		return 'added';
	});
}

function nameInput(field) {
	return inputFeedback(
		section.validCreateContent(field.input.value),
		field
	);
}
