import { FlowType } from "./flow-type";

interface BaseScenario{
    email: string;
    password:string;
    expected: FlowType;
}

interface UserId{
    userId: string
}

export type RegisterUser = BaseScenario & UserId;
export type UserLogin = BaseScenario;
export type ResetPassword = BaseScenario;
