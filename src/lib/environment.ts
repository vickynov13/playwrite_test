import { config } from "dotenv";
import {globSync} from "glob";
import {getLogger} from "log4js"
import test from "node:test";

//preserve command line env vars before dotenv override

const commandLineEnvVar = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    BASE_URL: process.env.BASE_URL
}
const envFile = globSync('./.env.*')[0] || './.env';
config ({quiet: true, path:envFile,override:true});

//Restore command line overrides after reading .env file(s)
Object.keys(commandLineEnvVar).forEach((key)=>{
    if(commandLineEnvVar[key] != undefined){
        process.env[key] = commandLineEnvVar[key];
    }
});

const log = getLogger('Environment');

//Define which env vars to load: [envKey, isMasked]
const ENV_VAR_DEFINITIONS: Record<string,[string,boolean]> = {
    testEnvironments: ['ENVIRONMENT', false],
    baseUrl:['BASE_URL',false]
}
export default class Environment {
    private _initialized = false;
    private _vars : Record<string,string> ={};

    private init():void{
        if (this._initialized) return;
        for(const [key,[envKey,isMasked]] of Object.entries(ENV_VAR_DEFINITIONS)){
            const value = process.env[envKey] ;
            if(!value){
                log.warn(`No value given for ${envKey}, either set it in .env or as command line argument`);
                // throw new Error(`Missing environment property: ${envKey}`);
                this._vars[key] = '';
                continue;
            }
            log.info(`${envKey} set to: ${isMasked? '****': value}`);
            this._vars[key]=value;
        }
        this._initialized =true;
    }
    public get baseUrl(): string{
        this.init();
        log.info(` ---Async function ${this._vars.baseUrl}`);
        return this._vars.baseUrl;
    }
}