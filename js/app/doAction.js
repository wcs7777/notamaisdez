import { changeSection, changeToEditor, content } from './section.js';
import { modalEdit, modalDetails, modalRemove } from '../templates/modal.js';

export default function doAction(action) {
	return {
		'open': () => changeSection(content),
		'open-note': () => changeToEditor(content, false),
		'edit': () => modalEdit(content.name),
		'edit-note': () => changeToEditor(content, true),
		'details': () => modalDetails(content.details()),
		'remove': () => modalRemove(content.name)
	}[action]();
}
