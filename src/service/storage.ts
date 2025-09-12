
import browser from "webextension-polyfill";



function getBrowserApi() {
    const browserApi = typeof browser !== "undefined" ? browser : chrome;
    return browserApi;
}

export function storeSetting(key: string, value: any) {
    const browserApi = getBrowserApi();
    console.log('storeSetting', key, value);
    browserApi.storage.local.set({[key]: value});

}

export async function getSetting(key: string): Promise<string> {
    const browserApi = getBrowserApi();
    const localSetting = await browserApi.storage.local.get(key);
    console.log('getSetting for',key, localSetting[key]);

    return localSetting[key] as string;
}

export function getOnChangedListener() {
    const browserApi = getBrowserApi();
    return browserApi.storage.onChanged;
}



