import {test} from '@playwright/test'
import {registerUser,registerExistingUser} from '../DEMO/scenarios/account-scenarios';
import LoginSteps from '../../src/steps/Generic/login.steps';

const loginSteps = new LoginSteps();

test.describe(
    'User Accounts Test',
    {tag:['@account','@smoke']},
    ()=>{
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