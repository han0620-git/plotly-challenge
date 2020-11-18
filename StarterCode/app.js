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

