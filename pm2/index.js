const PORT = 3001;
const PAM_AUTH = false; // if set to true, USER and PASS won't be used
const USER = 'admin';
const PASS = 'admin';
const SESSTION_AGE = 10 * 60000; // 10 minutes

//##############################################################################
//                             inital packages
//##############################################################################

const path = require('path');
const express = require('express');
const app = express();
const exec = require("child_process").exec;
const fs = require('fs');
const { pamAuthenticate, pamErrors } = require('node-linux-pam');

var session = require('express-session');

// Use the session middleware
app.use(session({secret: 'keyboard cat', cookie: {maxAge: SESSTION_AGE}}));

// add assets path
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// for parse post
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies



app.get('/getProccess', function (req, res) {
    // check is user logined
    exec("pm2 jlist", (error, stdout, stderr) => {
        //do whatever here
        res.write(stdout);
        res.end();
    });
});
app.post('/addProccess', function (req, res) {
    // get json list from the json
    if (req.body.path === undefined) {
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
        return false;
    }

    // check is file exists
    if (fs.existsSync(req.body.path)) {
        // add process
        exec('pm2 start "' + req.body.path + '"', (error, stdout, stderr) => {
            // save notificarion
            // req.session.notication = error + '\n--------\n' + stdout + '\n--------\n' + stderr;
            if (error != null) {
                req.session.notication = error + stderr;
            } else {
                req.session.notication = 'Process:' + req.body.path + ' started successfully';
            }
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
            return true;
        });
    } else {

        // go back
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
        return false;
    }
});

app.get('/restart', function (req, res) {
    // check id exits
    if (req.query.id) {
        // restart the process
        exec("pm2 restart " + req.query.id, (error, stdout, stderr) => {
            res.writeHead(302, {
                'Location': '/'
            });
            // req.session.notication = error + '\n--------\n' + stdout + '\n--------\n' + stderr;
            if (error != null) {
                req.session.notication = error + stderr;
            } else {
                req.session.notication = 'Process by id :' + req.query.id + ' restarted successfully';
            }
            res.end();
        });

    }
});

app.get('/start', function (req, res) {
    // check id exits
    if (req.query.id) {
        // start the process
        exec("pm2 start " + req.query.id, (error, stdout, stderr) => {
            res.writeHead(302, {
                'Location': '/'
            });
            // req.session.notication = error + '\n--------\n' + stdout + '\n--------\n' + stderr;
            if (error != null) {
                req.session.notication = error + stderr;
            } else {
                req.session.notication = 'Process by id :' + req.query.id + ' started successfully';
            }
            res.end();
        });

    }
});

app.get('/stop', function (req, res) {
    // check id exits
    if (req.query.id) {
        // stop the process
        exec("pm2 stop " + req.query.id, (error, stdout, stderr) => {
            res.writeHead(302, {
                'Location': '/'
            });
            // req.session.notication = error + '\n--------\n' + stdout + '\n--------\n' + stderr;
            if (error != null) {
                req.session.notication = error + stderr;
            } else {
                req.session.notication = 'Process by id :' + req.query.id + ' stopped successfully';
            }
            res.end();
        });

    }
});

app.get('/delete', function (req, res) {
        // check id exits
        if (req.query.id) {
            // delete the process
            exec("pm2 delete " + req.query.id, (error, stdout, stderr) => {
                res.writeHead(302, {
                    'Location': '/'
                });
                // req.session.notication = error + '\n--------\n' + stdout + '\n--------\n' + stderr;
                if (error != null) {
                    req.session.notication = error + stderr;
                } else {
                    req.session.notication = 'Process by id :' + req.query.id + ' deleted successfully';
                }
                res.end();
            });

        }

});

app.get('/dump', function (req, res) {
        // save process
        exec("pm2 save", (error, stdout, stderr) => {
            res.writeHead(302, {
                'Location': '/'
            });
            //req.session.notication = error + '\n--------\n' + stdout + '\n--------\n' + stderr;
            if (error != null) {
                req.session.notication = error + stderr;
            } else {
                req.session.notication = 'current procceses dumped ( saved ) successfully';
            }
            res.end();
        });

});




app.get('/log', function (req, res) {
        if (req.query.id) {
            // log of the process
            var proc = require('child_process').spawn("pm2", ['log', req.query.id]);

            req.session.notication = '';
            proc.stdout.on('data', (data) => {
                req.session.notication = req.session.notication + data;
            });

            setTimeout(function () {
                proc.stdin.end();
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            }, 500);

        }

});

app.listen(PORT, function () {
    console.log('pm2panel app listening on port ' + PORT + '! \n test: http://localhost:' + PORT);
});