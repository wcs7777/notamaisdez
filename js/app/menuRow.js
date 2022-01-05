import doAction from './doAction.js';
import { first, onAttributesChange } from '../utils/elementFunctions.js';

export default function listenMenuRow() {
	onAttributesChange(
		first('menu-row-type="card"'),
		false,
		['data-card-action'],
		(menuRow) => doAction(menuRow.dataset.cardAction)
	);
}
