import { closeModal } from '../components/modal.js';
import { removeCard } from '../templates/card.js';
import { section, index } from './section.js';

export default {
	form: removeForm
};

function removeForm(form, event) {
	return section.validRemoveContent(index).yes(() => {
		section.removeContent(index);
		removeCard(index);
		closeModal();
		return 'removed';
	});
}
