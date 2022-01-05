import { fieldElements } from '../utils/elementFunctions.js';
import { crumbsBackward } from '../components/breadcrumb.js';
import { section, index } from './section.js';
import Valid from '../models/Valid.js';
import { inputFeedback } from './form.js';
import addNote from './formAddNote.js';

const inputs = {
	'note-name': nameInput,
	'note-text': addNote.inputs['note-text']
};

export default {
	form: editNoteForm,
	inputs
};

function editNoteForm(form, event) {
	const nameField = fieldElements('note-name', form);
	return inputFeedback(
		Valid.all(
			Object.keys(inputs).map(inputName => {
				return inputs[inputName](fieldElements(inputName, form));
			})
		),
		nameField
	).yes(() => {
		section.recipient.editContent(
			index,
			nameField.input.value,
			fieldElements('note-text', form).input.value
		);
		crumbsBackward(1);
		event.preventDefault();
	});
}

function nameInput(field) {
	return inputFeedback(
		section.recipient.validEditContent(index, field.input.value),
		field
	);
}
