/*eslint-disable no-process-exit*/
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');

const API = 'https://api.fixer.io/latest';


// this will display the result of the conversion
const convert = configuration => {
  const {amount, to, from, response, loading} = configuration;

  money.base = response.body.base;
  money.rates = response.body.rates;

  to.forEach(item => {
    // the currency's existence needs to be checked first
    // if it is then it will proceed to convert the original currency to the onew one
    if (currencies[item]) {
      loading.succeed(
        // once done, the amount converted is displayed in green and the details of the currency in white
        `${chalk.green(
          money.convert(amount, {from, 'to': item}).toFixed(2)
        )} ${`(${item})`} ${currencies[item]}`
      );
    // however if it is not a warning will be displayed in yellow
    } else {
      loading.warn(`${chalk.yellow(` The ${item} currency not found `)}`);
    }
  });

  console.log();

  // finally once evrything is done, a sentence in gray with the amount converted and the original currency is diplayed

  console.log(
    chalk.underline.gray(
      ` Conversion of ${chalk.bold(from)} ${chalk.bold(amount)}`
    )
  );
  process.exit(1);
};



const cash = async command => {
  const amount = command.amount;
  const from = command.from.toUpperCase();
  const to = command.to
  // verifes that the currency from and to are different and turns it into upper case
    .filter(item => item !== from)
    .map(item => item.toUpperCase());

  console.log();
  const loading = ora({
    'text': 'Converting currency...',
    'color': 'green',
    'spinner': {
      'interval': 200,
      'frames': to
    }
  });

  loading.start();

  // once the loading starts, it will try to call convert if it doesn"t work an error message will be displayed blaming
  // either the interenet or an internal error
  try {
    const response = await got(API, {'json': true});

    convert({amount, to, from, response, loading});
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      loading.fail(chalk.red('   Please check your internet connection.\n'));
    } else {
      loading.fail(chalk.red('   Internal server error... \n'));
    }

    process.exit(1);
  }
};

module.exports = cash;
