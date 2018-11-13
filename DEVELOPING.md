# Developing

## Installing prerequisites

Install NodeJS from [here](https://nodejs.org/en/)

## Building from Source

Install electron and angular globally with:

```
npm i -g electron
```

Download the source code via

```
git clone https://gitlab.cas.mcmaster.ca/velechva/make-torrents-great-again.git
```

Enter the src directory and install dependnecies with

```
cd make-torrents-great-again/src
npm i
```

## Running the Client

Run the client normally from the 'src' folder with the command

```
npm start
```

or run the test suite with

```
npm test
```

## Developing

MTGA uses Electron.JS and Vue.JS, as well as Bootstrap for most css templating.