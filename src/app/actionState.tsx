import Highlighter from "@rbxts/highlighter";
import inspect from "@rbxts/inspect";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useMemo, useRef, useState } from "@rbxts/react";

interface Props {
	state: object;
}

export function ActionState(props: Props) {
	const labelRef = useRef<TextLabel>();

	const [theme, setTheme] = useState(settings().Studio.Theme);
	useEventListener(settings().Studio.ThemeChanged, () => {
		setTheme(settings().Studio.Theme);
	});

	const inspectedState = useMemo(() => inspect(props.state), [props.state]);

	useEffect(() => {
		const label = labelRef.current;
		if (!label) {
			return;
		}

		return Highlighter.highlight({ textObject: label });
	}, []);

	return (
		<scrollingframe
			key={"ActionState"}
			BackgroundTransparency={1}
			BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
			Size={UDim2.fromScale(1, 1)}
			CanvasSize={new UDim2()}
			AutomaticCanvasSize={Enum.AutomaticSize.XY}
			ScrollBarImageColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar)}
			ScrollBarThickness={6}
		>
			<textlabel
				key={"TextLabel"}
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				FontFace={Font.fromEnum(Enum.Font.RobotoMono)}
				Text={inspectedState}
				TextColor3={new Color3(1, 1, 1)}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Top}
				AutoLocalize={false}
				ref={labelRef}
			/>
		</scrollingframe>
	);
}
