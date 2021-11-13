# vscode-tree-language

[![](https://vsmarketplacebadge.apphb.com/version-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)
[![](https://vsmarketplacebadge.apphb.com/downloads-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)
[![](https://vsmarketplacebadge.apphb.com/rating-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)


This VSCode Extension adds syntax highlighting support for `.tree` files - This is not a _real_ language but this is very helpful for reviewing `tree` command output.

### Features
- Syntax highlighting 💅
- Folding 🤏
- [Web extension support](https://code.visualstudio.com/api/extension-guides/web-extensions) 🕸

### Demo
<img src="https://user-images.githubusercontent.com/996134/139699698-4f1baec9-4ea8-422d-9a22-0a7a1f23f901.gif" width="420">

### How do I generate a tree?

Please use the [@structure-codes/cli](https://github.com/structure-codes/cli) to generate a structure file. Otherwise, you may use the `tree` command of your liking but results may vary.

```
├── functions
├── src
│	├── articles
│	├── components
│	│	├── builder
│	│	│	├── center
│	│	│	├── left
│	│	│	│	└── sections
│	│	│	├── lists
│	│	│	└── right
│	│	│		└── sections
│	│	├── dashboard
│	│	├── landing
│	│	├── router
│	│	└── shared
│	└── constants
└── static
	└── images
		├── screenshots
		└── templates
```
