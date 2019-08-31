### Gulp-Blog Compiler

This simple template provides a framework for building a Github-Pages blog using NPM modules with an easy testing framework. Simply design your project in the src/ directory and watch it be built to the docs/ folder.

Great for beginners who want to use NPM modules in the browser.

All NPM Modules are browserified in the build process, so don't worry about including them as HTML tags :)

The best part is that your templates are stored in markdown, which means that almost anyone can help you build your site by easily adding .md text files to the src directory. 

## About Github Pages

Github pages provides free hosting and HTTPS handling for static websites. Once your website is built to the docs/ folder, push your changes to the master branch of your repo and you'll see them hosted live. 

## About Gulp

Gulp uses Tasks to manage Globs of content. In this solution we will Watch directories for changes and rebuild the docs/ folder whenever changes are found. "gulp serve" can be used to watch, build, and serve these files on localhost:8080