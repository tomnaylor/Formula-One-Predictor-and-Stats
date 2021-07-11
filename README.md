Lightroom original performance 81% - new 87%. accessibility 87% - new 100% (img alt tags)
Research


* TODO
* JS validator




# **F1 Stats**
## By Tom Naylor

![Capture](assets/readme/readme-screen-demo.jpg)

**View live site:** https://tomnaylor.github.io/codeinstitute-ms2/

**View GitHub repo:** https://github.com/tomnaylor/codeinstitute-ms2


Welcome to my F1 statistics web app. The app is made up of a number of sections. A season summary, which includes a prediction of the final results for the remaining races; a race standings table for each race, a comparison tool between two drivers and information and google maps for each circuit.

I wanted to create a useful, accurate and interactive statistics website that shows available data in multiple ways to make useful comparisons, predictions and quickly referenced tabled data. The page should work across mobile, tablet and desktop but take a mobile-first approach.


## Table of contents
* [UX](#ux)
    * [User Stories](#user-stories)
    * [Site Owners Goals](#site-owners-goals)
    * [Design](#design)
        * [Original sketch](#original-sketch)
        * [Wireframes](#wireframes)
        * [Fonts](#font-family)
        * [Icons](#icons)
        * [Colours](#colours)
        * [Hero image](#hero-image)
* [Features](#features)
    * [Existing Features](#existing-features)
        * [Navigation](#navigation)
        * [Hero Image](#hero-image)
        * [Sign up buttons](#sign-up-buttons)
        * [Sign up modal](#sign-up-modal)
        * [Features Section](#features-section)
        * [Success stories](#success-stories)
        * [Pricing](#pricing)
        * [Guides](#guides)
        * [Contact Us](#contact-us)
        * [Footer](#footer)
        * [Features left to implement](#features-left-to-implement)
* [Technologies used](#technologies-used)
    * [Languages](#languages)
    * [Libraries](#libraries)
    * [Tools](#tools)
* [Testing](#testing)
    * [Manual Testing](#manual-testing)
        * [Navigation menu](#navigation-menu)
        * [Current user testimonials](#current-user-testimonials)
        * [Sign up and contact forms](#sign-up-and-contact-forms)
    * [Discovered Bugs](#discovered-bugs)
* [Deployment](#deployment)
    * [Running a local copy](#running-a-local-copy)
* [Credits](#credits)
    * [Content](#content)
    * [Media](#media)
    * [Acknowledgements](#acknowledgements)


## UX

### Target Audience
* Formula one fans
* statistics consumers
* Betting fans

### User Stories
#### First time visitor
As a first time user:
* I want to be guided to the most current race
* I want the features explained with clear and concise languages
* I want to see current points haul for each driver as the season progresses
* I want to see a prediction for final positions after all rounds are complete

#### Returning visitor
As a returning visitor:
* I want to see new data as soon as possible
* I want to see updated predictions for the current season
* I want to know what races are left this season and where / when they are
* I want the website to load quickly and only what I want to see

### Site Owners Goals
* Provide a useful way to view F1 data
* I want to make the website interactive
* I want to make the website easy to navigate
* I want the website to evolve as the season progresses
* I want the prediction for season result to be as accurate as possible
* Include images to make it easier to view the dataset
* Include interactive charts to view side-by-side racing data comparisons


### Design


#### Wireframes
I used a drawing tool to create a wireframe for the two responsive sizes (desktop and mobile). You can [view the wireframe here](assets/readme/readme-wireframe.jpg)

![wireframe](assets/readme/readme-wireframe.jpg)

#### Font family
To provide a reliable and fast font library, I have used [Google Fonts](https://fonts.google.com/ "Google Fonts"), picking a font that worked with the racing theme and was easy to read when faced with lots of table data. For all text I chose the [Titillium Web](https://fonts.google.com/specimen/Titillium+Web?preview.text=FormulaOne&preview.text_type=custom "Google fonts: Raleway") font.

#### Icons
To add a more familiar feel to the website, I have added icons to sit alongside (and sometimes instead of) text links and buttons. I choose the [Font Awesome library](https://fontawesome.com/ "Font Awesome").

#### Colours
I used [Coolors](https://coolors.co) to find three colors that worked well together and helped define the racing theme. [The colour pallett is here](https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08)

![Colours](assets/readme/readme-colour-palette.jpg)


## Features

### Existing Features

#### Navigation
I have tried to make a intuitive, accessible and reactive navigation bar that stays useful across different screen sizes and devices. For desktop the navigation has every season and track with a useful hover for all the circuits showing a flag, data, time and race name in a popup modal. On mobile the entire menu is shrunk into two lines and an arrow icon provides a button to expand the height and show the entire menu. Future races are highlighted in red with a no-access cursor icon. The current season and round is underlined to help quickly identify the most relevant race.

#### Help and how to use section
The initial section shows a handy how-to guide. This is replaced when any of the seasons or rounds are clicked.

#### Current season prediction
For the current season, the app will try and predict who will win each race, how the points will be assigned and where each driver will finish at the end of the season. Formula one currently gives points to the top 10 places. P1 gets 25, P2 18, P3 gets 16 all the way to P10, who gets the remaining point.

To calculate each race result the app uses 6 pieces of data and assigns a weight to each one. After the weighting is applied all the points are added together to provide a final score. The lowest 10 scores get the respective points.

Points (and their weighting):
* Average finish position this season (x1)
* Average qualifying position this season (x0.6)
* Finish position on this track last year (x0.3)
* Qualifying position on this track last year (x0.1)
* Finish position on this track two years ago (x0.3)
* Qualifying position on this track two years ago (x0.1)

#### Previous seasons
Previous seasons uses the same table as the current season but there are no predictions since all races are complete.

#### Race standings
Race standings is a table that lists the drivers in order of finish position. It gives the points haul, driver details, car image, Q3 result and positions gained. It also has the head to head comparison buttons. You can click on either A or B to load that driver into the comparison table to the side of the race results.

#### Head to HEAD
The head to head section shows two drivers side by side as a comparison. It also shows the lap times and position graph for every lap of the race. The chart is powered by Chart.JS

#### Circuit info
Circuit info shows the sector image and the google maps API with the coordinates of the circuit as the centre point.


### Features left to implement

#### Using cache for the API data
The F1 app uses a few calls to the API for various data. It would be quicker to use a JS cache to store the data, and only update if the next race dataset has become available. [Jordan Irabor explains it more in this blog post](https://blog.logrocket.com/javascript-cache-api/)

#### More prediction inputs
I'd like to add more data for the prediction. One example is to look at previous years compared to finished races this year to see if there's an average improvement compared to last year. This can then me used as a multiplier for the average and previous weighted results.

#### Prediction techniques
Possibly using different techniqies to form the prediction. One option is to remove the highest and lowest result to try and remove un-usual events from the score and provide a median average. [More information on this blog post](https://betterexplained.com/articles/how-to-analyze-data-using-the-average/)

#### Fastest lap
Add the extra point for the fastest lap to the prediction table. This could be based on previous fastest laps and how well the driver did on the same circuit in previous years.

#### WIKI API
Give users a gateway to more info by adding the wiki API to the app. The current F1 data API returns a Wikipedia URL for every driver, season, circuit and race.


## Technologies used

### Languages
* [HTML5](https://en.wikipedia.org/wiki/HTML5) is used as the mark-up language in a single index.html file
* [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) as a single CSS file style.css is used for all screen sizes which also imports the font and icon Libraries
* [JavaScript](https://www.javascript.com/) is used for all the interactive elements of the app. It is made up of a few .js files
    * script.js is the main JS file which includes the initial calls and all custom functions.
    * date-format.js is an external function by Steven Levithan, which makes working with dates easier.
    * const.js holds objects created to add to the external API data that isn't provided by the source.
* [jQuery](https://jquery.com/) is used as the framework to make programming quicker. It's imported via a CDM and sits ontop of the native JavaScript language.


### Libraries + APIs
* [Google Fonts](https://fonts.google.com/) was used as the main font throughout the project.
* [Font Awesome](https://fontawesome.com/) was used to add icons for aesthetic and UX purposes.
* [Google maps](https://developers.google.com/maps) was used to add a map for the circuit
* [Ergast F1 data API](https://ergast.com/mrd/) was used as the main source of F1 data
* [Chart.JS](https://www.chartjs.org/) was used to provide interactive charts on the head to head section
* [Country Flags](https://www.countryflags.io/) was used to provide flag images for circuits and drivers

### Tools
* [Git](https://git-scm.com/) and Git desktop was used for version control by utilizing the GitPod program and ATOM integration to commit to Git and Push to GitHub.
* [GitHub:](https://github.com/) is used to store the projects code after being pushed from Git.
* [GitPod](https://gitpod.io/) was used early in the project  
* [ATOM](https://atom.io/) was used as my IDE
* [Auto Prefixer](https://autoprefixer.github.io/) was used to add vendor specific CSS
* [JS HINT](https://jshint.com/) was used to validate the JavaScript files
* [W3C HTML](https://validator.w3.org/) and [Jigsaw](https://jigsaw.w3.org/css-validator/) validators were used to validate the HTML and CSS files
* [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) was used to test page response, UX and further validation
* [Concepts](https://concepts.app/en/) was used to create the wireframe during the design process.
* [Coolors](https://coolors.co/) was used to find matching colours




## Testing

As well as the manual testing below I have also used the W3C HTML and CSS validator tools, Chrome Dev Tools and JS HINT. I found them very helpful to notify me of any potential problems and code that violates the standard. I also used the googles lighthouse to test the site load times and user experience.

### Automatic testers / validators

#### W3C HTML validator
The index.html page was tested using the w3c validator and passed without error. [view live result here](https://validator.w3.org/nu/?doc=https%3A%2F%2Ftomnaylor.github.io%2Fcodeinstitute-ms2%2F)

#### Jigsaw CSS Validator
The CSS was tested via direct input and no errors were found. [view live result here](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Ftomnaylor.github.io%2Fcodeinstitute-ms2%2Fassets%2Fcss%2Fstyle.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

#### JS HINT
All 3 JavaScript files have been thru the JS hint app as direct input and show no errors.

### Testing against the user Stories
#### First time visitor
* I want to be guided to the most current race
  * The current season and race navigation is automatically loaded and the current season and round is underlined as to be quickly identifiable.
  * Once selected, the season or round has a clear contrasting background colour to show it's the current selection. The most recent season and race maintains the white underline.
* I want the features explained with clear and concise languages
  * As soon as the page loads a helpful guide is shown with clear headings and concise language.
  * Matching colours are used so you can quickly see what to expect
  * Different info is displayed across devices if there is a difference in the UI
* I want to see current points haul for each driver as the season progresses
  * in the season roundup you can click on each race for any driver and it will show the cumulative points haul
* I want to see a prediction for final positions after all rounds are complete
  * Clicking on the current season will load all the previous races and then predict each and every race of the season.
  * The season result will then add up the points and rank the drivers. The top three are then highlighted to further highlight them.

#### Returning visitor
* I want to see new data as soon as possible
  * While the app is slave to the API supplying the data, in testing new data has been available very quickly after the races are finished.
* I want to see updated predictions for the current season
  * After each race, the prediction is updated to include the data from the previous race. As a result the predictions for each race get updated in accordance with the method detailed in the features section.
* I want to know what races are left this season and where / when they are
  * all future races for the season have identical design. In the navigation you can hover over each track to display its name, race date and start time.
* I want the website to load quickly and only what I want to see
  * more libraries are imported from CDNs that should ensure they load fast, or could even be available on the clients device.


### Manual Testing
I have preformed manual tests on a number of browsers and devices to cover most scenarios and feel assured the website works as intended for all visitors. This included using google dev tools to simulate different screen sizes and using a real android and apple phone and family to act as first time visitors.


### Known Bugs

#### Resolved
* **Navigation current round** When changing seasons, the round number that matched the current round also got highlighted. Fixed by also adding the season to the id of the container and only matching current race if season and round number match.

* **Lap timings** were not in seconds, as a result the charts would fail to load. Sai Gowtham had the answer in [this blog post](https://reactgo.com/javascript-convert-hhmmss-seconds/#:~:text=To%20convert%20a%20hh%3Amm,everything%20to%20get%20the%20seconds).

* **Google chart** did not scale with the website, and also failed to load when I added the second driver to the chart. For this reason I changed to chart.JS which worked much better with multiple datasets.

* **Missing lap data** On the season results table, when a driver didn't take part in a race (i.e. crashed on first lap or in qualifying), the following race push() to add the table cell put it a race behind the table header. To fix the problem, each box is pre-drawn with an ID set so the missing race appears in the right place on the season.

* **Updating chart** There was a problem updating the head to head chart when a new driver was selected for comparison. Despite the [Chart.js documents](https://www.chartjs.org/docs/latest/developers/api.html) and [this helpful stack overflow guide](https://stackoverflow.com/questions/40056555/destroy-chart-js-bar-graph-to-redraw-other-graph-in-same-canvas), my solution was to remove the canvas and add it to the DOM each time an update was needed.

* **Season results fails**  when a track isn't in the circuits object. The issue was looking up the country code. If the code isn't in the object there would be a fatal error. Solution was to check if it exists first.

* **Future races in navigation** were clickable and throwing an error as there was no data. The solution was to remove the click handler for any races in the future. I also changed the look at cursor icon to help distinguish future races.

* **Google maps failed to load** because the data for long and lat were not numbers. To solution was to pass the data via parseFloat() to change the string into a float number.

#### Un-Resolved

* **year 2020 season results** final positions are 0.5 numbers and the actual winner is on -0.5; There is an error in the way I sort the finish order if one or more racers finish with the same points total.







## Deployment
The final website has been deployed to GitHub via their pages option. Written in ATOM, after each commit and push, the master branch on GitHub was updated with the local commit. To work with the code on GitHub, I followed the steps below:

* Log into GitHub
* Create the repository
* Clone the GitHub repo into Atom identify
* Fetch and pull latest data before each session
* Git commit at an appropriate stage and add a useful comment
* Git push to sync with GitHub

In order to deploy the site I needed to setup GitHub pages; To do this I did the following:

* Log into GitHub
* Go to the repository
* Click "settings" and navigate to the "pages" section
* Select the master branch in the source dropdown
* Click "save"
* GitHub will provide a URL to the published site.

The URL for the GitHub page is https://tomnaylor.github.io/codeinstitute-ms2/

### Forking the app
To work on the code without changing the master branch, you can fork the repo to use in your chosen IDE. You simply need to log into GitHub, navigate to the repo, use the "fork" button in the top right and it will be added (as a copy) to your GitHub repos.

### Running a local copy
If you would like to run a local copy of this website, you would simply need to clone the master git repo. Follow the steps in deployment to clone the repo. There are no servers to configure, the website uses only HTML, CSS and JavaScript. You will need internet access to get the CDN files and the live API data.


## Credits

### Content

* JavaScript help with looping thru elements from [stack overflow](https://stackoverflow.com/questions/50793136/javascript-click-function-only-works-on-first-element)
* Driver current points rank sorting from [stack overflow](https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array)
* Array map for objects from [stack overflow](https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays)
* Data and time function from [Steven Levithan](https://blog.stevenlevithan.com/archives/date-time-format)


### Media

* Circuit and car images were taken from [formula1.com](https://www.formula1.com/)
* Flags from [Country Flags](https://www.countryflags.io)

### Acknowledgements

The inspiration behind this website was based on watching the live prediction data during F1 races. I wanted to create an app that used know data to try and determine the outcome of a race.

I'd like to thank my mentor [Caleb Mbakwe](https://github.com/caleboau2012), who really helped define the project goals and helped put myself in both the user and the owners shoes. After each session I would have a list of topics to look at or suggestions for changes.

I would also like to thank the Slack community and CyC group for helping the course feel less "remote" and my partner that has needed to do ever more work around me.
