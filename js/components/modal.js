import { template } from '../templates/templateContainer.js';
import { first, all, onAppend } from '../utils/elementFunctions.js';

export { closeModal, addCloseEvent };

const modal = first('modal="true"');

function closeModal() {
	const body = first('modal-role="body"', modal);
	if (body) {
		modal.removeChild(body);
	}
	toggleModal(false);
}

function addCloseEvent(element) {
	element.addEventListener('click', e => {
		e.preventDefault();
		closeModal();
	});
	return element;
}

function toggleModal(open) {
	const toggleClass = 'is-open';
	if (open) {
		modal.classList.add(toggleClass);
	} else {
		modal.classList.remove(toggleClass);
	}
}

(function modalScript() {
	const modalTypes = getModalTypes();
	all('modal-role="open"').forEach(addOpenModalEvent);
	if (modal) {
		addCloseEvent(first('modal-role="close"', modal)); /* backdrop */
		onAppend(first('cards="true"'), true, elements => {
			const attribute = 'data-modal-role';
			for (const element of elements) {
				if (element.nodeType !== Node.TEXT_NODE) {
					if (
						element.hasAttribute(attribute) &&
						element.getAttribute(attribute) === 'open'
					) {
						addOpenModalEvent(element);
					}
					all('modal-role="open"', element).forEach(addOpenModalEvent);
				}
			}
		});
	}

	function addOpenModalEvent(opener) {
		opener.addEventListener('click', e => {
			if (opener.dataset.modalType) {
				openModal(modalTypes[opener.dataset.modalType]);
			} else {
				console.error('Invalid opener: ', opener);
			}
		});
	}

	function getModalTypes() {
		const modalTypes = [];
		all('modal-role="body"', template).forEach(body => {
			all('modal-role="close"').forEach(addCloseEvent);
			modalTypes[body.dataset.modalType] = body;
		});
		return modalTypes;
	}

	function openModal(newBody) {
		modal.appendChild(newBody);
		for (const input of all('input', modal)) {
			input.setCustomValidity('');
			input.reportValidity();
		}
		toggleModal(true);
	}
})();
