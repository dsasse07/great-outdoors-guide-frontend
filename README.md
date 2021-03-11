<h1 style="text-align: center"> Great Outdoors Guide </h1>
<p align="center">
<img 
  src="./src/assets/GOG Logo 2.png"
  alt="Fludoku Animation" 
>
</p>
<h2 style="text-align: center"> Front End </h2>

---  

Welcome to the great outdoors. Plan your next great adventure to the U.S. National Parks throug the integrated National Parks Service database and interactive maps. Here you will find information and links for each of the national parks.

Create an account on the website to help track your progress as you begin (or continue) your journey to visit them all. Log a visit at a park by completing a journal entry to document you trip, upload photos of your favorite moments, and leave a review for other users for each of the parks.

#### About

Great Outdoors Guide was completed as a phase 4 project at Flatiron School by Daniel Sasse and John Wisneski. This app is designed with React Functional Components and Hooks, and integrates Google Maps React, Material-ui for icons, and custom styled components for styling. This React front end connects to a Rails API backend to persist user data. The API stores photos to Cloudinary. The repo link for the backend can be found [here]("https://github.com/dsasse07/great-outdoors-guide-backend"). 

#### Usage

* To run locally :
  * run `npm install` to install dependencies
  * run `npm start` to start a local server for the frontend
    * The url for the backend server must be saved into your `.env.local` from with the variable name `REACT_APP_BACKEND_URL `
    * Ex: `REACT_APP_BACKEND_URL="http://localhost:3001"`
  * In order to connect to the Google Maps API, you will need a Google API key with Javascript Maps API enabled. You can get an key [here](https://developers.google.com/maps/gmp-get-started)
    * store this API key in the `env.local` file with the variable name `REACT_APP_MAPS_API_KEY`
  * In order to connect to the National Parks Service API, you will need an API key. You can obtain one [here](https://www.nps.gov/subjects/developer/get-started.htm).
    * Store this API key in the `env.local` file with the variable name `REACT_APP_PARKS_API_KEY`


## Contributing
Pull requests are welcome. Please make sure that your PR is <a href="https://www.netlify.com/blog/2020/03/31/how-to-scope-down-prs/">well-scoped</a>. For major changes, please open an issue first to discuss what you would like to change.

### Known issues
* <a href="https://github.com/dsasse07/great-outdoors-guide-frontend/issues">Visit Issues Section</a>

### Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/dsasse07"><img src="https://avatars1.githubusercontent.com/u/72173601?s=400&u=57e4654c70d63d16bc5b84e2878d97f770672715&v=4" width="200px;" alt="Daniel Sasse"/><br /><sub><b>Daniel Sasse</b></sub></a><br />
    <td></td>
    <td align="center"><a href="https://github.com/BoltVanderhuge"><img src="https://avatars.githubusercontent.com/u/73249559?s=460&u=adaeb89f6348b05852c1c2ce60ed4bb91b94bd60&v=4" width="200px;" alt="Josh Frank"/><br /><sub><b>John Wisneski</b></sub></a><br />
    </tr>