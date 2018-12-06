# Project Title

This library was build to give you the opportunity to access existing elements in the DOM tree, create new elements, add and manipulate the elements as you want.

Currently we are using `$$()` as an alias to our library as main functionality. The DOMM library uses DOMMNode and DOMMNodeCollection as its main components so everything you do with the $$() alias will basicly lead you to the usage of DOMMNode or DOMMNodeCollection and its methods. 


```Note
Note: Remember that the execution of $$() will always return DOMMNodeCollection.
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
If you need only the distribution file you can download it from dist folder. In this folder you will be able to download the whole source code of the library from the dist/standalone folder (human readable and/or minified version) or separate modules from dist/modules.

There are two modules at this point:
1. dommcore.js module. It contains the library itself. It is mandatory module, you can not use other modules without this module.
2. dommevents.js module. It serves as extention to the dommcore.js module and can not be used without it. This module gives you DOMM style control of the browser and custom events.

If you want to run the test server and tests of the repository you must have Node.js installed on your system. You can download Node.js from [here](https://nodejs.org/en/download/). 


### Installing

When there is Node.js installed, clone the repository. Navigate to the folder where you want to clone it and run.

```
git clone PLACE_THE_URL HERE!
```

After that you must download the required Node.js modules by executing the command below in the main repository folder.

```
npm install
```

At this point you are almost ready to go. The last thing that's left to be done is to run the Node.js web server.

```
node server.js
```

## Running the tests

To run the tests you need to run the server. 

```
node server.js
```

Open the browser and type localhost:5002 in the address bar. Hit enter and you will run all the unit tests included. We use [Mocha](https://mochajs.org/) to run our tests in the browser environment.

### Break down into the unit tests

Those tests are developed to compare the results of the library functions against the native way to do the same tasks or to ensure the results are as expected.

```javascript
    var actual = new DOMMNode('<div>');
    actual.id('');

    assert.equal(actual._node.id, '', "Failed! The returned id value is not correct.");
```


## Built With

* [Sizzle](https://sizzlejs.com/) - A pure-javascript CSS selector engine

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

Developed by [Clean Code Factory](https://cleancodefactory.de/)

* **Nikola Ananiev** 
* **Mihail Mihaylov**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

