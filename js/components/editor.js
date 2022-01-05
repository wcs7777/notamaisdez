import { first, fieldElements } from '../utils/elementFunctions.js';

export {
	openEditor, toggleEditor, editorIsVisible, editorIsForm, editorContainer
};

const editorContainer = first('editor-container="true"');
const editor = first('editor="true"');
const field = fieldElements('note-name', editorContainer);
const fontSize = 2 + parseInt(
	window.getComputedStyle(editor, null).getPropertyValue('font-size')
);
const minRows = parseInt(editor.dataset.minRows);

function openEditor(section, editable) {
	if (editable) {
		editorContainer.dataset.formType = (section.name === '')?
			'add-note' :
			'edit-note';
		editor.removeAttribute('readonly');
		field.input.removeAttribute('readonly');
	} else {
		editorContainer.removeAttribute('data-form-type');
		editor.setAttribute('readonly', 'true');
		field.input.setAttribute('readonly', 'true');
	}
	toggleEditor(true);
	field.input.value = section.name;
	editor.value = section.contents;
	editor.style.overflow = 'show';
	expand();
	editor.style.overflow = 'hidden';
}

function toggleEditor(show=true) {
	if (show && !editorIsVisible()) {
		editorContainer.classList.remove('hidden');
	} else if (!show && editorIsVisible()) {
		editorContainer.classList.add('hidden');
	}
}

function editorIsVisible() {
	return !editorContainer.classList.contains('hidden');
}

function editorIsForm() {
	return editorContainer.hasAttribute('data-form-type');
}

function expand() {
	editor.rows = minRows;
	const rows = Math.ceil(
		(editor.scrollHeight - editor._baseScrollHeight) / fontSize
	);
	editor.rows = minRows + rows;
}

(function editorScript() {
	const value = editor.value;
	editor.value = '';
	toggleEditor(true);
	editor._baseScrollHeight = editor.scrollHeight;
	toggleEditor(false);
	editor.value = value;
	editor.addEventListener('input', expand);
})();
