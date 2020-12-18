
// select the dropdown menu input
let idDropdown = d3.select('#subjectID');
chosenID = idDropdown.property('value');

function init() {
// extract the data from json file
d3.json("static/data/samples.json").then((data) => {
    // variable for bar chart data
    let samples = (data.samples);
    console.log(samples);
    
    // run through the data and add the information in dropdown
    samples.forEach((sample) => {
        Object.entries(sample).forEach(([key, value]) => {
            // add one line for each sample in the dropdown menu showing the ID value
            if (key === 'id') {idDropdown.append('option').text(value)};
        });
    }); 

    // variable for deomographic info
    let metadata = (data.metadata);
    console.log(metadata);
    // build card
    Object.entries(metadata[0]).forEach(([key, value]) => {
        if (key == 'id') {document.getElementById('p1').innerHTML = 'id: ' + value};
        if (key == 'ethnicity') {document.getElementById('p2').innerHTML = 'ethnicity: ' + value};
        if (key == 'gender') {document.getElementById('p3').innerHTML = 'gender: ' + value};
        if (key == 'age') {document.getElementById('p4').innerHTML = 'age: ' + value};
        if (key == 'location') {document.getElementById('p5').innerHTML = 'location: ' + value};
        if (key == 'bbtype') {document.getElementById('p6').innerHTML = 'bbtype: ' + value};
        if (key == 'wfreq') {document.getElementById('p7').innerHTML = 'wfreq: ' + value};
    });
        
    // build bar chart
    let ID1 = samples[0]
    ID1.sample_values.sort(function compareFunction(a, b) {
        return b - a;
    });
    let IDotu_ids = ID1.otu_ids;
    let IDsample_value = ID1.sample_values; 
    let IDotu_labels = ID1.otu_labels;
    
    console.log(IDotu_ids);
    console.log(IDsample_value);
    console.log(IDotu_labels);
    
    let trace = {
        x: IDsample_value.slice(0, 10),
        y: IDotu_ids.slice(0, 10),
        width: 20,
        text: IDotu_labels.slice(0, 10),
        type: 'bar',
        orientation: 'h',
        // type: 'relative',
    };
    let layout = {
        title: 'Top 10 OTUs',
        xaxis: IDsample_value.slice(0, 10),
        // bargap: 0.8,
        // yaxis: 'OTU ID: ' + IDotu_ids,
    };
    Plotly.newPlot('barChart', [trace], layout);
    
    // create bubble chart
    let bubble = {
        x: IDotu_ids,
        y: IDsample_value,
        mode: 'markers',
        marker: {size: IDsample_value}
    };
    let bubbleLayout = {
        title: 'All OTU samples for this ID with value for bubble size',
    };
    Plotly.newPlot('bubbleChart', [bubble], bubbleLayout);

    // create gauge chart
    let gauge = {
        domain: {row: 0, column: 1},
        value: metadata[0].wfreq,
        title: 'Scrubs per week',
        type: 'indicator',
        mode: 'gauge',
        gauge: {
            axis: {range: [0, 9]},
            bar: {color: 'darkblue'},
            steps: [
                {range: [0, 1], color: 'red'},
                {range: [1, 2], color: 'darksalmon'},
                {range: [2, 3], color: 'darksalmon'},
                {range: [3, 4], color: 'lightgoldenrodyellow'},
                {range: [4, 5], color: 'lightgoldenrodyellow'},
                {range: [5, 6], color: 'palegreen'},
                {range: [6, 7], color: 'palegreen'},
                {range: [7, 8], color: 'chartreuse'},
                {range: [8, 9], color: 'chartreuse'},
            ]
        }
    }
    Plotly.newPlot('gaugeChart', [gauge]);
});  
};
init();

// Add event listener for ID change button
d3.select("#subjectID").on("change", updatePage(chosenID));

function updatePage(chosenID) {
// extract the data from json file
d3.json("static/data/samples.json").then((data) => {
    // prevent enter from refreshing the page
    d3.event.preventDefault();

    // build card
    let metadata = (data.metadata);
    console.log(metadata);
    // build card
    metadata = metadata.filter()

    Object.entries(metadata[0]).forEach(([key, value]) => {
        if (key == 'id') {document.getElementById('p1').innerHTML = 'id: ' + value};
        if (key == 'ethnicity') {document.getElementById('p2').innerHTML = 'ethnicity: ' + value};
        if (key == 'gender') {document.getElementById('p3').innerHTML = 'gender: ' + value};
        if (key == 'age') {document.getElementById('p4').innerHTML = 'age: ' + value};
        if (key == 'location') {document.getElementById('p5').innerHTML = 'location: ' + value};
        if (key == 'bbtype') {document.getElementById('p6').innerHTML = 'bbtype: ' + value};
        if (key == 'wfreq') {document.getElementById('p7').innerHTML = 'wfreq: ' + value};
    });
    // update bar chart
    if (sample_values.id == chosenID) {
        let x = otu_ids.slice(0, 10);
        let y = sample_values.slice(0, 10);
        let text = otu_labels.slice(0, 10);
    }
    Plotly.restyle("barChart", "x", [x]);
    Plotly.restyle("barChart", "y", [y]);
    Plotly.restyle("barChart", "text", [text]);
});
};