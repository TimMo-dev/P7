<template>
  <div class="editor-container">
    <div ref="monacoContainer" class="monaco-editor"></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "MonacoEditor",
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    // Initialize the Monaco Editor when the component is mounted
    this.editor = monaco.editor.create(this.$refs.monacoContainer, {
      value: `print("Hello, World!")`,
      language: "python", // Specify the language (e.g., python, javascript, etc.)
      theme: "vs-dark", // Editor theme (vs, vs-dark, hc-black)
      automaticLayout: true,
    });
  },
  beforeDestroy() {
    // Dispose the editor when the component is destroyed
    if (this.editor) {
      this.editor.dispose();
    }
  },
};
</script>

<style>
.editor-container {
  height: 100vh;
  width: 100%;
}

.monaco-editor {
  height: 100%;
  width: 100%;
}
</style>
