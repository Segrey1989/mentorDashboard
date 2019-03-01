// require('../googleApi/index.js');

const makeJson = require('../src/mentorsInfo/index');
const mentors = Array.from(JSON.parse(makeJson.makeMentorsJson()));

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let router = express.Router();

app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.static(__dirname));

const apiRoot = router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/', apiRoot);
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

const apiMentors = router.get('/mentors', (request, response) => {
  response.send(makeJson.makeMentorsJson());
});

const apiStudents = router.get('/students', (request, response) => {
  response.send(makeJson.makeStudentsJson());
});

const apiTasks = router.get('/tasks', (request, response) => {
  response.send(makeJson.makeTasksJson());
});

app.use('/mentors', apiMentors);
app.use('/students', apiStudents);
app.use('/tasks', apiTasks);

app.use('/:github', function(request, response) {
  const mentorGithub = request.params.github;
  const chosenMentor = mentors.find(mentor => {
    if (mentor.github === `https://github.com/${mentorGithub}`) {
      return mentor;
    }
  });
  if (chosenMentor) response.send(JSON.stringify(chosenMentor));
  else response.send(false);
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send('Something broke!');
});

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
