import { first, all, clearChildren } from '../utils/elementFunctions.js';
import { template } from './templateContainer.js';
import { toggleEditor } from '../components/editor.js';

export { addCard, addCards, renameCard, removeCard, cardsContainer };

const cardsContainer = first('cards="true"');
const cardCreateTemplate = first('card="create"', template);
const cardTemplate = first('card="template"', template);
const cardNoteTemplate = noteOptions(cardTemplate.cloneNode(true));

function noteOptions(card) {
	const edit = first('modal-type="edit"', card);
	edit.classList.remove('modal__opener');
	edit.removeAttribute('data-modal-type');
	edit.removeAttribute('data-modal-role');
	edit.dataset.cardOptionAction = 'edit-note';
	const open = first('card-option-action="open"', card);
	open.dataset.cardOptionAction = 'open-note';
	return card;
}

function addCard(content) {
	const cardCreate = first('card="create"', cardsContainer);
	cardsContainer.insertBefore(createCard(content),cardCreate);
}

function addCards(contents) {
	const cardsFragment = document.createDocumentFragment();
	const cardCreate = cardCreateTemplate.cloneNode(true);
	for (const content of contents) {
		cardsFragment.appendChild(createCard(content));
	}
	cardsFragment.appendChild(cardCreate);
	clearChildren(cardsContainer);
	cardsContainer.appendChild(cardsFragment);
	cardCreate.dataset.cardIsSelected = '';
	cardCreate.dataset.cardIsSelected = false;
	cardCreate.removeAttribute('data-card-is-selecte');
	toggleEditor(false);
}

function createCard(content) {
	const card = (!content.isLastSection())?
		cardTemplate.cloneNode(true) :
		cardNoteTemplate.cloneNode(true);
	card.dataset.card = 'true';
	card.dropdown = first('dropdown="true"', card);
	first('card-role="title"', card).textContent = content.name;
	first('card-role="detail"', card).textContent = content.contentDetail();
	return card;
}

function renameCard(index, newTitle) {
	all('card="true"', cardsContainer).some((card, i) => {
		if (index == i) {
			first('card-role="title"', card).textContent = newTitle;
			return true;
		} else {
			return false;
		}
	});
}

function removeCard(index) {
	all('card="true"', cardsContainer).some((card, i) => {
		if (index == i) {
			cardsContainer.removeChild(card);
			return true;
		} else {
			return false;
		}
	});
}
