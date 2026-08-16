import { step } from "../../common/decorators";
import Environment from "../../lib/environment";
import BasePage from "../../page-objects/_page";
import LoginPage from "../../page-objects/DEMO/login-page";

export default class LoginSteps{
    public env = new Environment();
    public loginPage = new LoginPage();

    @step
    public async openBaseUrl(){
        const baseUrl = this.env.baseUrl;
        this.loginPage.goToUrl(baseUrl,{waitForState: 'domcontentloaded'});
    }
}