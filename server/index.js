require('../googleApi/index.js');

setTimeout(() => {
  const makeJson = require('../src/mentorsInfo/index');
  const mentors = Array.from(JSON.parse(makeJson.makeMentorsJson()));

  const express = require('express');
  const app = express();
  const port = 3000;

  app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get('/mentors', (request, response) => {
    response.send(makeJson.makeMentorsJson());
  });

  app.get('/students', (request, response) => {
    response.send(makeJson.makeStudentsJson());
  });

  app.get('/tasks', (request, response) => {
    response.send(makeJson.makeTasksJson());
  });

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
}, 3000);
