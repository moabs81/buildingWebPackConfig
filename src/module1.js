export const module1 = function () {
    if (this) {
        if (typeof (this) === 'object') {
            Object.keys(this).forEach(el => {
                console.log('The ' + el + ' field is "' + this[el] + '."');
            });
        };
    };
};