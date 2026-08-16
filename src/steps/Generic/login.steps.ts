import { step } from "../../common/decorators";
import Environment from "../../lib/environment";

export default class LoginSteps{
    public env = new Environment();

    @step
    public async openBaseUrl(){
        const baseUrl = this.env.baseUrl;
        console.log("Base URL:", baseUrl);
        return baseUrl;
    }
}