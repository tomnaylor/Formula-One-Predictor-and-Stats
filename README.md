Bugs
Round number is highlighted in different years
lap timings - splitting up the numbers - see research
google chart not scaling with page size - see Research
charts array is pain!
flags could only find api for 2 digit code so had to store nationality in an array
head to head original was for i=1;i<=2;i++ loop - silly.
h2h - ++ was the wrong side of key
driver current standings rank = how...
driver current points rank sort without copying array: https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array
array map for objects : https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
number rounding to 2 places: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
too ages to work out the weighting - trial and error
when a driver didn't take part in a race the push() to add a td put it a race behind the table header. When doing the header, drew boxes for each race with an ID number
https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
https://blog.stevenlevithan.com/archives/date-time-format

driver head to head // old way was to have a for loop and i be either 1 or 2 to match the input one or two - new way to create an array and loop thru
problem updating chart js (https://www.chartjs.org/docs/latest/developers/api.html / https://stackoverflow.com/questions/40056555/destroy-chart-js-bar-graph-to-redraw-other-graph-in-same-canvas)
season results fails when a track isn't in the circuits object (flag lookup)
year 2920 season results - final positions are 0.5 numbers and #1 is -0.5; - its when there are more than 20 drivers....

stop making future races in nav menu clikable: https://stackoverflow.com/questions/18712899/check-whether-the-date-entered-by-the-user-is-current-date-or-the-future-date
additions
adding cache = https://blog.logrocket.com/javascript-cache-api/
look at previous years compared to finihed races this year to see if there's an average improvement compared to last year.
delete lowest result to help prediction
add fastest lap point based on previous fastest laps


Lightroom original performance 81% - new 87%. accessibility 87% - new 100% (img alt tags)
Research

* Give users a gateway to more info




# **F1 Stats**
## By Tom Naylor

![Capture](assets/readme/readme-screen-demo.jpg)

**View live site:** https://tomnaylor.github.io/codeinstitute-ms2/

**View GitHub repo:** https://github.com/tomnaylor/codeinstitute-ms2


Welcome to my F1 statistics web app. The app is made up of a number of sections. A season summary, which includes a prediction of the final results for the remaining races; a race standings table for each race, a comparison tool between two drivers and information and google maps for each circuit.

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
As a user…
* I want to see quickly who has won each race
* I want to see current points haul for each driver
* I want to see a prediction for final positions after all rounds are complete
* I want to see images used to make looking at the data more user friendly
* I want to know what races are left this season and where / when they are
* I want the website to load quickly and only what I want to see

### Site Owners Goals
* I want to make the website interactive
* I want to make the website easy to navigate
* I want the website to evolve as the season progresses
* I want the prediction for season result to be as accurate as possible

## Strategy
Create a useful, accurate and interactive statistics website that shows available data in multiple ways to make useful comparisons, predictions and quickly referenced tabled data. The page should work across mobile, tablet and desktop but take a mobile-first approach.

### Goals
* Provide a useful way to view F1 data
* Predict an accurate end of season result
* Include images to make it easier to view the dataset
* Include interactive charts to view side-by-side racing data comparisons


### Design


#### Wireframes
I used a drawing tool to create a wireframe for the two responsive sizes (desktop and mobile). You can [view the PDF wireframe here](assets/readme/wireframe.jpg)

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
xxx


### Features left to implement
* xxx


## Technologies used

### Languages
* HTML
  * HTML is used as the mark-up language in a single index.html file
* CSS
  * A single CSS file style.css is used for all screen sizes which also imports the font and icon Libraries
* JavaScript
  * JavaScript is used for all the interactive elements of the app. It is made up of a few .js files
    * script.js is the main JS file which includes the initial calls and all custom functions.
    * date-format.js is an external function by Steven Levithan, which makes working with dates easier.
    * const.js holds objects created to add to the external API data that isn't provided by the source.
* jQuery
  * jQuery is used as the framework to make programming quicker. It's imported via a CDM and sits ontop of the native JavaScript language.
