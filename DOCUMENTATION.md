# Documentation

## Introduction

The primary goal of the Wolang project is to formalize a specification for the language. To support that, a wolang parser for Node.js/javascript is also provided. This project is still in the early stages of development, so the feature set of the parser is still quite limited. Development will first be focused on extending the wolang language and then focus will shift to improving the parser to allow support for linting, formatting and custom extensions.

## Getting Started

The Wolang parser can be installed with npm.

    ```bash
    npm install @jamincan/wolang
    ```

The following code demonstrates how you can import and use the parser.

    ```javascript
    var parser = require('@jamincan/wolang');

    var workout = parser.parse('2 min @250W');

    /* workout = [
        {
            type: 'Interval',
            duration: 120,
            intensity: {
                type: 'Power',
                value: 250,
            },
        },
    ]
    */
    ```

## Abstract Syntax Tree

The parser outputs an abstract syntax tree which a compiler could then use to generate a workout in another useable format, or which a program could interpret directly.

There are four main components of the AST: Intensities, Intervals, Blocks, and Sets.

### Intensity

There are a number of ways that the intensity of an interval might be described. In cycling, it is common to use power or percent of FTP, but other indicators might be used as well in certain contexts such as heart rate, speed, elevation gain and so on. Currently the wolang specification only supports power and percent of FTP. The AST expresses this simply as an Intensity object as shown below. Power is always in Watts, and PercentFTP is always as a decimal percentage.

    ```javascript
    {
        type: 'Power',
        value: 250,  // In Watts
    }

    {
        type: 'PercentFTP',
        value: 0.95,
    }
    ```

### Interval

An interval is the basic component of a workout consisting of an intensity for a given duration. It may also include an annotation that provides additional instruction or context for the interval such as 'max effort', or 'cooldown'. The duration is always in seconds and the intensity is an Intensity object.

    ```javascript
    {
        type: 'Interval',
        duration: 120,
        intensity: { type: 'Intensity', ... },
    }
    ```

### Block

A block is simply a list of intervals or sets. The parser always returns a Block as its base type. A block is expressed as a javascript Array containing the Interval or Set objects.

### Set

A set is a repeating block of intervals or sets.

    ```javascript
    {
        type: 'Set',
        repeat: 2,
        sets: [
            { type: 'Interval', ... },
            { type: 'Set', ... },
            ...
        ]
    }
    ```
