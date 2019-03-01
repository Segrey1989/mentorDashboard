const {
    parseTasks,
    makeStudentList,
    connectStudentTasks,
    connectMentorStudent,
} = require('./helper');
const fs = require('fs');

let mentors = require('../../googleApi/data/secondNameToGithub.json');
const pairs = require('../../googleApi/data/mentorStudentPairs.json');
const mentorScore = require('../../googleApi/data/mentorScore.json');
let tasksArray = require('../../googleApi/data/tasks.json');

// correction of student's gitHubs (should be string for feather processing in TableComponent )
pairs.map(pair => {
    if (typeof pair['student'] !== 'string') {
        pair['student'] = pair['student'] + '';
    }
    return pair;
});

// delete extra spaces
mentorScore.map(task => (task['task'] = task['task'].trim()));

//array of type {task: ..., status: ...}
const parsedTasks = parseTasks(tasksArray);

// array of type { gitHub: 'chekni', task: score, ...}
const studentsAccountList = makeStudentList(pairs);

// mentor info
// array of  { Name: ..., Surname: .., City: .., Count: .., GitHub: .., students:[...] },
mentors = connectMentorStudent(mentors, pairs);

// массив объектов студент + таски + оценка за каждый таск
const studentsList = connectStudentTasks(studentsAccountList, mentorScore);

const makeMentorsJson = () => {
    const json = JSON.stringify(mentors, 0, 2);
    return json;
};

const makeStudentsJson = () => {
    const json = JSON.stringify(studentsList, 0, 2);
    return json;
};

const makeTasksJson = () => {
    const json = JSON.stringify(parsedTasks, 0, 2);
    return json;
};

module.exports = { makeMentorsJson, makeStudentsJson, makeTasksJson };
