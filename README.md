## Yeoman

To install yeaoman just run the followin npm script:

```bash
npm install -g yo
```

## Generators

Available generators:

* [kendo-mobile](#app) (aka [kendo-mobile:app](#app))
* [kendo-mobile:tab](#tab)

To install generator-kendo-mobile from npm, run:

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Bootstrap and additional AngularJS modules, such as angular-resource (installed by default).

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
