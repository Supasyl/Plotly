// select the dropdown menu input
let idDropdown = d3.select('#subjectID');

function init() {
// extract the data from json file
d3.json("static/data/samples.json").then((data) => {
    // variable for bar chart data
    let samples = (data.samples);
    
    // run through the data and add the information in dropdown
    samples.forEach((sample) => {
        Object.entries(sample).forEach(([key, value]) => {
            // add one line for each sample in the dropdown menu showing the ID value
            if (key === 'id') {idDropdown.append('option').text(value)};
        });
    }); 

    // variable for deomographic info
    let metadata = (data.metadata);
  
    // build card
    Object.entries(metadata[0]).forEach(([key, value]) => {
        if (key == 'id') {document.getElementById('p1').innerHTML = 'ID: ' + value};
        if (key == 'ethnicity') {document.getElementById('p2').innerHTML = 'Ethnicity: ' + value};
        if (key == 'gender') {document.getElementById('p3').innerHTML = 'Gender: ' + value};
        if (key == 'age') {document.getElementById('p4').innerHTML = 'Age: ' + value};
        if (key == 'location') {document.getElementById('p5').innerHTML = 'Location: ' + value};
        if (key == 'bbtype') {document.getElementById('p6').innerHTML = 'Belly Button type: ' + value};
        if (key == 'wfreq') {document.getElementById('p7').innerHTML = 'Washing frequency p/w: ' + value};
    });
        
    // variables for charts
    let ID1 = samples[0]
    ID1.sample_values.sort(function compareFunction(a, b) {
        return b - a;
    });
    let IDotu_ids = ID1.otu_ids;
    let IDsample_value = ID1.sample_values; 
    let IDotu_labels = ID1.otu_labels;

    // build bar chart
    let trace = {
        x: IDsample_value.slice(0, 10),
        y: IDotu_ids.slice(0, 10).map((id) => `OTU ID:${id}`),
        text: IDotu_labels.slice(0, 10),
        type: 'bar',
        orientation: 'h',
        connectgaps: 'true',
        marker: {color: 'burlywood'},        
    };
    let layout = {
        title: 'Top 10 OTUs',
        connecthaps: 'true',
        xaxis: {'title': 'OTU value'},
    };
    Plotly.newPlot('barChart', [trace], layout);
    
    // create bubble chart
    let bubble = {
        x: IDotu_ids,
        y: IDsample_value,
        mode: 'markers',
        marker: {size: IDsample_value,
                color: IDotu_ids},
        text: IDotu_labels,
    };
    let bubbleLayout = {
        title: 'All OTU samples for this ID with value for bubble size',
        xaxis: {'title': 'OTU number'},
        yaxis: {'title': 'OTU value'},
    };
    Plotly.newPlot('bubbleChart', [bubble], bubbleLayout);

    // create gauge chart
    let gauge = {
        domain: {row: 0, column: 1},
        value: metadata[0].wfreq,
        title: 'Scrubs per week',
        type: 'indicator',
        mode: 'gauge+number',
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

function updatePage() {
// extract the data from json file
d3.json("static/data/samples.json").then((data) => {
    // save the ID number to a variable
    chosenID = idDropdown.property('value');
    
    // variable for deomographic info
    let metadata = data.metadata;
    let metadataID = (metadata.filter(record => record.id == chosenID));
    metadataID = metadataID[0];
    
    // build card
    document.getElementById('p1').innerHTML = `ID: ${metadataID.id}`;
    document.getElementById('p2').innerHTML = `Ethnicity: ${metadataID.ethnicity}`;
    document.getElementById('p3').innerHTML = `Gender: ${metadataID.gender}`;
    document.getElementById('p4').innerHTML = `Age: ${metadataID.age}`;
    document.getElementById('p5').innerHTML = `Location: ${metadataID.location}`;
    document.getElementById('p6').innerHTML = `Belly Button type: ${metadataID.bbtype}`;
    document.getElementById('p7').innerHTML = `Washing frequency p/w: ${metadataID.wfreq}`;
        
    // variables for charts
    let samples = data.samples;
    let samplesID = samples.filter(record => record.id == chosenID);
    // change list (of one item) to a dictionary
    samplesID = samplesID[0];
    let x = samplesID.sample_values;
    let y = samplesID.otu_ids;
    let text = samplesID.otu_labels;

    // only sort list if there is more than 1 value
    if (y > 0) {
        y.sort(function compareFunction(a, b) {
            return b - a;
        });
    };

    // if sample size is under 10 items:
    if (y.length <= 10) {
        Plotly.restyle("barChart", "x", [x]);
        Plotly.restyle("barChart", "y", [y.map((id) => `OTU ID: ${id}`)]);
        Plotly.restyle("barChart", "text", [text]);
    };

    // if more than 10 items: shorten list & charts
    if (y.length > 10) {
        xSlice = x.slice(0, 10);
        ySlice = y.slice(0, 10);
        textSlice = text.slice(0, 10);

        Plotly.restyle("barChart", "x", [xSlice]);
        Plotly.restyle("barChart", "y", [ySlice.map((id) => `OTU ID: ${id}`)]);
        Plotly.restyle("barChart", "text", [textSlice]);
        Plotly.restyle("barChart", "yaxis.tickvals", [ySlice]);
        Plotly.restyle("barChart", "yaxis.ticktext", [`OTU ID: ${textSlice}`]);
    };
    
    // Plotly.restyle("bubbleChart", bubbleRestyle);
    Plotly.restyle("bubbleChart", "x", [samplesID.otu_ids]);
    Plotly.restyle("bubbleChart", "y", [samplesID.sample_values]);
    Plotly.restyle("bubbleChart", "text", [text]);
    Plotly.restyle("bubbleChart", "marker.size", [x]);
    Plotly.restyle("bubbleChart", "marker.color", [y]);

    // update gauge chart
    Plotly.restyle("gaugeChart", "value", [metadataID.wfreq]);
});  
};

// Add event listener for ID change button
d3.select("#subjectID").on("change", updatePage);