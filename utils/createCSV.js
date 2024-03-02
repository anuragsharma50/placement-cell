import { AsyncParser } from '@json2csv/node';

export const createCSV = async (data) => {
    const opts = {};
    const transformOpts = {};
    const asyncOpts = {};
    const parser = new AsyncParser(opts, asyncOpts, transformOpts);

    const arrangedData = [];

    data.forEach(item => {
        let tempObj = {};
        tempObj["Student id"] = item.student.studentDetails.studentId;
        tempObj["student name"] = item.student.studentDetails.name;
        tempObj["student college"] = item.student.studentDetails.college;
        tempObj["student status"] = item.student.studentDetails.status;
        tempObj["DSA Final Score"] = item.student.coursesScore.DSAFinalScore;
        tempObj["WebD Final Score"] = item.student.coursesScore.webDFinalScore;
        tempObj["React Final Score"] = item.student.coursesScore.reactFinalScore;
        tempObj["interview company"] = item.interview.companyName;
        tempObj["interview date"] = new Date(item.interview.date).toISOString().split('T')[0];
        tempObj["interview student result"] = item.result;
        arrangedData.push(tempObj);
        tempObj = {};
    })
    
    const csv = await parser.parse(arrangedData).promise();
    return csv;
}
