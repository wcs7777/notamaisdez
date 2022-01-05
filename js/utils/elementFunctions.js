export {
	first,
	all,
	id,
	fieldElements,
	onAppend,
	onRemove,
	onAttributesChange,
	clearChildren, 
	index
};

function first(attribute, target=document) {
	if (target) {
		return target.querySelector(`[data-${attribute}]`);
	} else {
		console.error('invalid argument in first:', target);
		return undefined;
	}
}

function all(attribute, target=document) {
	if (target) {
		return Array.from(target.querySelectorAll(`[data-${attribute}]`));
	} else {
		console.error('invalid argument in all:', target);
		return [];
	}
}

function id(nameId) {
	return document.getElementById(nameId);
}

function fieldElements(attribute, form) {
	return {
		input: first(`input=${attribute}`, form),
		label: first(`label=${attribute}`, form),
		error: first(`error=${attribute}`, form)
	};
}

function onAppend(element, onSubtree, listener) {
	const mutation = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			if (mutation.addedNodes.length) {
				listener(
					Array.from(mutation.addedNodes),
					mutation.target
				);
			}
		}
	});
	mutation.observe(
		element, {
			childList: true,
			subtree: onSubtree
		}
	);
	return mutation;
}

function onRemove(element, onSubtree, listener) {
	const mutation = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			if (mutation.removedNodes.length) {
				listener(
					Array.from(mutation.removedNodes),
					mutation.target
				);
			}
		}
	});
	mutation.observe(
		element, {
			childList: true,
			subtree: onSubtree
		}
	);
	return mutation;
}

function onAttributesChange(element, onSubtree, attributes, listener) {
	const mutation = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			if (mutation.type === 'attributes') {
				listener(mutation.target, mutation.attributeName, mutation.oldValue);
			}
		}
	});
	mutation.observe(
		element, {
			attributeFilter: attributes,
			attributeOldValue: true,
			subtree: onSubtree
		}
	);
	return mutation;
}

function clearChildren(target) {
	while (target.firstChild) {
		target.removeChild(target.lastChild);
	}
}

function index(element) {
	let i = -1;
	if (element) {
		do {
			i++;
		} while (element = element.previousElementSibling);
	}
	return i;
}
