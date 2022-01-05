import { all } from '../utils/elementFunctions.js';

export default function addSetActionEvent(container) {
	all('card-option-action', container).forEach(option => {
		option.addEventListener('click', e => {
			e.preventDefault();
			container.dataset.cardAction = option.dataset.cardOptionAction;
		});
	});
}
