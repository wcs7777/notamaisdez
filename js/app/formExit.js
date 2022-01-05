import Valid from '../models/Valid.js';

export default { form: exitForm };

function exitForm(form, event) {
	return new Valid(true).yes(() => {
		window.location.href = form.action;
		return false;
	});
}
