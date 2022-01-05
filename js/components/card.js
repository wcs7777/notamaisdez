import {
	all,
	onAppend,
	onAttributesChange,
	index
} from '../utils/elementFunctions.js';
import addSetActionEvent from './addSetActionEvent.js';
import { cardsContainer } from '../templates/card.js';
import { editorIsVisible, editorContainer } from './editor.js';

(function cardScript() {
	const toggleClass = 'is-selected';
	let selected = undefined;
	all('card="true"', cardsContainer).forEach(addCardEvents);
	document.documentElement.addEventListener('click', e => {
		if (selected && !selected.contains(e.target)) {
			deselect(selected);
		}
	});
	onAppend(cardsContainer, false, cards => {
		for (const card of cards) {
			if (card.dataset.card !== 'create') {
				addCardEvents(card);
			}
		}
	});
	onAttributesChange(
		cardsContainer,
		true,
		['data-dropdown-is-open'],
		dropdown => {
			const card = dropdown.parentElement;
			if (dropdown.dataset.dropdownIsOpen === 'true') {
				card.dataset.cardFocusIndex = index(card);
			} else {
				card.dataset.cardFocusIndex = -1;
			}
		}
	);
	onAttributesChange(
		editorContainer,
		true,
		['class'],
		() => {
			if (editorIsVisible()) {
				cardsContainer.classList.add('hidden');
			} else {
				cardsContainer.classList.remove('hidden');
			}
		}
	);

	function addCardEvents(card) {
		addToggleCardEvent(card);
		addSetActionEvent(card);
	}

	function addToggleCardEvent(card) {
		card.nones = all('card-role="none"', card);
		card.dataset.cardIsSelected = false;
		card.addEventListener('click', e => {
			if (card.nones.every(n => !n.contains(e.target))) {
				e.preventDefault();
				if (selected && selected !== card) {
					deselect(selected);
				}
				if (card.dataset.cardIsSelected === 'true') {
					 deselect(card);
				} else {
					 select(card);
				}
			}
		});
	}

	function select(card) {
		card.classList.add(toggleClass);
		card.dataset.cardIsSelected = true;
		card.dataset.cardFocusIndex = index(card);
		selected = card;
	}

	function deselect(card) {
		card.classList.remove(toggleClass);
		card.dataset.cardIsSelected = false;
		card.dataset.cardFocusIndex = -1;
		selected = undefined;
	}
})();
