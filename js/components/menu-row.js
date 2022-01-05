import { first, onAttributesChange } from '../utils/elementFunctions.js';
import addSetActionEvent from './addSetActionEvent.js';
import { cardsContainer } from '../templates/card.js';
import {
	editorIsVisible, editorIsForm, editorContainer
} from './editor.js';

(function menuRowScript() {
	const toggleClass = 'is-selected';
	const menuRow = first('menu-row="true"');
	const editorSubmit = first('submit="true"', editorContainer);
	menuRow.default = first('menu-row-type="default"', menuRow);
	menuRow.default.width = menuRow.default.scrollWidth;
	menuRow.classList.toggle(toggleClass);
	menuRow.card = first('menu-row-type="card"', menuRow);
	menuRow.card.width = menuRow.card.scrollWidth;
	menuRow.classList.toggle(toggleClass);
	menuRow.style.width = `${menuRow.default.width}px`;
	menuRow.editor = first('menu-row-type="editor"', menuRow);
	onAttributesChange(
		cardsContainer,
		true,
		['data-card-is-selected'],
		card => {
			if (card.dataset.cardIsSelected === 'true') {
				showCardMenu();
			} else if (!editorIsVisible()) {
				showDefaultMenu();
			}
		}
	);
	onAttributesChange(
		editorContainer,
		true,
		['class'],
		() => {
			if (editorIsVisible()) {
				if (editorIsForm()) {
					menuRow.editor.classList.remove('hidden');
				}
				menuRow.card.classList.add('hidden');
				showCardMenu();
			} else {
				menuRow.card.classList.remove('hidden');
				menuRow.editor.classList.add('hidden');
			}
		}
	);
	addSetActionEvent(menuRow.card);
	first('save-note="true"', menuRow.editor).addEventListener('click', e => {
		e.preventDefault();
		if (editorIsVisible() && !menuRow.editor.classList.contains('hidden')) {
			editorSubmit.click();
		}
	});

	function isDefaultMenuCurrent() {
		return menuRow.classList.contains(toggleClass);
	}

	function showDefaultMenu() {
		if (isDefaultMenuCurrent()) {
			menuRow.style.width = `${menuRow.default.width}px`;
			menuRow.classList.remove(toggleClass);
		}
	}

	function showCardMenu() {
		menuRow.style.width = `${menuRow.card.width}px`;
		menuRow.classList.add(toggleClass);
	}
})();
