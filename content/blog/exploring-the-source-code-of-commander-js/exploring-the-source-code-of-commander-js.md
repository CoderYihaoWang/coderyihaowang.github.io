---
title: "Exploring the Source Code of Commander.js"
date: 2021-04-26T18:16:51+12:00
tags: ["source-code-reading", "javascript", "nodejs", "commanderjs", "cli"]
featured: false
draft: true
---

## Introduction

Commander.js is a node.js library for building command line interfaces. It was originally created by TJ (the guy who also created express, koa, mocha...). The current version (8.x) of Commander.js contains only 2,000 lines of code, and previous versions are even lighter. This makes it a perfect project for practising source code reading.

In this article, we'll explore the source code of Commander.js. To keep things simple, we'll use the 2.0.0 version instead of the latest one. It contains only 800 lines of code (including comments) but nevertheless provides the majority of features.

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

The `index.js` file contains the complete implementation. In addition, `examples` contains many sample programs using this package. Fiddling with them is a good way to get understanding of how the package is used. 

## Looking into the data structure


## Analyzing the program flow



## Delving into the details


