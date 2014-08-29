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

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `grunt serve` for preview.

## Generators

Available generators:

* [kendo-mobile](#app) (aka [kendo-mobile:app](#app))
* [kendo-mobile:tab](#tab)

### App
Sets up a new Kendo mobile hybrid app, generating all the boilerplate you need to get started. The app generator  installs cordova, kendo and additional styles and scripts.

Example:
```bash
yo kendo-mobile [app-name]
```

### Tab
Generates main tab-strip navigation with the coresponding views and connects them. It will modify your `index.html` file.

Example:
```bash
yo kendo-mobile:tab
```

## License

MIT
