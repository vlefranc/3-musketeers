#!/usr/bin/env node

const Conf = require('conf');
const helpers = require('./helpers.js');
const cash = require('./cash.js');

const config = new Conf();

const argv = process.argv.slice(2);

helpers(argv);

// specifies the type of command that needs to be used in order to run the test
const command = {

  // we first give the amount 

  'amount': argv[0] || 1,

  // then we give the original currency, which will be USD if not specified

  'from': argv[1] || config.get('defaultFrom', 'USD'),
  'to':
  
  // last we give the currency we want it to be converted into. If nothing is given the currency 
  // in which the amount is converted to will be by default USD, EUR or GBP (depending on whichever
  // one of them was or was not in the original currency)

    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP'])
};

cash(command);
