# Cigar Shops

This project was developed for the "Neighborhood Map" in the Udacity Full Stack Web Development Course.  It creates a
an application that shows real cigar stores in Southern California

[The site is live at https://cigarshops.info](https://cigarshops.info)

## Project description

## Development server

1. As of this writing this is a front end application only.  There is no server to install.
2. Clone this repository
7. Then `cd /cigar-shops`
8. In the terminal window run `npm install`
3. In the terminal window run `gulp` - this builds out the application
3. In the terminal window run `gulp webserver` - this serves the application and watches for changes
4. Navigate to `http://localhost:8050/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

The scaffolding of this project is based on the yeoman generator classical-ko - https://github.com/eriksvaleng/generator-classical-ko

## Custom CLI

Classical-ko does have a couple of cli commands that can be seen here - https://github.com/eriksvaleng/generator-classical-ko

## Google API Credentials

This is based on the Google Maps JavaScript API, my credentials are currently present for testing.

## Yelp Fusion API Credentials

Unfortunately Yelp no longers supports the client-side only JavaScript API - formerly known as V2. Fusion V3 reguires some sort
of backend server for making GET requests. It uses a tokenized response that includes a client id and an api key.  From there
the backend communication creates an authentication token that is used in the requests.

As this project was not intended to include any sort of backend "server" I have had to use a hack that simulates a backend
request by using PostMan to create the token.

It's either that or build out a backend.

I got this idea from a YouTube video by Greg Sandell - https://www.youtube.com/watch?v=0Sy14hX8T-A&t=391s.  His solution
no longer works with V3 but it gets close enough that I was able to figure it out.

## Live Site Deployment

Gulp creates a `dist` folder with minified and concatenated HTML, JS & CSS.  In order to update the `dist` folder simply
run `gulp` from within the `cigar-shops` directory.

This site is running on an AWS Lightsail instance that I configured as part of this course.



