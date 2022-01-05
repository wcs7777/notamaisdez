import { listenForms } from './app/form.js';
import formLogin from './app/formLogin.js';
import formRegister from './app/formRegister.js';
import formRecoveryPassword from './app/formRecoveryPassword.js';
import formConfirmCode from './app/formConfirmCode.js';
import formResetPassword from './app/formResetPassword.js';

listenForms({
	'login': { ...formLogin },
	'register': { ...formRegister },
	'recovery-password': { ...formRecoveryPassword },
	'confirm-code': { ...formConfirmCode },
	'reset-password': { ...formResetPassword }
});
