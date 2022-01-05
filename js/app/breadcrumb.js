import { sectionBackward } from './section.js';
import { first, onAttributesChange } from '../utils/elementFunctions.js';

export default function listenBreadcrumb() {
	onAttributesChange(
		first('breadcrumb-container="true"'),
		true,
		['data-breadcrumb-steps'],
		breadcrumb => sectionBackward(breadcrumb.dataset.breadcrumbSteps)
	);
}
