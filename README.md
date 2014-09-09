## Yeoman
Yeoman is console based tool that will help you scaffold app quickly. Just follow the next few steps.

To install yeaoman just run the followin npm script:

```bash
npm install -g yo
```

## Usage

Install `kendo-mobile` (not there yet):
```
npm install -g kendo-mobile
```
Or clone the repo and link it locally (open the folder and run the following script):

```
npm link
```

## Generators

Available generators:

* [kendo-mobile](#app) (aka [kendo-mobile:app](#app));
* [kendo-mobile:view](#view);
* [kendo-mobile:list](#list).

### App
Sets up a new Kendo mobile hybrid app, generating all the boilerplate you need to get started. The app generator  installs cordova, kendo and additional styles and scripts. Please note that the 'app generator' did not create your initial view. You should create it manually by running `yo kendo-mobile:view` and provide the name of the initial view.

#### Available options
* Navigation - drawer, tabstrip and custom;
* Themes - default, falt and bootstrap;
* Transitions - slide, zoom and fade;
* Everlive integration - only add the everlive scripts so far.

Example:
```bash
yo kendo-mobile [app-name]
```

### View
Generates view, model for it and inserts it in the navigation. 
Please make sure that the first view you add is the initial view you set for your app.

Example:
```bash
yo kendo-mobile:view
```

### List
Generates list and inserts in the selected view. You can choose the data source type - everlive, OData or REST and configure it with the appropriate options.

Example:
```bash
yo kendo-mobile:list
```

### Run in the browser 

Run `grunt serve` in the app root folder for fast and easy preview in the browser.

### Run in AppBuilder simulator

Change your current directory to the 'app' folder. Make sure you have [appbuilder cli](https://www.npmjs.org/package/appbuilder) installed. Then you need to init the AppBuilder app. And lastly just run the simulator.

```bash
npm install -g appbuilder
cd app
appbuilder init hybrid
appbuilder simulate
```


### Flow
Here are the steps to scaffold full-blown app.

1. Start by creating an app. (`kendo-mobile`)
2. Add several views. (`kendo-mobile:view`)
3. Add data-bound list to any of the views. (`kendo-mobile:list`)

## License

MIT
