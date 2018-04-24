//Load local build if in local environment.
if (window.origin !== 'https://rhoinc.github.io') {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '../safetyOutlierExplorer.js';
  head.appendChild(script);
}

d3.csv(
  'ADBDS_outliers.csv',
  function(error, data) {
    if (error)
      console.log(error);

    var settings = {
      "id_col": "USUBJID",
      "time_cols": [{
          type: 'ordinal',
          value_col: 'VISIT',
          label: 'Visit',
          order_col: 'VISITNUM',
          order: null,
          rotate_tick_labels: true,
          vertical_space: 100
        },
        {
          type: 'linear',
          value_col: 'DY',
          label: 'Study Day',
          order_col: 'DY',
          order: null,
          rotate_tick_labels: false,
          vertical_space: 0
        }
      ],
      "measure_col": "TEST",
      "unit_col": "STRESU",
      "value_col": "STRESN",
      "normal_col_low": "STNRLO",
      "normal_col_high": "STNRHI",
      "filters": [{
        "value_col": "SITE"
      }],
      "details": [{
        "value_col": "AGE",
        "label": "Age"
      }],
      "multiples_sizing": {
        "width": 300,
        "height": 100
      },
      "unscheduled_visit_pattern": "/unscheduled|early termination/i",
      "visits_without_data": false,
      "unscheduled_visits": false
    };
    var instance = safetyOutlierExplorer(
      '#container',
      settings
    );
    instance.init(data);
  }
);