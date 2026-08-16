import { FlowType } from "../../../src/common/enums/flow-type";
import { RegisterUser } from "../../../src/common/enums/posts-scenarios";


export const registerUser: RegisterUser={
    email:'test@gmail.com',
    password: 'test',
    userId: 'test',
    expected: FlowType.SUCCESS
    
}
export const registerExistingUser: RegisterUser={
    email: 'existing@gmail.com',
    password: 'test',
    userId: 'existing',
    expected: FlowType.FAIL
}