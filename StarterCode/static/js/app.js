// data retrieval
function retrievingInfo(id) {
    d3.json("data/samples.json").then((data)=> {
        let metadata = data.metadata;
        console.log(metadata)

        let metadataResults = metadata.filter(metadata => metadata.id.toStrings() === id)[0];

        let sampleAll = d3.select("#sample-metadata");

        sampleAll.html("");

        Object.entries(metadataResults).forEach(([key, value]) => {
                sampleAll.append("h5").text("${key}: ${key}:${value}");
        });
    });
}

// building plots
function buildingplot(id) {

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        let washingSample = data.metadata.map(d => d.washingSample)
        console.log("Washing Sample: ${washingSample}")
        // filter by id
        let samples = data.samples.filter(samples => samples.id.toStrings() === id)[0];
        console.log(samples);
        // 10 sample values for plots
        let sampleValues = samples.sample_values.slice(0,10).reverse();
        // 10 id values for plots
        let idvalues = (samples.otu_ids.slice(0, 10)).reverse();
        // 10 otu ids for plots
        let otuID = idValues.map(d => "OTU" + d)
        console.log("OTU IDS: ${otuID}")
        // 10 labels for plots
        let labels = samples.otu_labels.slice(0,10);
        console.log("Sample Values: ${sampleValues}")
        console.log("Id Values: ${idValues}")


        // trace for bar plot + variable data + layout
        let bartrace = {
            x:sampleValues,
            y:otuID,
            text:labels,
            type:"bar",
            orientation: "h",
        };

        let data = [trace];

        let layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l:100,
                r:100,
                t:30,
                b:20
            }
        };
        
        Plotly.newPlot("bar", data, layout);
        // console.log("ID: ${samples.otu_ids")

        // trace for bubble chart + variable data + layout
        let bubbleTrace = {
            x: metadataResults.otu_ids,
            y: metadataResults.sample_values,
            text: metadataResults.otu_labels,
            mode: "markers",
            marker: {
                size: metadataResults.sample_values,
                color: metadataResults.otu_ids,
                colorscale: "Blues"
            },
            
        };

        let bubbleLayout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200,
            hovermode: "closests"
        };
        let data = [bubbleTrace]
        let layout = [bubbleLayout]
        Ploty.newPlot("bubble", data, layout);


        // trace for pie chart + variable data + layout
        let pietrace = {
            labels: otuID,
            values: sampleValues,
            type: "pie",
        }

        let data = [pietrace]
        Plotly.newPlot("pie", data)
    });
}



//  event change
function eventChange(id) {
    buildingPlot(id);
    retrievingInfo(id); 
}

// render data
function init() {
    let dropdown = d3.select("#selDataset");
    d3.json("data/samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        buildingPlot(data.names[0]);
        retrievingInfo (data.names[0]);
    });
}

init();

