import { first, all } from '../utils/elementFunctions.js';

export default formScript;

function formScript(formsValidator=()=>{}, inputsValidator=()=>{}) {
	for (const form of all('form-type')) {
		const inputs = all('input', form);
		const submit = first('submit', form);
		if (inputs.length > 0) {
			const lastInput = inputs[inputs.length - 1];
			inputs.slice(0, -1).forEach((input, i) => {
				addNextFocusEvent(input, inputs[i + 1]);
				addValidateInputEvent(input, form);
			});
			if (lastInput.dataset.input !== 'note-text') {
				addEnterSubmitEvent(lastInput, submit, form);
			}
			addValidateInputEvent(lastInput, form);
		}
		submit.addEventListener('click', e => {
			formsValidator(form, e);
		});
		submit.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				formsValidator(form, e);
			}
		});
		form.addEventListener('invalid', (function(){
			return function(e){
				e.preventDefault();
			};
		})(), true);
	}

	function addNextFocusEvent(input, next) {
		input.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				next.focus();
			}
		});
	}

	function addEnterSubmitEvent(input, submit) {
		input.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				submit.click();
			}
		});
	}

	function addValidateInputEvent(input, form) {
		input.addEventListener('blur', (e) => {
			inputsValidator(form, input);
		});
	}
}
