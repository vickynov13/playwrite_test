
import { getLogger } from "log4js";
import TimeoutPeriod from "../common/enums/TimeOutPeriod";
import pw from "../lib/global-context";

const log = getLogger('Base Page');
export default class BasePage{
    // protected constructor(){}

    public async goToUrl(
        url:string,
        options?:{waitForState?: 'load' | 'domcontentloaded' | 'networkidle'}
    ): Promise<void>{
        log.info('opening url: '+url);
        // Default wait for networkidle
        const waitForState = options?.waitForState ? options?.waitForState : 'networkidle';
        try{
            const response = pw.page().goto(url,{timeout: TimeoutPeriod.LONG, waitUntil: 'networkidle'});
            await pw.page().waitForLoadState(waitForState);
        }catch(Error){
            log.warn('Some error');
        }
    }
}