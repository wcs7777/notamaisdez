import { fieldElements } from '../utils/elementFunctions.js';
import { closeModal } from '../components/modal.js';
import { renameCard } from '../templates/card.js';
import { section, index } from './section.js';
import { inputFeedback } from './form.js';

export default {
	form: editForm,
	inputs: { 'new-name': newNameInput }
};

function editForm(form, event) {
	const field = fieldElements('new-name', form);
	return newNameInput(field).yes(() => {
		const newName = field.input.value;
		section.editContent(index, newName);
		renameCard(index, newName);
		closeModal();
		return 'edited';
	});
}

function newNameInput(field) {
	return inputFeedback(
		section.validEditContent(index, field.input.value),
		field
	);
}
