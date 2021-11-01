# vscode-tree-language

[![](https://vsmarketplacebadge.apphb.com/version-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)
[![](https://vsmarketplacebadge.apphb.com/downloads-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)
[![](https://vsmarketplacebadge.apphb.com/rating-short/CTC.vscode-tree-extension.svg)](https://marketplace.visualstudio.com/items?itemName=CTC.vscode-tree-extension)


This VSCode Extension adds syntax highlighting support for `.tree` files - This is not a _real_ lanague but this is very helpful for reviewing `tree` command output.

### Features
- Syntax highlighting 💅
- Folding 🤏

### Demo
![2021-11-01_10-45-11 (1)](https://user-images.githubusercontent.com/996134/139699698-4f1baec9-4ea8-422d-9a22-0a7a1f23f901.gif)



### How do I generate a tree?

The best way for now would be to install the `tree` command on your platform. These differ platform to platform so beware that you might run into issues.

**NOTE: We plan on building our own CLI that will have its own implementation of tree to unifiy the landscape**

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
