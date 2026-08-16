import test from '@playwright/test'

function formatStepName(name:string): string {
    const words = name.split(/(?=[A-Z])/).map((word)=> word.charAt(0).toUpperCase()+word.slice(1));
    return words.join(' ');
}

export function step(target: Function, context:ClassMemberDecoratorContext){
    return function replacementMethod(...args: any){
        const name = `${this.constructor.name} [${formatStepName(context.name as string)}]`;
        return test.step(name, async()=>{
            return await target.call(this, ...args);
        })
    }

}