import readline from 'readline';

export function paramsUrlToObjects(paramsUrl = "") {
    return paramsUrl.split("&").reduce((acc, curr) => {
        const [key, value] = curr.split("=");
        acc[key] = value;
        return acc;
    }, {});
}

export function readLineFromConsole(message = "Input a value: ",) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(message, (value) => {
            rl.close();
            resolve(value);
        });
    });
}