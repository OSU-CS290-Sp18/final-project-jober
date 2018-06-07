var fs = require('fs');

function written(){console.log("The file was saved!");}

var contractor = {
  name: "Mike L",
  skills: ["fencing", "thugging"],
  availability: "Mon - Fri",
  comments: [],
  jobs: [],
  rating: 0
};
// contractor = JSON.stringify(contractor);
// fs.writeFile('./dummy/dummy-contractor.json', contractor, 'utf8', written);

var employer = {
  name: "jimmey cool",
  jobs: []
};
// employer = JSON.stringify(employer);
// fs.writeFile('./dummy/dummy-employer.json', employer, 'utf8', written);

var job = {
  author_id: "", //hex _id value
  name: "jimmey cool",
  title: "Need someone who is okay to perfrom illegal activities",
	price: "$20-$50",
	timestamp: "May 25 2018 - 1:02am",
	description: "I gotta take care of my side hustle stuff, must be down to do some of that hoodrat shit",
  skills: ["fencing", "thieving", "thugging"],
  comments: [] //fill with comment id's
};
// job = JSON.stringify(job);
// fs.writeFile('./dummy/dummy-job.json', job, 'utf8', written);

var comment = {
  author_id: "",
  name: "Mike L",
  timestamp: "May 25 2018 - 1:11am",
  text: "Ay howabout 60, seasoned dirtbag here"
};
// comment = JSON.stringify(comment);
// fs.writeFile('./dummy/dummy-comment.json', comment, 'utf8', written);

module.exports = {
  contractor: contractor,
  employer: employer,
  job: job,
  comment: comment
}
