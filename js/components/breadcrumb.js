import { first, onAppend } from '../utils/elementFunctions.js';

export { crumbsBackward };

const breadcrumb = first('breadcrumb="true"');
let currentLevel = -1;

(function breadcrumbScript() {
	onAppend(breadcrumb, false, crumbs => {
		for (const crumb of crumbs) {
			addChangeLevelEvent(crumb);
			currentLevel++;
		}
	});
	addChangeLevelEvent(first('logo="true"'));

	function addChangeLevelEvent(crumb) {
		crumb.addEventListener('click', e => {
			e.preventDefault();
			crumbsBackward(currentLevel - crumb.dataset.crumbLevel);
		});
	}
})();

function crumbsBackward(steps) {
	for (let i = 0; i < steps; i++) {
		breadcrumb.removeChild(breadcrumb.lastChild);
	}
	currentLevel -= steps;
	breadcrumb.dataset.breadcrumbSteps = steps;
}
