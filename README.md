## Yeoman

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
Sets up a new Kendo mobile hybrid app, generating all the boilerplate you need to get started. The app generator  installs cordova, kendo and additional styles and scripts.

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

Example:
```bash
yo kendo-mobile:view
```

### List
Generates list and inserts in the selected view. The list data is hard-coded with 3 items for now.

Example:
```bash
yo kendo-mobile:list
```

### Run 

Run `grunt serve` in the app root folder for preview in the browser.

## License

MIT
