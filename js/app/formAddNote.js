import { fieldElements } from '../utils/elementFunctions.js';
import { crumbsBackward } from '../components/breadcrumb.js';
import { section } from './section.js';
import Note from '../models/Note.js';
import Valid from '../models/Valid.js';
import { inputFeedback } from './form.js';

const inputs = {
	'note-name': nameInput,
	'note-text': textInput
}

export default {
	form: addNoteForm,
	inputs
};

function addNoteForm(form, event) {
	const nameField = fieldElements('note-name', form);
	return inputFeedback(
		Valid.all(
			Object.keys(inputs).map(inputName => {
				return inputs[inputName](fieldElements(inputName, form));
			})
		),
		nameField
	).yes(() => {
		section.recipient.createContent(
			nameField.input.value,
			fieldElements('note-text', form).input.value
		);
		crumbsBackward(1);
		event.preventDefault();
	});
}

function nameInput(field) {
	return inputFeedback(
		section.recipient.validCreateContent(field.input.value),
		field
	);
}

function textInput(field) {
	return Note.validText(field.input.value);
}

