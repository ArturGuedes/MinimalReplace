# Minimal Replace
_Dynamically insert to content into your HTML with `{{::syntax}}` to generate a unified file with the brackets extension. Keep the HTML super clean with Minimal Replace._

[![Version](https://badges.ml/arturguedes.minimaldark/version.svg)](https://brackets-extension-badges.github.io#arturguedes.minimaldark)
[![Downloads](https://badges.ml/arturguedes.minimaldark/total.svg)](https://brackets-extension-badges.github.io#arturguedes.minimaldark)
[![GitHub license](https://img.shields.io/github/license/ArturGuedes/MinimalDark.svg)](https://github.com/ArturGuedes/MinimalDark/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/ArturGuedes/MinimalDark.svg)]()


## Getting Started
There are a few ways to use Minimal Replace: with CDN to LivePreview, using the Brackets Extension, which generates a unified final file or Minimal Replace CDN + Minimal Replace Brackets extension.

### HTML syntax
Enter any variable with the `{{::name}}` syntax so that it is replaced by the `"name": "Arthur Phillip Dent"` declared inside the javascript
```html
<div class="card">
    <h1>I\'m {{::name}}</h1>
    <h2>from the {{::planet}}</h2>
</div>
```

### Minimal Replace CDN (LivePreview)
Copy and paste the syntax below into the `<body>` of your HTML
```javascript
<script>
    mr_data = {
        "name": "Arthur Phillip Dent",
        "planet": "Earth"
    }
</script>
<script src="https://arturguedes.github.io/MinimalReplace/js/minimalreplace.min.js"></script>
```

### Minimal Replace Brackets extension (Unified final file)
Access the `Minimal> Setup Minimal Replace structure` to create the basic structure of files and folders.
The `mr_data` object is declared inside the javascritp file of the same name as the HTML file

#### Structure
```
    .
    ├── ...
    ├── mr-structure            # Minimal Replace folder
    │   ├── example.html        # HTML page containing the expressions {{:: value}}
    │   ├── example.js          # Javascript with mr_data ={...} object
    |   └── ...
    ├── example.html            # Final file unified by HTML and mr_data
    └── ...
```

**Note:** The `mr_data` object accepts HTML expressions, but an error occurs when the quotation marks are closed incorrectly. For correct use of the expression: `"link": "<a href="#">Link</a>"` always use backslash before a quote, like this: `"link": "<a href=\"#\">Link</a>"`

### Change History
* 11/23/2018:
    * Initial code

## License

This project is licensed under the GNU General Public License v3.0. Read [LICENSE](LICENSE) for further information.


