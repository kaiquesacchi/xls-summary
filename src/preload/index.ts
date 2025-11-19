import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { exposeElectronTRPC } from "trpc-electron/main";

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    process.once("loaded", () => {
      exposeElectronTRPC();
    });

    contextBridge.exposeInMainWorld("electron", electronAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-expect-error Additional properties for the `window`
  window.electron = electronAPI;
}
