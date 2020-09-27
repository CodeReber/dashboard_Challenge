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

// function for optionChanged event in html to call the other functions

function optionChanged(id) {
    //  getPlots(id);
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
     //   getPlots(data.names[0]);
        demoInfo(data.names[0]);
    });
}

// call the init to start program
init();

//d3.json("samples.json").then((data) => {
 //   console.log(data);

//});