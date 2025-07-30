import { useState } from "react";

const [isBlockVisible, setIsBlockVisible] = useState(false);

export function formCloser(): any {
	setIsBlockVisible(!isBlockVisible);
}
