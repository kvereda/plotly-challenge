// data retrieval
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  

// label + plot building
function buildingPlot(id) {

    d3.json("data/samples.json").then(sampledata=> {
        var otu_ids = sampledata.samples[0].otu_ids;
        // 10 sample values for plots
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        // 10 labels for plots
        var otu_labels = sampledata.samples[0].otu_labels.slice(0,10);

        
        // 10 id values for plots
        var idValues = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // 10 otu ids for plots
        var otuID = idValues.map(d => "OTU" + d);
        
        // begin building plot
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        // trace for bar plot + variable data + layout
        var trace = {
            x:sampleValues,
            y:otuID,
            text:labels,
            type:"bar",
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };
        
    Plotly.newPlot("bar", data, layout);//end of bar plot
        
        // trace for bubble chart + variable data + layout
        var bubbleTrace = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            text: sampledata.samples[0].otu_labels,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids,
                colorscale: "Blues"
            },
        };

        var bubbleLayout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200,
            hovermode: "closests"
        };

        var data1 = [bubbleTrace];
        
    Ploty.newPlot("bubble", data1, bubbleLayout);
    //end of bubble chart

        // trace for pie chart + variable data + layout
        var pieTrace = {
            labels: otuID,
            values: sampleValues,
            type: "pie",
        };

        var data2 = [pieTrace];

    Plotly.newPlot("pie", data2, pieTrace);
    //end of pie chart
    });
}

// retrive info
function retrievingInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;

        // filter metadata
        var metadata_id = metadata.filter(meta => meta.id.toString() === id)[0];
        var metaInfo = d3.select("#sample-metadata");//end of filter

        metaInfo.html("");

            Object.entries(metadata_id).forEach((key) => {   
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
//  event change
function eventChange(id) {
    buildingPlot(id);
    retrievingInfo(id)
}

// render data
function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        // console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        buildingPlot(data.names[0]);
        retrievingInfo(data.names[0]);
    });
}

init();

