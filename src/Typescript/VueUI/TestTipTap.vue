<template>
  <div>
    <hr>
    <div v-if="editor !== null">
      <EditorMenuBubble :editor="editor" v-slot="{ commands, isActive, menu }">
        <div
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

          <button :class="{ 'is-active': isActive.bold() }" @click.stop.prevent="commands.bold">Bold</button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>
        </div>
      </EditorMenuBubble>
      <EditorContent :editor="editor"/>
    </div>
    <hr>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Editor, EditorContent, EditorMenuBubble } from "tiptap";
import { Heading, Bold } from "tiptap-extensions";

@Component({
  components: {
    EditorContent,
    EditorMenuBubble
  }
})
export default class TestTipTapVue extends Vue {
  editor: Editor | null = null;

  mounted() {
    this.editor = new Editor({
      content: "<p>This is just a boring paragraph</p>",
      extensions: [new Heading({ levels: [1, 2, 3] }), new Bold()]
    });
  }

  beforeDestroy() {
    if (this.editor !== null) {
      this.editor.destroy();
    }
  }
}
</script>
