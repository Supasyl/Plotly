// empty lists for variables
let subjectID = [];
let otu_ids = [];
let sample_values = [];
let otu_labels = [];
let idDropdown = d3.select('#subjectID');

function readJSON() {
// extract the data from json file
d3.json("static/data/samples.json").then((data) => {
    // variable for bar chart data
    let samples = (data.samples);
    console.log(samples);
    // variable for deomographic info
    let metadata = (data.metadata);
    console.log(metadata);
    
    // run through the bar chart data and add the information in dropdown and variables
    samples.forEach((sample) => {
        Object.entries(sample).forEach(([key, value]) => {
            // list of ID's for the drop down list & add one line for each sample in the dropdown menu
            if (key === 'id') {subjectID.push(value) && idDropdown.append('option').text(value)};
            // list of otu ids for the bar chart
            if (key === 'otu_ids') {otu_ids.push(value)};
            // list of values for the bar chart
            if (key === 'sample_values') {sample_values.push(value)};
            // list of labels for the bar chart
            if (key === 'otu_labels') {otu_labels.push(value)};
        });
    }); 
    chosenID = idDropdown.property('value');
    console.log(sample_values);
    console.log(otu_ids); 
    console.log(metadata[0][0]);
    // console.log(metadata.id[0]);

    // build card
    d3.select('#card-body').append('p').text(metadata[0][0]);
    d3.select('#card-body').append('p').text('id: ${metadata.ethnicity}');
    d3.select('#card-body').append('p').text('id: ${metadata.gender}');
    d3.select('#card-body').append('p').text('id: ${metadata.age}');
    d3.select('#card-body').append('p').text('id: ${metadata.location}');
    d3.select('#card-body').append('p').text('id: ${metadata.bbtype}');
    d3.select('#card-body').append('p').text('id: ${metadata.wfreq}');
        
        
    // build bar chart
    let IDotu_ids = otu_ids[0].slice(0, 10);
    let IDsample_value = sample_values[0].slice(0, 10); 
    let IDotu_labels = otu_labels[0].slice(0, 10);
    console.log(IDotu_ids);

    
    let trace1 = {
        type: 'bar',
        x: IDsample_value,
        y: IDotu_ids,
        text: IDotu_labels,
        orientation: 'h',
    }
    let layout = {
        title: 'Top 10 OTUs',
        xaxis: IDsample_value,
        yaxis: 'OTU ID ${IDotu_ids}',
    }
    Plotly.newPlot('barChart', trace1, layout);
 
});  
};
readJSON();
