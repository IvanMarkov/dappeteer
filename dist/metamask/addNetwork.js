"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectAddNetwork = exports.acceptAddNetwork = exports.addNetwork = void 0;
const helpers_1 = require("../helpers");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addNetwork = (page) => async({ networkName, rpc, chainId, symbol, })=> {
    await page.bringToFront();
    await (0, helpers_1.openNetworkDropdown)(page);
    await (0, helpers_1.clickOnButton)(page, 'Add network');
    await (0, helpers_1.clickOnElement)(page, 'Add a network manually');
    // const responsePromise = page.waitForResponse((response) => new URL(response.url()).pathname === new URL(rpc).pathname);
    await (0, helpers_1.typeOnInputField)(page, 'Network name', networkName);
    await (0, helpers_1.typeOnInputField)(page, 'New RPC URL', rpc);
    await (0, helpers_1.typeOnInputField)(page, 'Chain ID', String(chainId));
    await (0, helpers_1.typeOnInputField)(page, 'Currency symbol', symbol);
    // await responsePromise;
  
    // const errorMessage = await (0, helpers_1.getErrorMessage)(page);
    // if (errorMessage)
    //     throw new SyntaxError(errorMessage);
    await (0, helpers_1.clickOnButton)(page, 'Save');
    // await (0, helpers_1.clickOnButton)(page, `Dismiss`);
    // await (0, helpers_1.clickOnButton)(page, `Got it`);
    await page.waitForXPath(`//*[text() = '${networkName}']`);
};
exports.addNetwork = addNetwork;

const acceptAddNetwork = (page) => async (shouldSwitch = false) => {
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await page.waitForSelector(".confirmation-page", {
            timeout: 1000,
        });
        await (0, helpers_1.clickOnButton)(page, "Approve", { timeout: 500 });
    }, 5);
    if (shouldSwitch) {
        await (0, helpers_1.clickOnButton)(page, "Switch network");
        await page.waitForSelector(".new-network-info__wrapper", {
            visible: true,
        });
        await (0, helpers_1.clickOnButton)(page, "Got it");
    }
    else {
        await (0, helpers_1.clickOnButton)(page, "Cancel");
    }
};
exports.acceptAddNetwork = acceptAddNetwork;
const rejectAddNetwork = (page) => async () => {
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await (0, helpers_1.clickOnButton)(page, "Cancel", { timeout: 500 });
    }, 5);
};
exports.rejectAddNetwork = rejectAddNetwork;
