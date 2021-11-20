console.log(data);

let jobs = ['Adm-clerical', 'Armed-Forces','Craft-repair','Exec-managerial', 'Farming-fishing','Handlers-cleaners', 'Machine-op-inspct','Other-service','Priv-house-serv','Prof-specialty','Protective-serv','Sales','Tech-support','Transport-moving']
let workingClass = ['Federal-gov', 'Local-gov', 'Private','Self-emp-inc','Self-emp-not-inc','State-gov','Without-pay']

let metric = "hours"

function plotMetric(data, jobs, metric) {

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
}

plotMetric(data, jobs, metric)