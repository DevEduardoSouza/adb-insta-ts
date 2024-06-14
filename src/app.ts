import openApp from "./commands/openApp";
import { config } from "./config/config";
import client from "./services/adbClient";
import { listDevices } from "./utils/devices";
import { sleep } from "./utils/sleep";
import { IApplication } from "./commands/openApp";

async function init() {
  try {
    const devices = await listDevices(client);

    if (devices.length === 0) {
      console.log("No devices found, please try opening a new device");
      return;
    } else {
      config.deviceId = devices[0].id;
    }

    await openApp({
      packageName: config.app.packageName,
      activityName: config.app.activityName,
    } as IApplication);

  } catch (error) {
    console.error("Erro:", error);
  }
}

init();
