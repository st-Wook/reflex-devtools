import Highlighter from "@rbxts/highlighter";
import inspect from "@rbxts/inspect";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { memo, useEffect, useMemo, useRef, useState } from "@rbxts/react";

import { useRootProducer, useRootSelector } from "store";
import { Action } from "store/host";

interface Props {
	action: Action;
	index: number;
	selected: boolean;
}

export const ActionSelection = memo((props: Props) => {
	const store = useRootProducer();

	const showArgs = useRootSelector((state) => state.widget.showArgs);

	const [theme, setTheme] = useState(settings().Studio.Theme);
	useEventListener(settings().Studio.ThemeChanged, () => {
		setTheme(settings().Studio.Theme);
	});

	const labelRef = useRef<TextLabel>();
	const inspectedArgs = useMemo(() => inspect(props.action.args), [props.action]);

	const formattedTimestamp = DateTime.fromUnixTimestampMillis(props.action.timestamp).FormatLocalTime(
		"hh:mm:ss.SSS",
		"en-us",
	);

	const backgroundColor = theme.GetColor(
		Enum.StudioStyleGuideColor[props.selected ? "DialogMainButton" : "DialogButton"],
	);
	const textColor = theme.GetColor(
		Enum.StudioStyleGuideColor[props.selected ? "DialogMainButtonText" : "DialogButtonText"],
	);
	const subTextColor = theme.GetColor(
		Enum.StudioStyleGuideColor[props.selected ? "DialogMainButtonText" : "SubText"],
	);

	useEffect(() => {
		const label = labelRef.current;
		if (!label) {
			return;
		}

		return Highlighter.highlight({ textObject: label });
	}, []);

	return (
		<textbutton
			key={`ActionSelection-${props.index}`}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundColor3={backgroundColor}
			BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.DialogButtonBorder)}
			Size={UDim2.fromScale(1, 0)}
			LayoutOrder={-props.index}
			Text=""
			Event={{
				Activated: () => {
					store.selectedAction(props.index, true);
				},
			}}
		>
			<uilistlayout key="UIListLayout" Padding={new UDim(0, 8)} SortOrder={Enum.SortOrder.LayoutOrder} />
			<uipadding
				key="UIPadding"
				PaddingBottom={new UDim(0, 8)}
				PaddingLeft={new UDim(0, 8)}
				PaddingRight={new UDim(0, 8)}
				PaddingTop={new UDim(0, 8)}
			/>
			<textlabel
				key="Name"
				AutomaticSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 0)}
				FontFace={Font.fromEnum(Enum.Font.BuilderSansExtraBold)}
				LayoutOrder={0}
				Text={props.action.name}
				TextColor3={textColor}
				TextSize={16}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				AutoLocalize={false}
			/>
			{!props.action.args.isEmpty() && (
				<textlabel
					key="Args"
					BackgroundTransparency={1}
					AutomaticSize={Enum.AutomaticSize.Y}
					Size={UDim2.fromScale(1, 0)}
					FontFace={Font.fromEnum(Enum.Font.RobotoMono)}
					LayoutOrder={1}
					Text={inspectedArgs}
					TextColor3={textColor}
					TextSize={16}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					Visible={showArgs}
					AutoLocalize={false}
					ref={labelRef}
				/>
			)}
			<textlabel
				key="Index"
				AutomaticSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 0)}
				FontFace={Font.fromEnum(Enum.Font.RobotoMono)}
				LayoutOrder={2}
				Text={`${formattedTimestamp} • #${props.index}`}
				TextColor3={subTextColor}
				TextSize={15}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				AutoLocalize={false}
			/>
		</textbutton>
	);
});
ActionSelection.displayName = "ActionSelection";
