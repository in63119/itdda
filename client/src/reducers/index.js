import { CLOSEMODAL } from '../actions';

export const utilReducer = (state = { visible: true }, action) => {
	switch (action.type) {
		case CLOSEMODAL:
			return Object.assign({}, state, {
				visible: false,
			});
		default:
			return state;
	}
};
