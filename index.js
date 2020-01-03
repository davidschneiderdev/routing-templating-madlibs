
const http = require('http');
const fs = require('fs');
const faker = require('faker');

const madlib = fs.readFileSync("templates/madlib.html").toString();

let counter = 0;

const server = http.createServer((req, res) => {
    counter += 1;
    console.log(counter);

    const url = req.url.charAt(1).toUpperCase() + req.url.slice(2);
    const splitUrl = url.split("/");

    const specialGreetings = {
        "Oakley": "How wonderfully splendid it is to be in your presence again!",
        "Chris": "Oh hey...",
        "Milla": "Hello, Milla."
    };

    const hackerKeywords = ["Adjective", "Noun", "Verb"];

    let newTemplate = madlib.replace("***NAME***", splitUrl[0]).replace("***PLACE***", splitUrl[1]);
    let returnString = '';

    if (Object.keys(specialGreetings).includes(url)) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        returnString = `<h1>${specialGreetings[url]}</h1>`;
    } else if (splitUrl.length == 1) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        returnString = `<h1>Hello, ${url}!</h1>`;
    } else if (hackerKeywords.includes(splitUrl[0])) {
        let result = '';
        for (item of splitUrl) {
            const word = item.toLowerCase();
            if (word === "adjective") {
                result += `${faker.hacker.adjective()} `; 
            } else if (word === "noun") {
                result += `${faker.hacker.noun()} `;
            } else if (word === "verb") {
                result += `${faker.hacker.verb()} `;
            }
        }
        let editedResult = result.slice(0, -1);
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        returnString = `<h1>I'm currently calibrating the ${editedResult}.</h1>`;
    } else if (splitUrl) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        returnString = newTemplate; 
    }
    res.end(returnString + `Counter currently at ${counter}.`);
});


server.listen(3000, () => {
    console.log("Server listening at port 3000");
});