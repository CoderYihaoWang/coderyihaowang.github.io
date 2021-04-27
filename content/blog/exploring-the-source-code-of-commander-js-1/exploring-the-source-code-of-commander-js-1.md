---
title: "Exploring the Source Code of Commander.js: Part 1"
date: 2021-04-26T18:16:51+12:00
tags: ["source-code-reading", "javascript", "nodejs", "commanderjs", "cli"]
featured: true
draft: true
---

This article is separated in Part 1 and Part 2. This is the first part of the series.

## Introduction

Commander.js is a node.js package for building command line interfaces. It was originally created by TJ (the guy who also created express, koa, mocha...). The current version (8.x) contains only 2,000 lines of code, and previous versions are even lighter. This makes it a perfect choice for practising source code reading.

In this article, we'll explore the source code of Commander.js. The article is organized in two parts. In the first part, we'll focus on the high level overview, and in the second, we delve more into the details of implementation. To keep things simple, we'll use the 2.0.0 version instead of the latest one. It contains only 800 lines of code (including comments) but nevertheless provides the majority of features.

## Getting started by examples

To get started, download the code from GitHub and checkout to the 2.0.0 version:

```shell
> git clone https://github.com/tj/commander.js.git
> git checkout 2.0.0
```

The project structure very straight forward:
```
|- examples/
|- test/
|- package.json
|- History.md
|- Readme.md
`- index.js
```

The `index.js` file contains the complete implementation. In addition, the `examples` folder contains many sample programs. They are really helpful for understanding how this package is used. If you are not already familiar with Commander.js, I encourage you to fiddle with every one of them to get some feeling of this library.

Having played with some examples, we'll notice that these programs have a similar structure:

```javascript
// import the package as program,
// in your own program outside this repo you should use `require('commander')`
var program = require('../');

// start with the imported `program` object
program
  // adds version number
  .version('0.0.1')    
  // adds an option, can be used as `-a` (short name) or `--option-a` (long name)
  // this option take a required argument `arg`
  .option('-a | --option-a <arg>', 'option a')
  // adds and option `-b` or `--option-b`, without argument
  .option('-b | --option-b', 'option b')  

program
  .command('subcommand <arg>')     
  .describe('sub-command')       
  .option('-c | --option-c [c]', 'option c')  
  .action(function(arg, options) {  
      console.log('arg: %s, option-c: %s', arg, options.c)
  })

program.parse(process.argv)  

console.log('arg: %s, option-a: %s, option-b: %s', arg, program.a, program.b) 
```


## Looking into the data structure


## Analyzing the program flow



## Delving into the details


