Ext.data.JsonP.dev_mathjax({"guide":"<!--\nCopyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.\nFor licensing, see LICENSE.md.\n-->\n\n\n<h1 id='dev_mathjax-section-creating-mathematical-formulas'>Creating Mathematical Formulas</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/dev_mathjax-section-displaying-on-target-page'>Displaying on Target Page</a></li>\n<li>\n<a href='#!/guide/dev_mathjax-section-changing-path-to-mathjax-library'>Changing Path to MathJax Library</a></li>\n<li>\n<a href='#!/guide/dev_mathjax-section-changing-default-class'>Changing Default Class</a></li>\n<li>\n<a href='#!/guide/dev_mathjax-section-mathematical-formulas-demo'>Mathematical Formulas Demo</a></li></ol>\n</div>\n\n<p class=\"requirements\">\n    This feature was introduced in <strong>CKEditor 4.3</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the <a href=\"http://ckeditor.com/download\">Download</a> site and <a href=\"#!/guide/dev_widget_installation\">needs to be added to your custom build</a> with <a href=\"http://ckeditor.com/builder\">CKBuilder</a>.\n</p>\n\n\n<p>The optional <a href=\"http://ckeditor.com/addon/mathjax\">Mathematical Formulas</a> plugin allows you to create and modify mathematical equations written in TeX directly in CKEditor. TeX content will be automatically replaced by a mathematical formulas widget when you put it in a <code>&lt;span class=\"math-tex\"&gt;</code> element.</p>\n\n<p>New equations can also be inserted into the editor content by using the <strong>Math</strong> toolbar button and entering TeX code in the plugin dialog window. After you click the <strong>OK</strong> button, a mathematical formulas widget will be inserted into the editor content.</p>\n\n<p><p><img src=\"guides/dev_mathjax/mathjax_01.png\" alt=\"\" width=\"923\" height=\"433\"></p></p>\n\n<p>Do note that the equations will be output in plain TeX format with MathJax delimiters, <code>\\(</code> and <code>\\)</code>, like in the example below:</p>\n\n<pre><code>&lt;span class=\"math-tex\"&gt;\\( \\sqrt{\\frac{a}{b}} \\)&lt;/span&gt;\n</code></pre>\n\n<p>Equations are inserted as widgets, so they have <a href=\"#!/guide/dev_widgets-section-common-usage-scenarios\">all advantages of widgets</a>, i.e. you can <strong>treat the entire equation as one entity</strong> and select, delete, or move it with drag and drop in the editor content area as one unit.</p>\n\n<h2 id='dev_mathjax-section-displaying-on-target-page'>Displaying on Target Page</h2>\n\n<p>In order to display mathematical formulas on a target page, i.e. the page where content produced by CKEditor will be visible, the target page needs to <a href=\"http://docs.mathjax.org/en/latest/start.html\">include the MathJax script</a>. It is advisable to use the same MathJax library version as set in the <a href=\"#!/api/CKEDITOR.config-cfg-mathJaxLib\" rel=\"CKEDITOR.config-cfg-mathJaxLib\" class=\"docClass\">CKEDITOR.config.mathJaxLib</a> configuration option. For example for the default setting this would be:</p>\n\n<pre><code>&lt;script type=\"text/javascript\" src=\"http://cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML\"&gt;&lt;/script&gt;\n</code></pre>\n\n<h2 id='dev_mathjax-section-changing-path-to-mathjax-library'>Changing Path to MathJax Library</h2>\n\n<p>By default the MathJax library is loaded from the <a href=\"http://docs.mathjax.org/en/latest/start.html#using-the-mathjax-content-delivery-network-cdn\">official MathJax CDN</a>. You can however use the <a href=\"#!/api/CKEDITOR.config-cfg-mathJaxLib\" rel=\"CKEDITOR.config-cfg-mathJaxLib\" class=\"docClass\">CKEDITOR.config.mathJaxLib</a> setting to use a different path, either a local resource or a different web resource. This configuration option accepts a full or an absolute path. For example:</p>\n\n<pre><code>config.mathJaxLib = 'http:\\/\\/example.com\\/libs\\/MathJax.js';\n</code></pre>\n\n<h2 id='dev_mathjax-section-changing-default-class'>Changing Default Class</h2>\n\n<p>You can also modify the default class for <code>&lt;span&gt;</code> elements that are automatically converted into mathematical formulas widgets. Use the <a href=\"#!/api/CKEDITOR.config-cfg-mathJaxClass\" rel=\"CKEDITOR.config-cfg-mathJaxClass\" class=\"docClass\">CKEDITOR.config.mathJaxClass</a> option to provide a custom class. For example this setting:</p>\n\n<pre><code>config.mathJaxClass = 'equation';\n</code></pre>\n\n<p>will turn all <code>&lt;span class=\"equation\"&gt;</code> elements into mathematical formulas widgets, including this one:</p>\n\n<pre><code>&lt;span class=\"equation\"&gt;\\( \\sqrt{\\frac{a}{b}} \\)&lt;/span&gt;\n</code></pre>\n\n<h2 id='dev_mathjax-section-mathematical-formulas-demo'>Mathematical Formulas Demo</h2>\n\n<p>See the <a href=\"../samples/mathjax.html\">working \"Creating Mathematical Formulas\" sample</a> that showcases the Mathematical Formulas plugin with its MathJax widget that supports writing equations in TeX.</p>\n","title":"Mathematical Formulas","meta_description":"Creating mathematical formulas using TeX.","meta_keywords":"ckeditor, editor, wysiwyg, mathjax, mathematics, math, maths, equation, equations, formula, formulas, formulae, mathematical, tex, latex, widget, drag, drop"});