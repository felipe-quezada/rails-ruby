export enum ControllerEnum {
	PAGE = 'page',
	PER_PAGE = 'perPage',
	MAG_TYPE = 'magType',
	SHOW_ASIDE = 'showAside',
	SHOW_COMMENTS = 'showComments',
	ID_COMMENT = 'idComment',
}
export enum ActionAsideFnPayload {
	MD = 'md',
	ML = 'ml',
	MS = 'ms',
	MW = 'mw',
	ME = 'me',
	MI = 'mi',
	MB = 'mb',
	MLG = 'mlg',
}

export type ActionAsideFn = (
	controller: ControllerEnum,
	payload?: number | ActionAsideFnPayload | string
) => void;
