const doNothing = () => {};

export default class Valid {
	constructor(condition, noCallback=doNothing, yesCallback=doNothing) {
		this.condition = condition;
		this.noCallback = noCallback;
		this.noReturn = undefined;
		this.yesCallback = yesCallback;
		this.yesReturn = undefined;
	}

	yes(callback=doNothing) {
		if (this.condition) {
			if (callback.toString() !== doNothing.toString()) {
				this.yesCallback = callback;
			}
			this.yesReturn = this.yesCallback(this.yesReturn);
		}
		return this;
	}

	no(callback=doNothing) {
		if (!this.condition) {
			if (callback.toString() !== doNothing.toString()) {
				this.noCallback = callback;
			}
			this.noReturn = this.noCallback(this.noReturn);
		}
		return this;
	}

	static all(valids) {
		const yesReturns = [];
		for (const valid of valids) {
			if (!valid.condition) {
				return valid.no();
			}
			yesReturns.push(valid.yes().yesReturn);
		}
		return new Valid(true).yes(() => yesReturns);
	}
}
