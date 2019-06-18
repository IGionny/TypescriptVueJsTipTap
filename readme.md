# Typescript VueJS TipTap
A POC to show how to use the [VueJS](https://github.com/vuejs/vue)  [TipTap](https://github.com/scrumpy/tiptap) component with TypeScript

## Typescript definitions
TipTap component to be imported, need a Typescript module definition (aka d.ts file).

You can find a draft definition (not complete yet) into the path: `~/src/Typescript/@types/`

This definition is complete enough to permit import the TipTap component into another VueJs component written in Typescript lang.

**Note**: the module name `declare module 'tiptap'` match exactly the import statement `import { Editor, EditorContent, EditorMenuBubble } from "tiptap";`

## Webpack configuration
In webpack.config.js set aliases in this way:

```
 alias: {
      //$ -> Exact match
      "vue$": "vue/dist/vue.esm.js",
      "tiptap$" : path.resolve(__dirname, "node_modules", "tiptap/dist/tiptap.esm.js"),
      "tiptap-commands$" : path.resolve(__dirname, "node_modules", "tiptap-commands/dist/commands.esm.js"),
      "tiptap-extensions$" : path.resolve(__dirname, "node_modules", "tiptap-extensions/dist/extensions.esm.js"),
      "tiptap-utils$" : path.resolve(__dirname, "node_modules", "tiptap-utils/dist/utils.esm.js"),
    }
```    

## Issues:

The final result is a 300Kbyte js file


## NPM commands:

- `npm install` to restore npm packages
- `npm run-script build` to build the final package
- `npm run-script dev` to run the webpack dev server into the port 3000 (http://localhost:3000)