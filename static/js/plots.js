// reading in the data
// const data = 'static/data/samples.json';   
// console.log(data);

// // variable for identities
// let subjectID = Object.keys(data)[0];
// console.log(subjectID);

// const dataPromise = d3.json('static/data/samples.json');
// console.log("Data Promise: ", dataPromise);

function buildPlot() {
    d3.json('static/data/samples.json').then(function(data) {
      // Grab values from the data json object to build the plots
      let subjectID = data.names;
    });
};
buildPlot();
console.log(subjectID);