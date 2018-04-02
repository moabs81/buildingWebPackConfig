import { MyTSClass } from './MyTSClass';

const anInstance = new MyTSClass('Thing 1', 'Thing 2');

const aFunction: any = function () {
    anInstance.logStuff();
    anInstance.logYourProp('Thing 3');
    return;
};

aFunction();