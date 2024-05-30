import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";

interface Props {
	text: string;
	order: number;
	onClick: () => void;
}

export function RowButton(props: Props) {
	const [theme, setTheme] = useState(settings().Studio.Theme);
	useEventListener(settings().Studio.ThemeChanged, () => {
		setTheme(settings().Studio.Theme);
	});

	return (
		<textbutton
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.Button)}
			BorderSizePixel={0}
			Event={{ Activated: () => props.onClick() }}
			FontFace={Font.fromEnum(Enum.Font.BuilderSans)}
			LayoutOrder={props.order}
			Size={UDim2.fromOffset(0, 20)}
			Text={props.text}
			TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.ButtonText)}
			TextSize={15}
		>
			<uipadding key="UIPadding" PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} />
		</textbutton>
	);
}
