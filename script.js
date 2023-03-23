const htmlEditor = ace.edit("htmlEditor");
const cssEditor = ace.edit("cssEditor");
const jsEditor = ace.edit("jsEditor");
const preview = document.getElementById("preview");
const saveSnippet = document.getElementById("saveSnippet");

htmlEditor.setTheme("ace/theme/monokai");
cssEditor.setTheme("ace/theme/monokai");
jsEditor.setTheme("ace/theme/monokai");

htmlEditor.getSession().setMode("ace/mode/html");
cssEditor.getSession().setMode("ace/mode/scss"); // Changed to SCSS
jsEditor.getSession().setMode("ace/mode/babel"); // Changed to Babel

function updatePreview() {
  const htmlCode = htmlEditor.getValue();
  const cssCode = cssEditor.getValue();
  const jsCode = jsEditor.getValue();

  // Compile SCSS to CSS
  Sass.compile(cssCode, function(result) {
    const compiledCss = `<style>${result.text}</style>`;

    // Compile ES6+ to ES5
    const compiledJs = Babel.transform(jsCode, { presets: ['es2015'] }).code;
    const jsScript = `<script>${compiledJs}<\/script>`;

    preview.contentWindow.document.open();
    preview.contentWindow.document.write(htmlCode + compiledCss + jsScript);
    preview.contentWindow.document.close();
  });
}

htmlEditor.getSession().on("change", updatePreview);
cssEditor.getSession().on("change", updatePreview);
jsEditor.getSession().on("change", updatePreview);

saveSnippet.addEventListener("click", () => {
  const snippet = {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue()
  };

  const serializedSnippet = btoa(JSON.stringify(snippet));
  const
