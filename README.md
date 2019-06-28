# LIRI Node App

LIRI stands for Language Interpretation and Recognition Interface. It's a node app that can be accessed from the command line, and takes specified commands to query external databases via APIs.

## Overview

This version of LIRI accepts four commands:

* `concert-this`
    - search format: node liri.js concert-this <artist/band name>
    - source: Bands in Town Artist Events API
    - default if no <artist/band name> given: "Ah, the sweet sound of silence..."
    - default if no upcoming concerts: "Sorry, not playing anywhere."

* `spotify-this-song`
    - search format: node liri.js spotify-this-song <song name>
    - source: Spotify API
    - default if no <song name> given: "The Sign"

* `movie-this`
    - search format: node liri.js movie-this <movie name>
    - source: OMDB API
    - default if no <movie name> given: "Mr Nobody"

* `do-what-it-says`
    - search format: node liri.js do-what-it-says
    - source: random.txt
    - default: `spotify-this-song` "I Want it That Way"

Default if no command or wrong command given: "Not a valid search term. Use `concert-this`, `spotify-this-song`, `movie-this` or `do-what-it-says` instead.

Successful requests are recorded in log.txt.

## Demo

Command line input in the bottom half of the screen, data being automatically appended to log.txt file in the top half:

[![Testing LIRI in Visual Studio Code](http://img.youtube.com/vi/M5yioavDQPA/0.jpg)](http://www.youtube.com/watch?v=M5yioavDQPA "Testing LIRI in Visual Studio Code")

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites

A basic understanding of JavaScript, Node.js, API querying, as well as a system meeting the minimum requirements and with access to the command line. (Not standard on Windows machines. You will have to install your own, e.g Git Bash* or Babun. On Mac OS X look in /Applications/Utilities/ for Terminal, on Linux the location of the command line will depend on whether you are using the Gnome or the KDE window manager. Then follow instructions in your chosen app's documentation.)

Here's a good tutorial if you're new to this environment: https://www.davidbaumgold.com/tutorials/command-line/.

\* Git for Windows will not run on anything older than Windows Vista (such as Windows XP or Windows Server 2003). 


Standard system requirements to run LIRI:

|  | Windows requirements | Mac requirements | Linux requirements |
|:---|:---:|:---:|:---:|
|**Operating system**|Windows 7 or later|Mac OS X Yosemite 10.10 or later 64-bit|Ubuntu 12.04+, Debian 8+, openSUSE 12.2+, or Fedora Linux 17+|
|**Processor**|Intel Pentium 4 or later	Intel|Intel Pentium 3 / Athlon 64 or later|
|**Memory**|2 GB minimum, 4 GB recommended|
|**Internet connection**|Required|

#### Installation

Fork or clone the repository from https://github.com/cfpaige/liri-node-app/.

![LIRI GitHub repository page screencap](/liri-clone.png)

The app has several dependencies:

* dotenv
* node-spotify-api
* request (alternative to axios)
* date-fns
* simple-node-logger (optional)

All of them are available as packages that can be installed with npm or bower, or added with yarn. Check out npm documentation for specific instructions. (E.g. for date-fns: https://www.npmjs.com/package/date-fns).

You will also need to request your own API keys for your LIRI app to be able to access the data, and store them in your own .env file.

#### Deployment

As this is a command-line app, there's no website to deploy. Store files on your own server or on GitHub. Deploy from the command line on your machine.

#### Usage

This is a CLI (Command Line Interface) demo app. Modify with your preferred requests and use it to practice fetching data from APIs.

#### Built With 

[Virtual Studio Code](https://code.visualstudio.com/)

**APIs used:** 
- Bands In Town
- Spotify
- OMDB

#### Contributing

Use the Issues feature of GitHub to suggest changes or fixes.

![LIRI Issues menu screencap](/liri-issues.png)

#### Authors

- **cfpaige** - https://github.com/cfpaige?tab=repositories

#### License

Licensed under GNU GPL v3.