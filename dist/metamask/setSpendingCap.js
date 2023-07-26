"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSpendingCap = void 0;
const helpers_1 = require("../helpers");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setSpendingCap = (page) => async () => {
  await page.bringToFront();
  await page.reload();
  await (0, helpers_1.waitForOverlay)(page);
  try {
    await (0, helpers_1.clickOnButton)(page, "Confirm", { timeout: 500 });
  } catch (e) {
    await (0, helpers_1.clickOnButton)(page, "Use default");
    await page.waitForTimeout(1000);
    await (0, helpers_1.clickOnButton)(page, "Next");
    await (0, helpers_1.clickOnButton)(page, "Approve");
  }
};
exports.setSpendingCap = setSpendingCap;
