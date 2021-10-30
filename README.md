# vscode-tree-language

[![](https://vsmarketplacebadge.apphb.com/version-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)
[![](https://vsmarketplacebadge.apphb.com/downloads-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)
[![](https://vsmarketplacebadge.apphb.com/rating-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)


This VSCode Extension adds syntax highlighting support for `.tree` files - This is not a _real_ lanague but this is very helpful for reviewing `tree` command output.

### Features
- Syntax highlighting 💅
- Folding 🤏

### How do i generarte a tree?

The best way would be to install the `tree` command on your platoform and run something like `tree -I node_modules`

That would yeild something like this that you can then use the tree language in VSCode.

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
│	├── constants
└── static
	└── images
		├── screenshots
		└── templates
```
