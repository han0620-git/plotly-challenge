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

