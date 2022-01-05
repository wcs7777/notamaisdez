import { fieldElements, first, all } from '../utils/elementFunctions.js';
import { addCards, cardsContainer } from '../templates/card.js';
import { openEditor } from '../components/editor.js';
import { template } from '../templates/templateContainer.js';
import addCrumb from '../templates/crumb.js';
import sectionType from '../models/infosType.js';
import Note from '../models/Note.js';

export {
	changeSection,
	changeToEditor,
	sectionBackward,
	changeContentIndex,
	section,
	content,
	index
};

const modalAdd = all('modal-role="body"', template).find(m => {
	return (m.dataset.modalType === 'add');
});
const nameField = fieldElements('name', modalAdd);
const menuOptionCreate = first(
	'modal-type="add"', first('menu-row-type="default"')
);
const menuRowCard = first('menu-row-type="card"');
const menuOptionOpen = first('card-option-action="open"', menuRowCard);
const menuOptionEdit = first('card-option-action="edit"', menuRowCard);

let section = undefined;
let content = undefined;
let index = -1;

function changeSection(newSection, backward=false) {
	section = newSection;
	addCards(section.contents);
	if (!backward) {
		addCrumb(section.name);
	}
	if (newSection.infos !== sectionType.lesson) {
		nameField.input.value = '';
		nameField.input.setCustomValidity('');
		nameField.input.reportValidity();
		nameField.input.setAttribute('placeholder',  section.contentName());
		nameField.label.textContent = section.contentName();
		nameField.error.textContent = '';
		changeOptions(false);
	} else {
		changeOptions(true);
	}
}

function changeToEditor(newSection, editable) {
	section = newSection;
	addCrumb(`${(editable)? 'Fazer' : 'Ver'} Anotação`);
	openEditor(section, editable);
}

function sectionBackward(steps) {
	let newSection = section;
	if (steps > 0) {
		for (let i = 0; i < steps; i++) {
			newSection = newSection.recipient;
		}
		changeSection(newSection, true);
	}
}

function changeContentIndex(newIndex) {
	if (newIndex > -1) {
		index = newIndex;
		content = section.contents[index];
	}
	return content;
}

function isModalTypeMenuOptionCreate() {
	return menuOptionCreate.hasAttribute('data-modal-type');
}

function changeOptions(lessonSection=false) {
	const cardCreate = first(
		'modal-type="add"',
		first('card="create"', cardsContainer)
	);
	menuOptionCreate.removeEventListener('click', openCreateNote);
	cardCreate.removeEventListener('click', openCreateNote);
	if (!lessonSection) {
		if (!isModalTypeMenuOptionCreate()) {
			menuOptionCreate.dataset.modalType = 'add';
			menuOptionCreate.dataset.modalRole = 'open';
			menuOptionOpen.dataset.cardOptionAction = 'open';
			menuOptionEdit.dataset.cardOptionAction = 'edit';
			menuOptionEdit.setAttribute('data-modal-type', 'edit');
			menuOptionEdit.setAttribute('data-modal-role', 'open');
		}
	} else {
		cardCreate.addEventListener('click', openCreateNote);
		cardCreate.removeAttribute('data-modal-type');
		cardCreate.removeAttribute('data-modal-role');
		menuOptionCreate.addEventListener('click', openCreateNote);
		menuOptionCreate.removeAttribute('data-modal-type');
		menuOptionCreate.removeAttribute('data-modal-role');
		menuOptionOpen.dataset.cardOptionAction = 'open-note';
		menuOptionEdit.dataset.cardOptionAction = 'edit-note';
		menuOptionEdit.removeAttribute('data-modal-type');
		menuOptionEdit.removeAttribute('data-modal-role');
	}
}

function openCreateNote(event) {
	changeToEditor(new Note('', section), true);
}
