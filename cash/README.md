# cash

## introduction:

This specific document has been written to help anyone to better understand the cash library. This library will be very usefull if one wishes to easily convert any amount of money from one currency to another.

## Installation:

Please remember that, in order to be able to use the cash, a few things need to be installed first. To do so, go on your command prompt and follow the next steps:

* Install node.js
* Install any kind of packaging that is required at the beggining of cash.js, helpers.js or index.js, just so:

```sh
$ cd /path/to/workspace
$ npm install ---
```

## How it works:

The details of how the code works is specified in each .js file. However if you simply wish to convert then all you need to do is type in this line:

```sh
$ node index.js amount OriginalCurrency NewCurrency1 NewCurrency2
```

* amount: the amount of money one wants to convert
* OriginalCurrency: the original currency of the amount. If not specified, it will be USD by default. If one wants to change it then the command --save can be used
* NewCurrency1, NewCurrency2, ... : the currency that the amount needs to be converted into. If not specified the amount will be converted into EUR, USD and GBP (unless one of them is the orginal currency).
