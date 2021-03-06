Ext.data.JsonP.dev_howtos_dialog_windows({"guide":"<!--\nCopyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.\nFor licensing, see LICENSE.md.\n-->\n\n\n<h1 id='dev_howtos_dialog_windows-section-dialog-windows'>Dialog Windows</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/dev_howtos_dialog_windows-section-how-do-i-change-the-contents-of-a-ckeditor-dialog-window%3F'>How Do I Change the Contents of a CKEditor Dialog Window?</a></li>\n<li>\n<a href='#!/guide/dev_howtos_dialog_windows-section-how-do-i-set-a-default-value-for-a-ckeditor-dialog-window-field%3F'>How Do I Set a Default Value for a CKEditor Dialog Window Field?</a></li>\n<li>\n<a href='#!/guide/dev_howtos_dialog_windows-section-how-do-i-set-a-specific-dialog-window-tab-to-open-by-default%3F'>How Do I Set a Specific Dialog Window Tab to Open by Default?</a></li>\n<li>\n<a href='#!/guide/dev_howtos_dialog_windows-section-how-do-i-learn-the-names-of-ckeditor-dialog-window-fields%3F'>How Do I Learn the Names of CKEditor Dialog Window Fields?</a></li>\n<li>\n<a href='#!/guide/dev_howtos_dialog_windows-section-how-do-i-remove-the-ability-to-resize-all-ckeditor-dialog-windows%3F'>How Do I Remove the Ability to Resize All CKEditor Dialog Windows?</a></li>\n<li>\n<a href='#!/guide/dev_howtos_dialog_windows-section-how-do-i-remove-the-ability-to-resize-specific-ckeditor-dialog-windows%3F'>How Do I Remove the Ability to Resize Specific CKEditor Dialog Windows?</a></li></ol>\n</div>\n\n<h2 id='dev_howtos_dialog_windows-section-how-do-i-change-the-contents-of-a-ckeditor-dialog-window%3F'>How Do I Change the Contents of a CKEditor Dialog Window?</h2>\n\n<p>CKEditor allows you to customize dialog windows without changing the original editor code. For an example on how to add or remove dialog window tabs and fields refer to the <strong>Using the JavaScript API to customize dialog windows</strong> <a href=\"http://nightly.ckeditor.com/latest/ckeditor/samples/plugins/dialog/dialog.html\">sample</a> and its <a href=\"https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/dialog/samples/dialog.html\">source code</a> from your CKEditor installation.</p>\n\n<h2 id='dev_howtos_dialog_windows-section-how-do-i-set-a-default-value-for-a-ckeditor-dialog-window-field%3F'>How Do I Set a Default Value for a CKEditor Dialog Window Field?</h2>\n\n<p>In order to assign a default value to a dialog window field, use the 'default' parameter in the dialog window UI element definition.</p>\n\n<pre><code>elements: [\n    {\n        type: 'text',\n        id: 'myCustomField',\n        label: 'My Custom Field',\n        'default': 'Default Custom Field Value!'\n    },\n    {\n        type: 'checkbox',\n        id: 'myCheckbox',\n        label: 'This checkbox is selected by default',\n        'default': true\n    }\n]\n</code></pre>\n\n<p>The code above creates the following UI elements in a sample dialog window tab.</p>\n\n<p><p><img src=\"guides/dev_howtos_dialog_windows/dialog_custom_1.png\" alt=\"Sample dialog window tab containing two field with default values\" width=\"439\" height=\"238\"></p></p>\n\n<p>You can also customize existing dialog windows and give them default values. The following code sets the default <strong>URL</strong> field value for the <strong>Link</strong> dialog window.</p>\n\n<pre><code>CKEDITOR.on( 'dialogDefinition', function( ev ) {\n    // Take the dialog name and its definition from the event data.\n    var dialogName = ev.data.name;\n    var dialogDefinition = ev.data.definition;\n\n    // Check if the definition is from the dialog window you are interested in (the \"Link\" dialog window).\n    if ( dialogName == 'link' ) {\n        // Get a reference to the \"Link Info\" tab.\n        var infoTab = dialogDefinition.getContents( 'info' );\n\n        // Set the default value for the URL field.\n        var urlField = infoTab.get( 'url' );\n        urlField[ 'default' ] = 'www.example.com';\n    }\n});\n</code></pre>\n\n<p>After this customization the <strong>Link</strong> dialog window will contain the <code>www.example.com</code> default value in the <strong>URL</strong> field.</p>\n\n<p><p><img src=\"guides/dev_howtos_dialog_windows/dialog_custom_2.png\" alt=\"Link dialog window with a default value for the URL field\" width=\"397\" height=\"339\"></p></p>\n\n<p>For more examples on setting a default field value refer to the <strong>Using the JavaScript API to customize dialog windows</strong> <a href=\"http://nightly.ckeditor.com/latest/ckeditor/samples/plugins/dialog/dialog.html\">sample</a> and its <a href=\"https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/dialog/samples/dialog.html\">source code</a> from your CKEditor installation.</p>\n\n<p><strong>Note</strong>: Since in some old browsers <code>default</code> is a reserved word in JavaScript, remember to always put it in quotes when used in your code (<code>'default'</code>).</p>\n\n<h2 id='dev_howtos_dialog_windows-section-how-do-i-set-a-specific-dialog-window-tab-to-open-by-default%3F'>How Do I Set a Specific Dialog Window Tab to Open by Default?</h2>\n\n<p>If you want to change your CKEditor configuration to show a different tab on opening a dialog window, you can hook into the <a href=\"#!/api/CKEDITOR.dialog.definition-property-onShow\" rel=\"CKEDITOR.dialog.definition-property-onShow\" class=\"docClass\">onShow</a> event of the dialog window.</p>\n\n<p>Firstly, you will need to know the names of the dialog window and the tab that you want to set as default, so use the <a href=\"#!/guide/dev_howtos_dialog_windows-section-4\">Developer Tools</a> plugin to get these.</p>\n\n<p>Once you have the names you can add the following code into the page that contains your CKEditor instance. The example below sets the <strong>Image Properties</strong> dialog window to open the <strong>Advanced</strong> tab by default.</p>\n\n<pre><code>CKEDITOR.on('dialogDefinition', function( ev ) {\n    // Take the dialog window name and its definition from the event data.\n    var dialogName = ev.data.name;\n    var dialogDefinition = ev.data.definition;\n\n    if ( dialogName == 'image' ) {\n        dialogDefinition.onShow = function() {\n            // This code will open the Advanced tab.\n            this.selectPage( 'advanced' );\n        };\n    }\n});\n</code></pre>\n\n<p>If, for example, you want to open the <strong>Upload</strong> tab first to make it more convenient for your users to use the (<a href=\"#!/guide/dev_howtos_file_upload\">existing and previously integrated</a>) file uploader, change the code in the following way:</p>\n\n<pre><code>// This code will open the Upload tab.\nthis.selectPage( 'Upload' );\n</code></pre>\n\n<h2 id='dev_howtos_dialog_windows-section-how-do-i-learn-the-names-of-ckeditor-dialog-window-fields%3F'>How Do I Learn the Names of CKEditor Dialog Window Fields?</h2>\n\n<p>If you want to customize a <a href=\"#!/guide/user_interace_dialog_windows\">dialog window</a>, the easiest and most convenient way is to enable the <a href=\"http://ckeditor.com/addon/devtools\">Developer Tools</a> plugin that displays the name and IDs of all dialog window elements when you hover them with your mouse.</p>\n\n<p>The following figure shows the tooltip that describes the <strong>URL</strong> field of the <strong>Link</strong> dialog window that is displayed after the <strong>Developer Tools</strong> plugin was enabled.</p>\n\n<p><p><img src=\"guides/dev_howtos_dialog_windows/dialog_dev_tools.png\" alt=\"Element information displayed with the Developer Tools plugin in CKEditor\" width=\"390\" height=\"353\"></p></p>\n\n<h2 id='dev_howtos_dialog_windows-section-how-do-i-remove-the-ability-to-resize-all-ckeditor-dialog-windows%3F'>How Do I Remove the Ability to Resize All CKEditor Dialog Windows?</h2>\n\n<p>Dialog windows of CKEditor can be resized by using the resizing grip located in the bottom right-hand corner of a dialog window (for RTL languages — in the bottom left-hand corner).</p>\n\n<p><p><img src=\"guides/dev_howtos_dialog_windows/dialog_resize.png\" alt=\"The resizing grip of a CKEditor dialog window\" width=\"395\" height=\"339\"></p></p>\n\n<p>You can disable the resizing feature completely by setting the <a href=\"#!/api/CKEDITOR.dialog.definition-property-resizable\" rel=\"CKEDITOR.dialog.definition-property-resizable\" class=\"docClass\">resizable</a> parameter to <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_NONE\" rel=\"CKEDITOR-property-DIALOG_RESIZE_NONE\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_NONE</a>.</p>\n\n<pre><code>CKEDITOR.on( 'dialogDefinition', function( ev ) {\n    ev.data.definition.resizable = <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_NONE\" rel=\"CKEDITOR-property-DIALOG_RESIZE_NONE\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_NONE</a>;\n});\n</code></pre>\n\n<p>Use the <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_WIDTH\" rel=\"CKEDITOR-property-DIALOG_RESIZE_WIDTH\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_WIDTH</a> and <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_HEIGHT\" rel=\"CKEDITOR-property-DIALOG_RESIZE_HEIGHT\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_HEIGHT</a> values to enable resizing of a dialog window in one dimension only.</p>\n\n<h2 id='dev_howtos_dialog_windows-section-how-do-i-remove-the-ability-to-resize-specific-ckeditor-dialog-windows%3F'>How Do I Remove the Ability to Resize Specific CKEditor Dialog Windows?</h2>\n\n<p>If you want to leave the resizing feature for some of the dialog windows and turn it off for others, you may define the value of the <a href=\"#!/api/CKEDITOR.dialog.definition-property-resizable\" rel=\"CKEDITOR.dialog.definition-property-resizable\" class=\"docClass\">resizable</a> parameter for each dialog window separately, like in the example below.</p>\n\n<pre><code>CKEDITOR.on( 'dialogDefinition', function( ev ) {\n    if ( ev.data.name == 'link' )\n        ev.data.definition.resizable = <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_NONE\" rel=\"CKEDITOR-property-DIALOG_RESIZE_NONE\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_NONE</a>;\n    else if ( ev.data.name == 'image' )\n        ev.data.definition.resizable = <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_HEIGHT\" rel=\"CKEDITOR-property-DIALOG_RESIZE_HEIGHT\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_HEIGHT</a>;\n});\n</code></pre>\n\n<p>Use the <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_WIDTH\" rel=\"CKEDITOR-property-DIALOG_RESIZE_WIDTH\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_WIDTH</a> and <a href=\"#!/api/CKEDITOR-property-DIALOG_RESIZE_HEIGHT\" rel=\"CKEDITOR-property-DIALOG_RESIZE_HEIGHT\" class=\"docClass\">CKEDITOR.DIALOG_RESIZE_HEIGHT</a> values to enable resizing of a dialog window in one dimension only.</p>\n","title":"Dialog Windows","meta_description":"Most frequently asked question and answers about dialog windows in CKEditor.","meta_keywords":"ckeditor, editor, wysiwyg, howto, howtos, faq, questions, answers, dialog, dialogs, window, popup, tab, tabs, default, resize, resizing, developer, tools"});