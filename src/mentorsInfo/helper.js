/**
 *
 * @param {*} tasks  array of tasks from Tasks.xlsx
 * return array of type {task: ..., status: ...}
 */
const parseTasks = tasks => {
    const parsedTasks = [];
    tasks.map(task => {
        parsedTasks.push({
            task: task.task,
            link: task.link,
            status: task.status,
        });
        return true;
    });
    parsedTasks.push({ task: 'Presentation', link: '', status: 'Checked' });
    return parsedTasks;
};

/**
 *
 * @param {*} array array of pairs interwiver - student from mentorStudentPairs
 * return list of studentes' github accounts
 */
const makeStudentList = array => {
    const dataArray = array.slice();

    const studentsList = dataArray.map(data => {
        const student = {};
        student.gitHub = `${data['student']}`;
        return student;
    });
    return studentsList;
};

/**
 *
 * @param {*} studentAccountsArray list of gitHub accounts of students
 * @param {*} tasksArray gives data about score for every task
 * return an array of data for every student with score for every completed task
 */
const connectStudentTasks = (studentAccountsArray, tasksArray) => {
    const students = studentAccountsArray.slice();
    const tasks = tasksArray.slice();

    students.map(student => {
        const arr = tasks.filter(
            task =>
                task['studentGithub'].toLowerCase() ===
                `https://github.com/${student.gitHub.toLowerCase()}`,
        );
        arr.map(val => {
            if (!student[val['task']]) {
                student[val['task']] = val['taskScore'];
            }
            return student;
        });
        return student;
    });
    return students;
};

/**
 *
 * @param {*} mentorArr array with mentors gitHub accounts
 * @param {*} pairsArr array with mentors and students gitHyb accounts
 * return an array with data about mentors and include data about students of the mentor
 */
const connectMentorStudent = (mentorArr, pairsArr) => {
    const mentArr = mentorArr;
    const pairs = pairsArr;
    mentArr.forEach(mentor => {
        const students = [];
        const mentName = `${mentor.name} ${mentor.surname}`;
        pairs.map(pair => {
            if (pair.mentor === mentName) {
                students.push(pair['student']);
            }
        });
        mentor.students = students;
    });

    return mentArr;
};

exports.parseTasks = parseTasks;
exports.makeStudentList = makeStudentList;
exports.connectStudentTasks = connectStudentTasks;
exports.connectMentorStudent = connectMentorStudent;
