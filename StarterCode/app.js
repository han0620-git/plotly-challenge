// id="selDataset" in the index.html
var select_tag = d3.select("#selDataset");

d3.json("samples.json").then((importedData) => {
  var subject_ids = importedData.names;

  console.log("Subject_ids")
  console.log(subject_ids)

  subject_ids.forEach((id) => {
    select_tag
      .append("option")
      .property("value", id)
      .text(id);
  });

  // index.html is loaded with the dashboard of 940 for the initial page load
  optionChanged(subject_ids[0]);
});

// The function is triggered by an option change in the Dropdown box of "Test Subject ID No" in index.html
// <select id="selDataset" onchange="optionChanged(this.value)">
function optionChanged(selected_id) {
  console.log("selected_id=", selected_id);

  d3.json("samples.json").then((data) => {
    //   Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // * Use`sample_values` as the values for the bar chart.
    // * Use`otu_ids` as the labels for the bar chart.
    // * Use`otu_labels` as the hovertext for the chart.

    var samples = data.samples;
    var results = samples.filter(sampleObj => sampleObj.id == selected_id);

    console.log("samples: ");
    console.log(samples);

    var result = results[0];

    console.log("result: ");
    console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var bar_trace = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [bar_trace];

    var bar_layout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", data, bar_layout);

    //==================================================

    // Create a bubble chart that displays each sample.
    // * Use`otu_ids` for the x values.
    // * Use`sample_values` for the y values.
    // * Use`sample_values` for the marker size.
    // * Use`otu_ids` for the marker colors.
    // * Use`otu_labels` for the text values.

    var results = samples.filter(sampleObj => sampleObj.id == selected_id);
    var result = results[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    var data = [bubble_trace];

    var bubble_layout = {
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };

    Plotly.newPlot("bubble", data, bubble_layout);
  });
  //====================================================

  // Demorgrphic info
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    console.log("metadata");
    console.log(metadata);

    var results = metadata.filter(metadataObj => metadataObj.id == selected_id);
    var result = results[0];

    console.log("metadata")
    console.log(metadata)

    var fig = d3.select("#sample-metadata");

    fig.html("");

    Object.entries(result).forEach(([key, value]) => {
      fig.append("h5").text(`${key}: ${value}`);
    });

  });
}
