import { first, all, onAppend } from '../utils/elementFunctions.js';

(function dropdownScript() {
	let opened = undefined;
	const toggleClass = 'is-open';
	all('dropdown="true"').forEach(dropdownToggleEvent);
	document.documentElement.addEventListener('click', e => {
		if (opened && !opened.contains(e.target)) {
			close(opened);
		}
	});
	onAppend(first('cards="true"'), true, elements => {
		for (const element of elements) {
			if (element.nodeType !== Node.TEXT_NODE) {
				if (element.hasAttribute('data-dropdown')) {
					dropdownToggleEvent(dropdownToggleEvent);
				}
				all('dropdown="true"', element).forEach(dropdownToggleEvent);
			}
		}
	});

	function dropdownToggleEvent(dropdown) {
		dropdown.dataset.dropdownIsOpen = false;
		dropdown.drawer = first('dropdown-role="drawer"', dropdown);
		first('dropdown-role="toggle"', dropdown).addEventListener(
			'click', e => {
				e.preventDefault();
				if (opened && opened !== dropdown) {
					close(opened);
				}
				if (dropdown.dataset.dropdownIsOpen === 'true') {
					close(dropdown);
				} else {
					open(dropdown);
				}
			}
		);
	}

	function open(dropdown) {
		dropdown.classList.add(toggleClass);
		dropdown.drawer.style.height = `${dropdown.drawer.scrollHeight}px`;
		dropdown.dataset.dropdownIsOpen = true;
		opened = dropdown;
	}

	function close(dropdown) {
		dropdown.classList.remove(toggleClass);
		dropdown.drawer.style.height = '0';
		dropdown.dataset.dropdownIsOpen = false;
		opened = undefined;
	}
})();
