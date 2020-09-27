//get data func
function getdemo_info(id){
    // d3 to reach jason data
    d3.json("samples.json").then((data) => {
        console.log(data);
       // get meta for demo panel
        var metadata = data.metadata;
        // filter it by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0]
        // select panel to put data in
        var demoInfo = d3.select("#sample-metadata");

        // empyt the data in info panel
        demoInfo.html("");
        // get the data and from id and append it into the info panel
        Object.entries(result).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");

        });

    });
}

// function for optionChanged event in html to call the other functions

function optionChanged(id){
    getdemo_info(id);
}

// create initalize funtion to render everything together

function init(){
    // select the dropdown menu in html
    var dropdown = d3.select("#selData");

    // read in data
    d3.json("samples.json").then((data)=> {
        console.log(data)

        //inject the id to  the dropdown
        data.names.forEach(function(name) {
           dropdown.append("option").text(name).property("value");
        });
        //call the function to display the data
        getdemo_info(data.names[0]);

       
    });

}

// call the init to start program
init();

//d3.json("samples.json").then((data) => {
 //   console.log(data);

//});