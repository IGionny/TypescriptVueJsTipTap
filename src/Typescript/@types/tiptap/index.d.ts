declare module 'tiptap' {
    import Vue from 'vue';


    class EditorContent extends Vue { 

        editor(editor: Editor) : void;

    }
    class EditorMenuBar extends Vue { }
    class EditorMenuBubble extends Vue { }
    class Emitter {
        on(event: any, fn: Function): Emitter;
        emit(event: any, ...args: any[]): Emitter;
        off(event: any, fn: Function): Emitter;
    }


    interface IEmptyDocument {
        type: string;
        content: any[];
    }

    interface EditorSettings {
        editorProps?: object,
        editable?: boolean,
        autoFocus?: any,
        extensions?: any[],
        content?: string,
        emptyDocument?: IEmptyDocument;

        useBuiltInExtensions?: boolean;
        disableInputRules?: boolean;
        disablePasteRules?: boolean;
        dropCursor?: object;
        parseOptions?: object;
        injectCSS?: boolean;
        onInit?: () => {};
        onTransaction?: () => {};
        onUpdate?: () => {};
        onFocus?: () => {};
        onBlur?: () => {};
        onPaste?: () => {};
        onDrop?: () => {};
    }


    class Editor extends Emitter {
        destroy(): void;
        constructor(settings: EditorSettings);
    }

    export { Editor, EditorContent, EditorMenuBar, EditorMenuBubble, EditorSettings }
}