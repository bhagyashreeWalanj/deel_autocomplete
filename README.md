# DEEL Frontend Code Challenge

> This is an implemenation of the Autocomplete app for Deel frontend code challenge.

## Project information

- Developed using React,Typescript, Pure functional components
- Tested using Jest and Enzyme.
- React Version `^18.2.0`
- Node version `v14.17.3` (LTS)
- Running Application available on [Heroku](https://deel-autocomplete.herokuapp.com/)

## Project structure

- `src` Base app files.

- `src/components` Reusable components, in this case Autocomplete
- `src/part1` included Questions.md file

- `src/interface` Interface for autocomplete
- `src/API` Implementation of realtime server details
- `src/tests` Folder for tests files,

## Technical Documentation

Please prepare an auto-complete component in React TypeScript.

1. You cannot use any 3rd party libraries - only pure React and internal DOM
   functions.
2. You should use typescript and write proper interfaces and types.
3. The function to filter the data should be asynchronous. You can use mock data
   (such as a JSON array), but the function which uses it should be asynchronous
   (similar to a real REST call).

4. It should have basic working CSS. No need for anything fancy (such as drop-
   shadows etc), but should look decent.

5. You need to handle all non-standard/edge use-cases - it should have a perfect
   user-experience.
6. Highlight the matching part of the text, in addition to showing it.
7. No external state management libraries (refer to #1 as well), only native React
   method.
8. Use only functional component with hooks.
9. Shortcuts and hacks are perfectly ok - but you have to add comments on what
   are you doing there and why. You should either write production ready code or
   include comments on what needs to be changed for production.
10. Add a README.md file explaining how to run the project.
11. Bonus #1: load data using a real API call to some resource.

## Database :

for real time database , I have been using open API server for displaying contries data

- [REST api](https://countriesnow.space/api/v0.1/countries/positions)

Documentation Reference:

`https://documenter.getpostman.com/view/1134062/T1LJjU52#4d1b73b4-06fb-4031-b04b-e586a156f7aa)`

## Sample mocked Json:

```
[
    {
       "option": 'Germany',
       "highlighted": 'Germany'
    },
    {
       "option": 'Italy',
       "highlighted": 'Italy'
    },
    ...
]

```

## Third Party Libraries

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [React / create-react-app](https://github.com/facebook/create-react-app)
- [Jest](https://jestjs.io/) for testing
- [Enzyme](https://airbnb.io/enzyme/) for testing
- [enzyme-adapter-react-16](https://enzymejs.github.io/enzyme/docs/installation/react-16.html) an adapter between React and Enzyme. This will be executed before running the tests.

- [React Icons](https://react-icons.github.io/react-icons) for icons

## AUTOCOMPLETE's

If I had a little more time to invest on this code assignment, I would probably
focus on:

- Add more coverage for the tests
- Keydown and KeyUp handling on list

## Project commands

### Install dependencies

```zsh
npm i
```

### Running the project

```zsh
# (make sure dependencies have been installed before.)
npm start
```

### Executing tests

This project contains an extensive suite of tests and makes use of [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme).

Run all tests by executing.

```zsh
# (make sure dependencies have been installed before.)
npm test
```

Or

```zsh
npm run test -- -u
```
