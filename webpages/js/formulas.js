(function (window, document) { // eslint-disable-line no-unused-vars
  'use strict';

  var lima = window.lima;

  lima.listFormulas = function listFormulas() {
    // at some point, the server api might want to host a list of formulas with their definitions
    return [
      {
        id: 'logOddsRatio',
        label: 'Log Odds Ratio',
        func: logOddsRatio,
        parameters: [ 'experimental', 'control' ]
      },
      {
        id: 'logOddsRatioPercent',
        label: 'Log Odds Ratio (percentages)',
        func: logOddsRatioPercent,
        parameters: [ 'experimental (%)', 'control (%)' ]
      },
      {
        id: 'weight',
        label: 'Weight',
        func: weight,
        parameters: [ 'experimental outcome', 'experimental N', 'control outcome', 'control N' ]
      },
      {
        id: 'weightPercent',
        label: 'Weight (percentages)',
        func: weightPercent,
        parameters: [ 'experimental outcome (%)', 'experimental N', 'control outcome (%)', 'control N' ]
      },
    ];
  }

  function strictToNumber(val) {
    if (typeof val == 'number') return val;
    if (typeof val == 'string') {
      if (val == '') return NaN;
      else return Number(val);
    }
    return NaN;
  }

  lima.getFormulaById = function getFormulaById(id) {
    var formulas = lima.listFormulas();
    for (var i=0; i<formulas.length; i++) {
      if (formulas[i].id === id) return formulas[i];
    }
    return null;
  }

  // here start the functions implementing the formulas

  function logOddsRatio (experimental, control) {
    // validate the input
    experimental = strictToNumber(experimental);
    control = strictToNumber(control);

    // perform the calculation
    // may return NaN or infinities
    return Math.log((control/(1-control))/(experimental/(1-experimental)));
  }

  function logOddsRatioPercent (experimental, control) {
    // validate the input
    experimental = strictToNumber(experimental);
    control = strictToNumber(control);

    // perform the calculation
    // may return NaN or infinities
    return logOddsRatio(experimental/100, control/100);
  }

  function weight (Me, Ne, Mc, Nc) {
    // validate the input
    Me = strictToNumber(Me);
    Ne = strictToNumber(Ne);
    Mc = strictToNumber(Mc);
    Nc = strictToNumber(Nc);

    // perform the calculation
    // may return NaN or infinities
    return 1 / ( 1/(Me*Ne) + 1/((1-Me)*Ne) + 1/(Mc*Nc) + 1/((1-Mc)*Nc) );
  }

  function weightPercent (Me, Ne, Mc, Nc) {
    // validate the input
    Me = strictToNumber(Me);
    Ne = strictToNumber(Ne);
    Mc = strictToNumber(Mc);
    Nc = strictToNumber(Nc);

    // perform the calculation
    // may return NaN or infinities
    return weight(Me/100, Ne, Mc/100, Nc);
  }

})(window, document);
