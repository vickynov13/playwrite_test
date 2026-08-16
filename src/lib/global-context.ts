import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { getLogger } from "log4js";

const log = getLogger('PlaywrightContextManager');

class PlaywrightContextManager{
    private pwBrowser: Browser | undefined = undefined;
    private pwContext: BrowserContext | undefined = undefined;
    private pwPage: Page | undefined = undefined;

    public async createBrowser():Promise<Browser>{
        // this.pwBrowser = undefined;
        this.pwBrowser = await chromium.launch({
            headless:false,
            args:[
                '--disable-cache',
                '--disable-extension',
                '--disable-features=Translate',
                '--disable-features=VizDisplayCompositor',
                '--disable-web-security',
                '--enable-automation',
                '--no-default-browser-check',
                '--no-first-run',
                '--no-sandbox'
            ]
        });
        this.pwContext = await this.pwBrowser.newContext();
        this.pwPage = await this.pwContext?.newPage();
        return this.pwBrowser;
    }
    public async closeBrowser():Promise<void>{
        await this.pwBrowser?.close();
        this.pwBrowser = undefined;
        this.pwContext = undefined;
        this.pwPage = undefined;
    }
    public async page(): Promise<Page | undefined>{
        // if (!this.pwBrowser) {
        //     await this.createBrowser();
        // }

        // if (!this.pwBrowser) {
        //     log.warn('browser does not exist');
        //     return undefined;
        // }

        // this.pwContext ??= await this.pwBrowser.newContext();
        // this.pwPage = await this.pwContext.newPage();

        if(!this.pwPage){
            log.warn('page does not exist');
        }
        return this.pwPage;
    }
}

const pw = new PlaywrightContextManager;
export default pw;