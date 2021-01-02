const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });
    return promise;
};

setTimeout(
    // This function gets executed when the timer is done!
    () => {
        console.log('Timer is done');
        fetchData().then((text) => console.log(text));
    }, 2000);

console.log('Hello!');