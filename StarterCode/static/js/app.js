//function to pull the data with by id
function demoInfo(id) {
    // read in the jason data
        d3.json("samples.json").then((data)=> {
    // collent the metadata for the demographic panel in the html file
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // metadata fileterd info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // inject the data into the demo panel in the html
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the dmeo panel each time
           demographicInfo.html("");
    
         // inject demographic data for the id and append the info to the panel html
            Object.entries(result).forEach((i) => {   
                demographicInfo.append("h5").text(i[0].toUpperCase() + ": " + i[1] + "\n");    
            });
        });
    }
// create function for graphs
    function Plots(id) {
        //Read samples.json
            d3.json("samples.json").then (sampledata =>{
                console.log(sampledata)
                var ids = sampledata.samples[0].otu_ids;
                console.log(ids)
                var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
                console.log(sampleValues)
                var labels =  sampledata.samples[0].otu_labels.slice(0,10);
                console.log (labels)
            // get only top 10 otu ids for the plot OTU and reversing it. 
                var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            // get the otu id's to the desired form for the plot
                var OTU_id = OTU_top.map(d => "OTU " + d);
                console.log(`OTU IDS: ${OTU_id}`)
             // get the top 10 labels for the plot
                var labels =  sampledata.samples[0].otu_labels.slice(0,10);
                console.log(`OTU_labels: ${labels}`)
                var trace = {
                    x: sampleValues,
                    y: OTU_id,
                    text: labels,
                    marker: {
                    color: 'blue'},
                    type:"bar",
                    orientation: "h",
                };
                // create data variable array from object
                var data = [trace];
        
                // create layout variable to set plots layout
                var layout = {
                    title: "Top 10 OTU",
                    yaxis:{
                        tickmode:"linear",
                    },
                    margin: {
                        l: 100,
                        r: 100,
                        t: 100,
                        b: 30
                    }
                };
        
                // create the bar plot
            Plotly.newPlot("bar", data, layout);
                // set up the bubble chart
                var trace1 = {
                    x: sampledata.samples[0].otu_ids,
                    y: sampledata.samples[0].sample_values,
                    mode: "markers",
                    marker: {
                        size: sampledata.samples[0].sample_values,
                        color: sampledata.samples[0].otu_ids
                    },
                    text:  sampledata.samples[0].otu_labels
        
                };
        
                // set the layout for the bubble plot
                var layout_2 = {
                    xaxis:{title: "OTU ID"},
                    height: 600,
                    width: 1000
                };
        
                // creating data variable 
                var data1 = [trace1];
        
            // create the bubble plot
            Plotly.newPlot("bubble", data1, layout_2); 
            
          });
        }  

// function for optionChanged event in html to call the other functions

function optionChanged(id) {
      Plots(id);
      demoInfo(id);
  }

// create initalize funtion to render everything together

function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        Plots(data.names[0]);
        demoInfo(data.names[0]);
    });
}

// call the init to start program
init();

//d3.json("samples.json").then((data) => {
 //   console.log(data);

//});