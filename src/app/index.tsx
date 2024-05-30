import Highlighter from "@rbxts/highlighter";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useMemo, useState } from "@rbxts/react";

import { useRootProducer, useRootSelector } from "store";

import { ActionSelection } from "./actionSelection";
import { ActionState } from "./actionState";
import { RowButton } from "./rowButton";
import { RowText } from "./rowText";

Highlighter.matchStudioSettings();

const ACTIONS_WIDTH = 0.3;
const ROW_HEIGHT = 30;

export function App() {
	const store = useRootProducer();

	const actions = useRootSelector((state) => state.host.actions);
	const selectedIndex = useRootSelector((state) => state.widget.selectedIndex);
	const autoSelectLatest = useRootSelector((state) => state.widget.autoSelectLatest);
	const showArgs = useRootSelector((state) => state.widget.showArgs);

	const [theme, setTheme] = useState(settings().Studio.Theme);
	useEventListener(settings().Studio.ThemeChanged, () => {
		setTheme(settings().Studio.Theme);
	});

	const selectedAction = selectedIndex !== undefined ? actions[selectedIndex] : undefined;

	useEffect(() => {
		const last = actions.size() - 1;
		if (autoSelectLatest && last >= 0) {
			store.selectedAction(last);
		}
	}, [selectedIndex, actions, autoSelectLatest]);

	const actionSelections = useMemo(() => {
		const elements = new Map<number, React.Element>();
		actions.forEach((action, index) => {
			elements.set(index, <ActionSelection action={action} index={index} selected={index === selectedIndex} />);
		});
		return elements;
	}, [actions, selectedIndex]);

	return (
		<frame key="Main" BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<frame
				key="TopRow"
				BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.Titlebar)}
				BackgroundTransparency={0}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, ROW_HEIGHT)}
			>
				<RowText key="DispatchedCount" order={0} text={`${actions.size()} dispatched`} />
				<RowButton key="Clear" onClick={() => store.clear()} order={1} text="Clear" />

				<RowText key="Dot" order={2} text="•" />

				<RowText key="SelectionModeLabel" order={3} text="Selection Mode" />
				<RowButton
					key="AutoSelect"
					onClick={() => store.changeAutoSelectMode(!autoSelectLatest)}
					order={4}
					text={autoSelectLatest ? "Auto" : "Manual"}
				/>

				<RowText key="Dot2" order={5} text="•" />

				<RowText key="ShowArgumentsLabel" order={6} text="Show Arguments" />
				<RowButton
					key="ShowArguments"
					onClick={() => store.changeShowArgs(!showArgs)}
					order={7}
					text={showArgs ? "On" : "Off"}
				/>

				<uilistlayout
					key="UIListLayout"
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					Padding={new UDim(0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<uipadding key="UIPadding" PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			</frame>

			<scrollingframe
				key="Actions"
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				CanvasSize={new UDim2()}
				Position={new UDim2(0, 0, 0, ROW_HEIGHT)}
				ScrollBarImageColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
				ScrollBarThickness={6}
				Size={new UDim2(ACTIONS_WIDTH, 0, 1, -ROW_HEIGHT)}
			>
				{actionSelections}
				<uilistlayout key="UIListLayout" Padding={new UDim(0, 5)} SortOrder={Enum.SortOrder.LayoutOrder} />
			</scrollingframe>

			<frame
				BackgroundTransparency={1}
				Position={new UDim2(ACTIONS_WIDTH, 0, 0, ROW_HEIGHT)}
				Size={new UDim2(1 - ACTIONS_WIDTH, 0, 1, -ROW_HEIGHT)}
				key="state"
			>
				{selectedAction && <ActionState state={selectedAction.state} />}
			</frame>
		</frame>
	);
}
