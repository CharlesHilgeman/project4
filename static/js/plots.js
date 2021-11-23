console.log(data);

let jobs = ['Adm-clerical', 'Armed-Forces','Craft-repair','Exec-managerial', 'Farming-fishing','Handlers-cleaners', 'Machine-op-inspct','Other-service','Priv-house-serv','Prof-specialty','Protective-serv','Sales','Tech-support','Transport-moving']
let workingClass = ['Federal-gov', 'Local-gov', 'Private','Self-emp-inc','Self-emp-not-inc','State-gov','Without-pay']

let metric = "hours"

function plotMetric(data, jobs, metric) {
// bar graph
  let lowmetricArray = []
  let highmetricArray = []
  let totalmetricArray = []

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
    let totalmeanValue = (lowertotal+highertotal)/(lowercount+highercount)


    lowmetricArray.push(lowmeanValue)
    highmetricArray.push(highmeanValue)
    totalmetricArray.push(totalmeanValue)
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
// bubble chart
  let trace3 = {
    x: jobs,
    y: workingClass,
    text: totalmetricArray,
    mode: 'markers',
    marker: {
      size: totalmetricArray,
      color: ['rgb(128,0,0)','rgb(128,0,128)','rgb(255,0,255)','rgb(0,128,0)','rgb(128,128,0)','rgb(0,0,128)','rgb(0,255,255)']}
  }

  let traceData = [trace1,trace2]
  let bubbleData = [trace3]

  let layout = {
    title: `Average by Profession for ${metric}`,
    barmode: 'group'
  };
  let bubbleLayout = {
    title: 'Jobs vs Work Class'
  };

  Plotly.newPlot("plot", traceData, layout);
  Plotly.newPlot('bubble', bubbleData, bubbleLayout)
//histogram
  var histx = [];
  var femalecount = 0;
  var malecount = 0;
  var barx = [];

  for (let k = 0; k < data.length; k++) {
    if (data.salary=">50K"){
      histx.push(data[k].age);
    }
  };
  
  for (let m = 0; m < data.length; m++) {
    row = data[m];
    if (row.salary = ">50k") {
      if (row.sex == "Male") {
        malecount += 1
      }
      else {
        femalecount += 1
      }
    }
  }

  let trace4 = {
    x: histx,
    type: 'histogram',
    nbinsx: 8
  };
  var layouthist = {
    title: "Breakdown by Age"
  };
  let histdata=[trace4];

  Plotly.newPlot('histogram', histdata, layouthist);

  //pie chart
  var piedata = [{
    values: [malecount, femalecount],
    labels: ['Male', 'Female'],
    type: 'pie'
  }];
  
  var layoutpie = {
    title: ">50k Breakdown by Gender"
  };
  
  Plotly.newPlot('pie', piedata, layoutpie);
}

plotMetric(data, jobs, metric)
