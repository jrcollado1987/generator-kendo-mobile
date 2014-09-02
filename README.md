## Yeoman

To install yeaoman just run the followin npm script:

```bash
npm install -g yo
```

## Usage

Install `kendo-mobile`:
```
npm install -g kendo-mobile
```
Or clone the repo and link it locally:

```
npm link
```

Run `grunt serve` for preview.

## Generators

Available generators:

* [kendo-mobile](#app) (aka [kendo-mobile:app](#app))
* [kendo-mobile:view](#view)
* [kendo-mobile:list](#list)

### App
Sets up a new Kendo mobile hybrid app, generating all the boilerplate you need to get started. The app generator  installs cordova, kendo and additional styles and scripts.

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
Generates list and inserts in the selected view.

Example:
```bash
yo kendo-mobile:list
```

## License

MIT
