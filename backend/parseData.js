const fs = require('fs').promises;

let parseData = async() => {
    const data = await fs.readFile('./data.txt', 'utf-8')
    let arr = data.split('\r\n');
    let parsedData = [];
    for(let i = 0; i < arr.length; i++) {
        let item = arr[i].split('\t');
        parsedData.push({'timestamp': item[0], 'amount': item[1]});
    }
    return parsedData;
}

let appendData = async(data) => {
    fs.appendFile('./data.txt', data, err => {
        if(err) console.error(err);
    });
}

module.exports = {parseData, appendData};