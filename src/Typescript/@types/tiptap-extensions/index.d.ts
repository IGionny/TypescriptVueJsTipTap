declare module 'tiptap-extensions' {

    import { Editor } from "tiptap";

    class Extension {
        init(): null;
        bindEditor(editor: Editor | null): void;
        name: string | null;
        type: string | null;
        update: Function;
        defaultOptions: object;
        plugins: any[];
        inputRules: any[];
        pasteRules: any[];
        keys(): object;
    }

    class Mark extends Extension {
        constructor(options?: any);
        view: string | null;
        schema: object | null;
        command(): Function;
    }

    class Node extends Extension{
        constructor(options?: any);
    }

    class Bold extends Mark {

    }

    class Heading extends Node {

    }

    export { Bold, Heading }

}