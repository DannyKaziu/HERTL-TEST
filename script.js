const htmlEditor = ace.edit("htmlEditor");
const cssEditor = ace.edit("cssEditor");
const jsEditor = ace.edit("jsEditor");
const preview = document.getElementById("preview");

htmlEditor.setTheme("ace/theme/monokai");
cssEditor.setTheme("ace/theme/monokai");
jsEditor.setTheme("ace/theme/monokai");

htmlEditor.getSession().setMode("ace/mode/html");
cssEditor.getSession().setMode("ace/mode/css");
jsEditor.getSession().setMode("ace/mode/javascript");

function updatePreview() {
  const htmlCode = htmlEditor.getValue();
  const cssCode = `<style>${cssEditor.getValue()}</style>`;
  const jsCode = `<script>${jsEditor.getValue()}<\/script>`;
  preview.contentWindow.document.open();
  preview.contentWindow.document.write(htmlCode + cssCode + jsCode);
  preview.contentWindow.document.close();
}

htmlEditor.getSession().on("change", updatePreview);
cssEditor.getSession().on("change", updatePreview);
jsEditor.getSession().on("change", updatePreview);
