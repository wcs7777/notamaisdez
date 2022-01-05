import formScript from '../components/form.js';
import { fieldElements } from '../utils/elementFunctions.js';

export { listenForms, inputFeedback };

let validators = {};

function listenForms(validatorsTypes={}) {
	validators = validatorsTypes;
	formScript(formsValidator, inputsValidator);
}

function inputFeedback(valid, field) {
	return valid
		.yes(response => {
			field.input.setCustomValidity('');
			field.input.reportValidity();
			return response;
		})
		.no(reason => {
			field.error.textContent = reason;
			field.input.setCustomValidity(reason);
			field.input.reportValidity();
			return reason;
		});
}

function formsValidator(form, event) {
	return validators[form.dataset.formType]
		.form(form, event)
			.yes(response => {
				if (response === false) {
					event.preventDefault();
				}
			})
			.no(reason => {
				event.preventDefault();
				console.log('invalid', reason);
			});
}

function inputsValidator(form, input) {
	const inputName = input.dataset.input;
	return validators[form.dataset.formType]
		.inputs[inputName](fieldElements(inputName, form));
}
