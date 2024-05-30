import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";

interface Props {
	text: string;
	order: number;
}

export function RowText(props: Props) {
	const [theme, setTheme] = useState(settings().Studio.Theme);
	useEventListener(settings().Studio.ThemeChanged, () => {
		setTheme(settings().Studio.Theme);
	});

	return (
		<textlabel
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundTransparency={1}
			FontFace={Font.fromEnum(Enum.Font.BuilderSans)}
			LayoutOrder={props.order}
			Text={props.text}
			TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.SubText)}
			TextSize={15}
		/>
	);
}
