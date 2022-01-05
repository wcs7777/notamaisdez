import { first } from '../utils/elementFunctions.js';
import { template } from './templateContainer.js';

const breadcrumb = first('breadcrumb="true"');
const crumbTemplate = first('crumb-level="template"', template);

export default function addCrumb(name) {
	const crumb = crumbTemplate.cloneNode(true);
	crumb.dataset.crumbLevel = breadcrumb.childElementCount;
	crumb.textContent = name;
	breadcrumb.appendChild(crumb);
}
