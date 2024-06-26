/// <reference types="@rbxts/types/plugin" />

import { createProducer } from "@rbxts/reflex";

export interface Widget {
	open: boolean;
	selectedIndex?: number;
	autoSelectLatest: boolean;
	showArgs: boolean;
}

const initialState: Widget = {
	open: false,
	autoSelectLatest: true,
	showArgs: true,
};

export const widget = createProducer(initialState, {
	toggled: (state, open?: boolean) => ({
		...state,
		open: open ?? !state.open,
	}),
	selectedAction: (state, index: number, manual?: boolean) => ({
		...state,
		selectedIndex: index,
		autoSelectLatest: !manual,
	}),
	changeAutoSelectMode: (state, mode: boolean) => ({
		...state,
		autoSelectLatest: mode,
	}),
	changeShowArgs: (state, show: boolean) => ({
		...state,
		showArgs: show,
	}),
});
