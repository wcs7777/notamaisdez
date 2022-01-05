import listenCards from './app/card.js';
import listenMenuRow from './app/menuRow.js';
import listenBreadcrumb from './app/breadcrumb.js';
import { listenForms } from './app/form.js';
import formAdd from './app/formAdd.js';
import formEdit from './app/formEdit.js';
import formRemove from './app/formRemove.js';
import formChangePassowrd from './app/formChangePassword.js';
import formExit from './app/formExit.js';
import formAddNote from './app/formAddNote.js';
import formEditNote from './app/formEditNote.js';
import { changeSection } from './app/section.js';
import { student } from './app/students.js';

listenCards();
listenMenuRow();
listenBreadcrumb();
changeSection(student.container);
listenForms({
	'add': { ...formAdd },
	'edit': { ...formEdit },
	'remove': { ...formRemove },
	'change-password': { ...formChangePassowrd },
	'exit': { ...formExit },
	'add-note': { ...formAddNote },
	'edit-note': { ...formEditNote }
});
