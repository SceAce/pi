import { Container, Text } from "@earendil-works/pi-tui";
import { describe, expect, test } from "vitest";
import { createChatViewport } from "../src/modes/interactive/chat-viewport.ts";

describe("chat viewport", () => {
	test("top bar is fixed and sidebar is hidden below 100 columns", () => {
		const topBar = new Text("AEGIS TOP", 0, 0);
		const sidebar = new Text("AEGIS SIDE", 0, 0);
		const viewport = createChatViewport({
			document: new Container(),
			pendingMessages: new Container(),
			status: new Container(),
			editor: new Container(),
			footer: new Container(),
			topBar,
			sidebar,
			sidebarVisible: () => true,
		});
		const wide = viewport.root.render(120).join("\n");
		const narrow = viewport.root.render(80).join("\n");
		expect(wide).toContain("AEGIS TOP");
		expect(wide).toContain("AEGIS SIDE");
		expect(narrow).toContain("AEGIS TOP");
		expect(narrow).not.toContain("AEGIS SIDE");
	});

	test("defaults the transcript scrollbar to auto and accepts overrides", () => {
		const automatic = createChatViewport({
			document: new Container(),
			pendingMessages: new Container(),
			status: new Container(),
			editor: new Container(),
			footer: new Container(),
		});
		const hidden = createChatViewport({
			document: new Container(),
			pendingMessages: new Container(),
			status: new Container(),
			editor: new Container(),
			footer: new Container(),
			scrollbar: "hidden",
		});

		expect(automatic.transcript.scrollbar).toBe("auto");
		expect(hidden.transcript.scrollbar).toBe("hidden");
	});
});
