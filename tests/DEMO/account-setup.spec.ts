import {test} from '@playwright/test'
import {registerUser,registerExistingUser} from '../DEMO/scenarios/account-scenarios';
import LoginSteps from '../../src/steps/Generic/login.steps';
import pw from '../../src/lib/global-context';

const loginSteps = new LoginSteps();
// Temp code until figuring out context--------------------

// Temp code end--------------------------------------------
test.describe(
    'User Accounts Test',
    {tag:['@account','@smoke']},
    ()=>{
        test.beforeAll(async () => {
            await pw.createBrowser();
        });
        test.afterAll(async () => {
            await pw.closeBrowser();
        });
        const testScenarios = [
            {scenario:registerUser},
            // {scenario:registerExistingUser}
        ]
        for(const {scenario} of testScenarios){
            test(
                `Register User - ${scenario.expected} Flow`,
                {tag:['@success']},
                async ()=>{
                    await loginSteps.openBaseUrl();
                }
            );
        }
    }
);