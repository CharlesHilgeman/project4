console.log(data);

// function higher(people) {
//   return people.salary = ">50k";
// }

// function lower(people) {
//   return people.salary = "<=50k";
// }

// // Call the custom function with filter()
// let higherPeople = data.filter(higher);
// let lowerPeople = data.filter(lower);

// // Trace for the Greek Data
// let trace1 = {
//     x: higherPeople.map(row => row.occupation),
//     y: higherPeople.map(row => row.hours),
//     type: "bar",
//     name: 'Above Average Income'
//   };

// let trace2 = {
//     x: lowerPeople.map(row => row.occupation),
//     y: lowerPeople.map(row => row.hours),
//     type: "bar",
//     name: 'Below Average Income'
// };

// // Data trace array
// let traceData = [trace1, trace2];

// // Apply the group barmode to the layout
// let layout = {
//   title: "Weekly Hours by Profession",
//   barmode: 'stack'
// };

// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("totalplot", traceData, layout);

let jobs = ['Adm-clerical', 'Armed-Forces','Craft-repair','Exec-managerial', 'Farming-fishing','Handlers-cleaners', 'Machine-op-inspct','Other-service','Priv-house-serv','Prof-specialty','Protective-serv','Sales','Tech-support','Transport-moving']

let metric = "hours"

function plotMetric(data, jobs, metric) {

  let lowmetricArray = []
  let highmetricArray = []

  for (let i =0; i < jobs.length; i++) {
    job = jobs[i]

    let lowercount = 0;
    let lowertotal = 0;
    let highercount = 0;
    let highertotal = 0;

    for (let j = 0; j < data.length; j++) {
      row = data[j];

      if (row.occupation == job){

        if (row.salary == "<=50K") {
          lowertotal += row[metric];
          lowercount += 1
        }

        else {
          highertotal += row[metric];
          highercount += 1
        }
      }
    }

    let lowmeanValue = lowertotal/lowercount
    let highmeanValue = highertotal/highercount


    lowmetricArray.push(lowmeanValue)
    highmetricArray.push(highmeanValue)
  }
  
  let trace1 = {
    x: jobs,
    y: lowmetricArray,
    type: "bar",
    name: "Below Average Income"
  }

  let trace2 = {
    x: jobs,
    y: highmetricArray,
    type: "bar",
    name: "Above Average Income"
  }

  let traceData = [trace1,trace2]

  let layout = {
    title: `Average by Profession for ${metric}`,
    barmode: 'group'
  };

  Plotly.newPlot("plot", traceData, layout);
}

plotMetric(data, jobs, metric)