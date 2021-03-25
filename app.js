const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const port = 3000;
const bodyParser = require("body-parser");
const generateKey = () => Math.random().toString(36).substring(7);

const wallet = [];
const myMap = new Map();


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {



    if (req.session.loggedin) {
        console.log(wallet[req.sessionID])
        res.render(__dirname + '/view/index.ejs', {
            session: req.sessionID,
            welcomeEntry: wallet[req.sessionID],
            css: "",
            title: "Your ToDo-List"
        });
        return;
    }
    res.render(path.join(__dirname + '/view/frontpage.html'
    ));
})

app.get('/auth', (req, res) => {
    req.session.loggedin = true;
    wallet[req.sessionID] = [];
    myMap.set(req.sessionID, generateKey());
    res.redirect('/');
})


app.post("/newEntry", function (req, res) {
    let data = req.body["entry"];
    wallet[req.sessionID].push(data);
});


app.post("/deleteEntry", function (req, res) {
    let data = req.body["deleteEntry"];
    removeElement(wallet[req.sessionID], data);
    console.log(wallet[req.sessionID])
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

app.get("/:id", function (req, res) {

    let id = req.params.id;
    for (let page in wallet) {
        if (page == id) {
            res.render(__dirname + '/view/index.ejs', {
                title: "READONLY",
                session: page,
                welcomeEntry: wallet[page],
                css: "none"
            });
            return;
        }
        res.redirect('/');

    }


});


app.post('/endList', (req, res) => {
    removeElement(wallet, req.sessionID)

    console.log("delete list");
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }

        res.redirect('/');
    });
});
