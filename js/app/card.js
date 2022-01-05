import { changeContentIndex } from './section.js';
import doAction from './doAction.js';
import { first, onAttributesChange } from '../utils/elementFunctions.js';

export default function listenCards() {
	onAttributesChange(
		first('cards="true"'),
		true,
		['data-card-focus-index', 'data-card-action'],
		(card, value) => {
			return {
				'data-card-focus-index': () => {
					changeContentIndex(card.dataset.cardFocusIndex);
				},
				'data-card-action': () => {
					doAction(card.dataset.cardAction);
				}
			}[value]();
		}
	);
}
