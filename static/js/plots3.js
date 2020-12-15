



// Add event listener for ID change button
d3.select("#subjectID").on("change", updatePage(chosenID));

function updatePage(chosenID) {
    d3.event.preventDefault();

    // build card
    if (metadata.id == chosenID) {
        d3.select('#card-body').append('p').text('id: ${metadata.id}');
        d3.select('#card-body').append('p').text('id: ${metadata.ethnicity}');
        d3.select('#card-body').append('p').text('id: ${metadata.gender}');
        d3.select('#card-body').append('p').text('id: ${metadata.age}');
        d3.select('#card-body').append('p').text('id: ${metadata.location}');
        d3.select('#card-body').append('p').text('id: ${metadata.bbtype}');
        d3.select('#card-body').append('p').text('id: ${metadata.wfreq}');
    }

    // build bar chart
    if (sample_values.id == chosenID) {
        let x = otu_ids.slice(0, 10);
        let y = sample_values.slice(0, 10);
        let text = otu_labels.slice(0, 10);
    }
    Plotly.restyle("barChart", "x", [x]);
    Plotly.restyle("barChart", "y", [y]);
    Plotly.restyle("barChart", "text", [text]);
}