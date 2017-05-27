# error-reporter
**error-reporter** is a tiny Javascript library detecting uncaught Javascript errors and logging them.

## Install via npm
1. Install the library
```
npm install --save sproogen/error-reporter
```
2. Link to main.min.js
```
<script src="node_modules/error-reporter/dist/main.min.js"></script>
```

Alternatively you could download or clone the repo and include **main.min.js** from the downloaded library.

## Demo
A demo site can be found in the **demo** directory.
To install this run `npm install` from the directory.

## Building
In order to build the **error-reporter**, ensure that you have Git and Node.js installed.

1. Clone the repo
```
git clone https://github.com/sproogen/error-reporter
```
2. cd into error-reporter directory
```
cd error-reporter
```
3. Install all the dependencies
```
npm install
```
4. Use the following to build and test
```
npm run build # Build the repo using webpack and copy the compiled files into the dist directory
npm run test  # This will do something sometime
```
