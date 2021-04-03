# Where2Learn

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/where2learn/where2learn)

## Intro to the project

This project is a web app intended to share knowledge.

There are lots of great, free resources online. Unfortunately, students seeking knowledge may not know these "treasures". This app will be a collection of these great resources, saving students time from Googling endlessly.

**Where2Learn** is not only an app with only of links to resources like a Yellow Page. It also has a special function called "roadmap". Roadmap is a tree-like structure which each node is a resource. Student can learn what and where to learn in order to achieve a target from a roadmap. A roadmap specifies the recommended order to learn many sub-topics.

Everyone registered on **Where2Learn** is welcomed to contribute. One can also "star" the resources provided by other people. Resources with the most stars will be listed at the top.

## Offical Websites

- [https://where2learn.info](https://where2learn.info) (production version)
- [https://dev.where2learn.info](https://dev.where2learn.info) (development version)

Since the app is in Alpha stage, the production website may not be always online. If production version isn't available, please use the development version for testing.

## Installation Instruction

Download the source code from the latest release.

[Release Page](https://github.com/where2learn/where2learn/releases)

This project is based on Firebase and TinyMCE, we won't share our API keys as that's too dangerous, you will need to register the API Keys if you want to run it locally.

### Procedures

1. Create a project on firebase
2. In the overview page, click **Add app** and add a web app (then follow the instructions)
   1. Pick a app name
   2. Select **Also set up Firebase Hosting for this app** if you want to host it online
   3. No need to add the Firebase SDK scripts to our project since our project is a react app and all dependencies are installed with npm
   4. `npm install -g firebase-tools`
   5. `firebase login`
   6. `firebase init` inside **frontend** directory
   7. Do not run `firebase deploy --only hosting:where2learn` yet.
3. Go into **Project settings** > **General** > **Your apps** > **Web apps** > **Firebase SDK snippet** > **Config**
   1. Copy the variable values and paste them into `.env.local`, see the code block below for format, Every environment variable names has to be exactly the same as what's in the code block
4. Go to **Storage** in filebase console > **Get started**
   1. Select any storage location
   2. Create the bucket
5. Enable **firestore**
6. Go back to **frontend**
   1. `npm install` to install all dependencies
   2. `npm start` to run the app locally
7. `firebase deploy --only hosting:where2learn` within **frontend** if you want to deploy the app
8. Get TinyMCE API Key
   1. Sign up/in at [https://www.tiny.cloud/](https://www.tiny.cloud/)
   2. Register the API Key for TinyMCE
   3. Paste the API key into `.env.local`

After getting the API Keys, fill in the following environment variables and save them to `./frontend/.env.local`

```
REACT_APP_FIREBASE_APIKEY=...
REACT_APP_FIREBASE_AUTHDOMAIN=...
REACT_APP_FIREBASE_PROJECTID=...
REACT_APP_FIREBASE_STORAGEBUCKET=...
REACT_APP_FIREBASE_MESSAGINGSENDERID=...
REACT_APP_FIREBASE_APPID=...

REACT_APP_TINY_MCE_API_KEY=...
```

## How to Use?

Terminologies:

1. Module: A single resource (can be anything, a book, a website, a playlist of video, etc.)
2. Roadmap: Essentially also a module, but a collection of other modules. The collection is in tree-structure, specifying the order of topics to study.

### Instructions

1. Register and Login just like other websites.
2. You can search with tags to filter out the topics you aren't interested in
3. Star a module/roadmap if you like it.
4. Add a module if you find some great resouce.
5. Create a roadmap if you want to explain the roadmap for achiving a target
   1. The content of your roadmap are modules, you can only select from your modules or the modules you've stared.
