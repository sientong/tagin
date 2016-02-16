Ext.data.JsonP.dev_enterkey({"guide":"<!--\nCopyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.\nFor licensing, see LICENSE.md.\n-->\n\n\n<h1 id='dev_enterkey-section-enter-key-configuration'>Enter Key Configuration</h1>\n\n<p>When CKEditor is integrated in some environments you may want to configure the default behavior of the <kbd>Enter</kbd> and <kbd>Shift+Enter</kbd> keys to generate matching output. This is possible thanks to <a href=\"#!/api/CKEDITOR.config-cfg-enterMode\" rel=\"CKEDITOR.config-cfg-enterMode\" class=\"docClass\">CKEDITOR.config.enterMode</a> and <a href=\"#!/api/CKEDITOR.config-cfg-shiftEnterMode\" rel=\"CKEDITOR.config-cfg-shiftEnterMode\" class=\"docClass\">CKEDITOR.config.shiftEnterMode</a>, respectively.</p>\n\n<p>Both configuration settings can use one of the following options:</p>\n\n<ul>\n<li><a href=\"#!/api/CKEDITOR-property-ENTER_P\" rel=\"CKEDITOR-property-ENTER_P\" class=\"docClass\">CKEDITOR.ENTER_P</a> &ndash; new <code>&lt;p&gt;</code> paragraphs are created;</li>\n<li><a href=\"#!/api/CKEDITOR-property-ENTER_BR\" rel=\"CKEDITOR-property-ENTER_BR\" class=\"docClass\">CKEDITOR.ENTER_BR</a> &ndash; lines are broken with <code>&lt;br&gt;</code> elements;</li>\n<li><a href=\"#!/api/CKEDITOR-property-ENTER_DIV\" rel=\"CKEDITOR-property-ENTER_DIV\" class=\"docClass\">CKEDITOR.ENTER_DIV</a> &ndash; new <code>&lt;div&gt;</code> blocks are created.</li>\n</ul>\n\n\n<div class=\"tip\">\n    <p>\n        Changing the <a href=\"#!/api/CKEDITOR.config-cfg-enterMode\">Enter Mode</a>\n        setting to <code>BR</code> or <code>DIV</code> is not recommended. The default\n        <code><a href=\"#!/api/CKEDITOR-property-ENTER_P\">CKEDITOR.ENTER_P</a></code>\n        mode is fully supported by all editor features and plugins and is also the most correct one\n        in terms of best practices for creating web content.\n    </p>\n    <p>\n        If you want to change it to control paragraph spacing, you should use stylesheets instead. Edit the\n        <code>contents.css</code> file and set up a suitable margin value for <code>&lt;p&gt;</code>\n        elements, for example:\n    <pre>p { margin: 0; }</pre>\n    </p>\n</div>\n\n\n<h2 id='dev_enterkey-section-enter-key-configuration-demo'>Enter Key Configuration Demo</h2>\n\n<p>See the <a href=\"../samples/enterkey.html\">working \"Enter Key Configuration\" sample</a> that showcases the effects of using different settings for <kbd>Enter</kbd> and <kbd>Shift+Enter</kbd> keys on editor output.</p>\n","title":"Enter Key Configuration","meta_description":"Configuring the output of Enter and Shift+Enter keys.","meta_keywords":"ckeditor, editor, wysiwyg, enter, shift, key, keystroke, break, line, paragraph, output, configure, configuration, setup, settings, options, customization, customize, customise, customisation, config, modification, modify, change"});