const { google } = require('googleapis');
const fs = require('fs');

// get data from
// https://docs.google.com/spreadsheets/d/1uojrkWfoLh9oTKxLWCdirrNJYGVfCtiF9RlZrwsxSbo/edit#gid=0
const makeTasks = data => {
    const arr = data.map(val => {
        const task = {};
        task.task = val[0];
        task.link = val[1];
        task.status = val[2];
        return task;
    });

    const json = JSON.stringify(arr);

    fs.writeFile('./googleApi/data/tasks.json', json, () => {
        console.log('Done makeTasks');
    });
};

// get data from
// https://docs.google.com/spreadsheets/d/18exMEOWGKsMPggt0t3yU-MR1gvX3OFBDqKCvdNy8rAU/edit#gid=104739544
const makeMentorScore = data => {
    const arr = data.map(val => {
        const mentor = {};
        mentor.mentorGithub = val[0];
        mentor.studentGithub = val[1];
        mentor.task = val[2];
        mentor.pullrequest = val[3];
        mentor.taskScore = val[4];
        return mentor;
    });
    const json = JSON.stringify(arr);
    fs.writeFile('./googleApi/data/mentorScore.json', json, () =>
        console.log('Done makeMentorScore'),
    );
};

// get data from
// https://docs.google.com/spreadsheets/d/1-HYzpnEYpIsv5qSSuSZCgKf5-mYnG0T3Xt864Hhdnew/edit#gid=546989257
const makeMentorStudentPairs = data => {
    const arr = data.map(val => {
        const mentorStudentPairs = {};
        mentorStudentPairs.mentor = val[0];
        mentorStudentPairs.student = val[1];
        return mentorStudentPairs;
    });

    const json = JSON.stringify(arr);
    fs.writeFile('./googleApi/data/mentorStudentPairs.json', json, () =>
        console.log('Done makeMentorStudentPairs'),
    );
};

// get data from
// https://docs.google.com/spreadsheets/d/1-HYzpnEYpIsv5qSSuSZCgKf5-mYnG0T3Xt864Hhdnew/edit#gid=1469766595
const getMentorFullName = data => {
    const arr = data.map(val => {
        const mentor = {};
        mentor.name = val[0];
        mentor.surname = val[1];
        mentor.city = val[2];
        mentor.numberOfStudents = val[3];
        mentor.github = val[4];
        return mentor;
    });

    const json = JSON.stringify(arr);
    fs.writeFile('./googleApi/data/secondNameToGithub.json', json, () =>
        console.log('Done getMentorFullName'),
    );
};

const getSpredsheetValues = (auth, id, range, func) => {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get(
        {
            spreadsheetId: id,
            range: range,
        },
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);

            const rows = res.data.values;
            func(rows);
        },
    );
};

module.exports = {
    makeTasks,
    makeMentorScore,
    makeMentorStudentPairs,
    getMentorFullName,
    getSpredsheetValues,
};
