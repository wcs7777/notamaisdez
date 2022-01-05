import { first, clearChildren } from '../utils/elementFunctions.js';
import { addCloseEvent } from '../components/modal.js';
import interval from '../utils/interval.js';
import { template } from './templateContainer.js';

export { modalEdit, modalDetails, modalRemove };

const modal = first('modal="true"');
const messageTemplate = first('message-template="true"', template);
const templateClose = first('modal-role="close"', messageTemplate);
const templateHighlight = first('detail-role="highlight"', messageTemplate);
const templateText = first('detail-role="detail"', messageTemplate);

function modalEdit(name) {
	waitModalAppend().then(() => {
		first('input="new-name"', modal).value = name;
	});
}

function modalDetails(details) {
	waitModalAppend().then(() => {
		const container = first('detail-role="container"', modal);
		const fragment = document.createDocumentFragment();
		const highlight = templateHighlight.cloneNode(true);
		highlight.textContent = details[0];
		fragment.appendChild(addCloseEvent(templateClose.cloneNode(true)));
		fragment.appendChild(highlight);
		for (const detail of details.slice(1)) {
			const text = templateText.cloneNode(true);
			text.textContent = detail;
			fragment.appendChild(text);
		}
		clearChildren(container);
		container.appendChild(fragment);
	});
}

function modalRemove(name) {
	waitModalAppend().then(() => {
		first('content-role="name"', modal).textContent = `${name}?`;
	});
}

async function waitModalAppend() {
	return await interval(() => modal.childElementCount > 1, 25);
}
