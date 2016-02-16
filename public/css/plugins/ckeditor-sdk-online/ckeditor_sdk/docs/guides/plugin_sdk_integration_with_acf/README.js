Ext.data.JsonP.plugin_sdk_integration_with_acf({"guide":"<!--\nCopyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.\nFor licensing, see LICENSE.md.\n-->\n\n\n<h1 id='plugin_sdk_integration_with_acf-section-integrating-plugins-with-advanced-content-filter'>Integrating Plugins with Advanced Content Filter</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/plugin_sdk_integration_with_acf-section-integrating-with-acf-to-introduce-a-new-content-type'>Integrating with ACF to Introduce a New Content Type</a><ol>\n<li>\n<a href='#!/guide/plugin_sdk_integration_with_acf-section-what-is-an-editor-feature%3F'>What is an Editor Feature?</a></li>\n</ol>\n<li>\n<a href='#!/guide/plugin_sdk_integration_with_acf-section-integrating-with-acf-to-activate-editor-features'>Integrating with ACF to Activate Editor Features</a></li>\n<li>\n<a href='#!/guide/plugin_sdk_integration_with_acf-section-integrating-with-acf-for-content-transformations'>Integrating with ACF for Content Transformations</a></li>\n<li>\n<a href='#!/guide/plugin_sdk_integration_with_acf-section-abbreviation-plugin-demo'>Abbreviation Plugin Demo</a></li>\n<li>\n<a href='#!/guide/plugin_sdk_integration_with_acf-section-further-reading'>Further Reading</a></li></ol>\n</div>\n\n<p class=\"requirements\">\n    Advanced Content Filter was introduced in <strong>CKEditor 4.1</strong>.\n</p>\n\n\n<p>CKEditor consists of a number of <a href=\"#!/api/CKEDITOR.feature\" rel=\"CKEDITOR.feature\" class=\"docClass\">editor features</a> like\ncommands, buttons, drop-down lists, or dialog windows. The role of plugins is\nto extend the set of available features. However, <strong>since the introduction of\n<a href=\"#!/guide/dev_acf\">Advanced Content Filter</a>,\nfeatures, and the content they generate, are subject to filtering</strong>.</p>\n\n<p>The introduction of Advanced Content Filter (ACF) have impacted the plugin\ndevelopment process and slightly changed the data processing model of CKEditor.\nWith Advanced Content Filter plugins can take control over the content available\nin the editor and adaptively adjust the user interface when allowed content changes.\nOf all the feature properties the following are crucial for correct plugin integration\nwith ACF:</p>\n\n<ul>\n<li><a href=\"#!/api/CKEDITOR.feature-property-allowedContent\" rel=\"CKEDITOR.feature-property-allowedContent\" class=\"docClass\">CKEDITOR.feature.allowedContent</a> &ndash; determines the type of\ncontent that is allowed by the feature to enter the editor. In most cases\nthis is the content that this feature generates.</li>\n<li><a href=\"#!/api/CKEDITOR.feature-property-requiredContent\" rel=\"CKEDITOR.feature-property-requiredContent\" class=\"docClass\">CKEDITOR.feature.requiredContent</a> &ndash; defines a minimal\nset of content types that must be enabled to let the feature work.</li>\n<li><a href=\"#!/api/CKEDITOR.feature-property-contentForms\" rel=\"CKEDITOR.feature-property-contentForms\" class=\"docClass\">CKEDITOR.feature.contentForms</a> &ndash; defines markup transformations\nfor code consistency and correctness.</li>\n</ul>\n\n\n<p>This guide is based on the <a href=\"#!/guide/plugin_sdk_sample_2\">Simple Plugin (Part 2)</a>\ntutorial and explains all code adjustments that are required to make it compatible with\nAdvanced Content Filter.</p>\n\n<p class=\"tip\">\n    You can <a href=\"https://github.com/ckeditor/ckeditor-docs-samples/tree/master/tutorial-abbr-2\">download the\n    entire plugin folder</a> used in the Simple Plugin (Part 2) tutorial to follow the changes\n    introduced in this guide.\n</p>\n\n\n<h2 id='plugin_sdk_integration_with_acf-section-integrating-with-acf-to-introduce-a-new-content-type'>Integrating with ACF to Introduce a New Content Type</h2>\n\n<p>If you start with the code created for <a href=\"#!/guide/plugin_sdk_sample_2\">Simple Plugin (Part 2)</a>\nbut <strong>without specifying the <a href=\"#!/api/CKEDITOR.feature-property-allowedContent\" rel=\"CKEDITOR.feature-property-allowedContent\" class=\"docClass\">allowedContent</a> or\n<a href=\"#!/api/CKEDITOR.feature-property-requiredContent\" rel=\"CKEDITOR.feature-property-requiredContent\" class=\"docClass\">requiredContent</a> options</strong> you may notice\nthat the plugin is working, however, incoming abbreviations are filtered out as soon as possible.\nTry setting this HTML code in source mode and switch back to WYSIWYG view (you may need to do\nthis twice) to see that the <code>&lt;abbr&gt;</code> tag is gone:</p>\n\n<pre><code>&lt;p&gt;What is &lt;abbr title=\"Advanced Content Filter\"&gt;ACF&lt;/abbr&gt;?&lt;/p&gt;\n</code></pre>\n\n<p>Why is it so? The editor does not know that since the <strong>Abbreviation</strong> feature is enabled (the button\nis added to the toolbar), it should accept the <code>&lt;abbr&gt;</code> tag as <strong>allowed content</strong>. Without\n<a href=\"#!/api/CKEDITOR.feature-property-allowedContent\" rel=\"CKEDITOR.feature-property-allowedContent\" class=\"docClass\">allowedContent</a> property specified,\n<code>&lt;abbr&gt;</code> tags will always be discarded and the button itself will not guarantee that the feature is\nactually useable for the end-user.</p>\n\n<p>To add the <code>&lt;abbr&gt;</code> tag to the editor contents in a correct and automatic way, you need to\nextend the <code>abbrDialog</code> command definition when calling the\n<a href=\"#!/api/CKEDITOR.dialogCommand-method-constructor\" rel=\"CKEDITOR.dialogCommand-method-constructor\" class=\"docClass\">CKEDITOR.dialogCommand</a> constructor:</p>\n\n<pre><code>new <a href=\"#!/api/CKEDITOR.dialogCommand\" rel=\"CKEDITOR.dialogCommand\" class=\"docClass\">CKEDITOR.dialogCommand</a>( 'abbrDialog', {\n    allowedContent: 'abbr'\n} );\n</code></pre>\n\n<p>Try inserting the test HTML code again and check what happens when you switch between\nthe source and WYSIWYG modes. This is what you will see:</p>\n\n<pre><code>&lt;p&gt;What is &lt;abbr&gt;ACF&lt;/abbr&gt;?&lt;/p&gt;\n</code></pre>\n\n<p>But where is the <code>title</code> attribute? It was removed by the editor. And the same would happen to the\n<code>id</code> attribute that is supported by the <strong>Advanced Settings</strong> tab.</p>\n\n<p>In order to avoid this, you will have to <a href=\"#!/guide/dev_allowed_content_rules\">specify which <strong>attributes</strong> are allowed</a>,\ntoo. This was not done when setting <code>allowedContent</code> above, so will have to be fixed now:</p>\n\n<pre><code>new <a href=\"#!/api/CKEDITOR.dialogCommand\" rel=\"CKEDITOR.dialogCommand\" class=\"docClass\">CKEDITOR.dialogCommand</a>( 'abbrDialog', {\n    allowedContent: 'abbr[title,id]'\n} );\n</code></pre>\n\n<p>The <code>title</code> and <code>id</code> attributes will now be accepted for any <code>&lt;abbr&gt;</code> tag. Loading the <strong>Abbreviation</strong> button\nwill automatically extend filtering rules to accept a new content type and let\nthe new feature work as planned.</p>\n\n<h3 id='plugin_sdk_integration_with_acf-section-what-is-an-editor-feature%3F'>What is an Editor Feature?</h3>\n\n<p>What does it mean that \"a feature is enabled\"? Why did we define the\n<a href=\"#!/api/CKEDITOR.feature-property-allowedContent\" rel=\"CKEDITOR.feature-property-allowedContent\" class=\"docClass\">allowedContent</a> property\nfor the <strong>Abbreviation</strong> command definition and not for the button or the\nentire plugin?</p>\n\n<p>The first thing to keep in mind is that one plugin can introduce multiple features.\nFor example the <strong>basicstyles</strong> plugin adds numerous buttons and each one\nconstitutes a single feature. So it looks like a button is more likely to be a feature.</p>\n\n<p>However, in most cases a button just triggers a command &mdash; for example the\n<strong>Abbreviation</strong> button has a related <code>abbrDialog</code> command. This command\nmay also be triggered by a keystroke (see <a href=\"#!/api/CKEDITOR.config-cfg-keystrokes\" rel=\"CKEDITOR.config-cfg-keystrokes\" class=\"docClass\">CKEDITOR.config.keystrokes</a>)\nor directly from code (by <a href=\"#!/api/CKEDITOR.editor-method-execCommand\" rel=\"CKEDITOR.editor-method-execCommand\" class=\"docClass\">CKEDITOR.editor.execCommand</a>). Therefore,\nusually a command is the \"root\" of a feature. Please note that this is not always\nthe case &mdash; for example the <strong>Format</strong> drop-down list does not have a related\ncommand, so the <a href=\"#!/api/CKEDITOR.feature-property-allowedContent\" rel=\"CKEDITOR.feature-property-allowedContent\" class=\"docClass\">allowedContent</a> property\nis defined directly for it.</p>\n\n<p>The most typical way of enabling a feature is by adding its button to the\ntoolbar. The editor handles features activated in this way automatically, and:</p>\n\n<ol>\n<li>It checks if a button has the\n<a href=\"#!/api/CKEDITOR.feature-property-allowedContent\" rel=\"CKEDITOR.feature-property-allowedContent\" class=\"docClass\">allowedContent</a> property\n(is a feature itself). If yes, then its allowed content rule is registered in\nthe <a href=\"#!/api/CKEDITOR.editor-property-filter\" rel=\"CKEDITOR.editor-property-filter\" class=\"docClass\">CKEDITOR.editor.filter</a> which is responsible for all main ACF functions.</li>\n<li>If a button is not a feature itself, but has a related command, then that\ncommand is registered as a feature.</li>\n</ol>\n\n\n<p>If you need to register a feature manually from your plugin, you can use\nthe <a href=\"#!/api/CKEDITOR.editor-method-addFeature\" rel=\"CKEDITOR.editor-method-addFeature\" class=\"docClass\">CKEDITOR.editor.addFeature</a> method. It accepts\nan object implementing the <a href=\"#!/api/CKEDITOR.feature\" rel=\"CKEDITOR.feature\" class=\"docClass\">CKEDITOR.feature</a> interface.\nRefer to the API documentation for more details.</p>\n\n<h2 id='plugin_sdk_integration_with_acf-section-integrating-with-acf-to-activate-editor-features'>Integrating with ACF to Activate Editor Features</h2>\n\n<p>Once the editor was configured to work with the new content type,\nit is a good moment to check what would happen if the <strong>Abbreviation</strong> plugin\nwas enabled, but the <a href=\"#!/api/CKEDITOR.config-cfg-allowedContent\" rel=\"CKEDITOR.config-cfg-allowedContent\" class=\"docClass\">CKEDITOR.config.allowedContent</a> option deliberately omitted the\n<code>&lt;abbr&gt;</code> tag:</p>\n\n<pre><code><a href=\"#!/api/CKEDITOR-method-replace\" rel=\"CKEDITOR-method-replace\" class=\"docClass\">CKEDITOR.replace</a>( 'editor1', {\n    extraPlugins: 'abbr',\n    allowedContent: 'p' // Only paragraphs will be accepted.\n});\n</code></pre>\n\n<p>You may notice that many features like formatting buttons, text alignment, and\nmany others are gone. The content that they produce (<code>&lt;strong&gt;</code>, <code>text-align</code>, etc.)\nis simply invalid within this configuration environment.</p>\n\n<p>This is not the case with the <strong>Abbreviation</strong> button which shows up, but in fact no longer\nmakes any sense because the user configuration overwrites any rules\n<a href=\"#!/guide/plugin_sdk_integration_with_acf-section-2\">automatically added</a> by this feature.</p>\n\n<p>By specifying the <a href=\"#!/api/CKEDITOR.feature-property-requiredContent\" rel=\"CKEDITOR.feature-property-requiredContent\" class=\"docClass\">requiredContent</a> property\nin the command definition we make sure that the <strong>Abbreviation</strong> button will adaptively\nadjust to filtering rules set by the user:</p>\n\n<pre><code>new <a href=\"#!/api/CKEDITOR.dialogCommand\" rel=\"CKEDITOR.dialogCommand\" class=\"docClass\">CKEDITOR.dialogCommand</a>( 'abbrDialog', {\n    allowedContent: 'abbr[title,id]',\n    requiredContent: 'abbr'\n} );\n</code></pre>\n\n<p>The <code>requiredContent: 'abbr'</code> rule means that the <strong>Abbreviation</strong> button requires\nthe <code>&lt;abbr&gt;</code> tag to be enabled to work. Otherwise, the feature will be disabled.\nThis makes sense because inserting and managing abbreviations in an editor that\ndiscards this kind of content is pointless.</p>\n\n<p>Let us consider another configuration setting that brings our plugin back to life by\naccepting <code>&lt;abbr&gt;</code> back again:</p>\n\n<pre><code><a href=\"#!/api/CKEDITOR-method-replace\" rel=\"CKEDITOR-method-replace\" class=\"docClass\">CKEDITOR.replace</a>( 'editor1', {\n    extraPlugins: 'abbr',\n    allowedContent: 'p abbr'\n});\n</code></pre>\n\n<p>The <code>allowedContent: 'p abbr'</code> rule means that all attributes will be striped out from\nthe <code>&lt;abbr&gt;</code> tag, including <code>title</code> and <code>id</code>. The <strong>Abbreviation</strong> plugin, however, still provides\na dialog window for editing both abbreviations (tag contents) and explanations (<code>title</code>) as\nwell as the <strong>Advanced Settings</strong> tab for setting the <code>id</code>. It turns out that the <strong>Explanation</strong>\nfield and the second tab are no longer necessary since the <code>title</code> and <code>id</code> attributes will\nbe discarded.</p>\n\n<p>With Advanced Content Filter we can specify which dialog window fields and tabs are\nenabled and which are not, depending on filtering rules set in the configuration. This can\nbe done by modifying the Explanation field in the dialog window definition\n(<code>plugins/abbr/dialogs/abbr.js</code>):</p>\n\n<pre><code>elements: [\n    ...\n    {\n        type: 'text',\n        id: 'title',\n        label: 'Explanation',\n        requiredContent: 'abbr[title]', // Title must be allowed to enable this field.\n        ...\n    }\n    ...\n]\n</code></pre>\n\n<p>The dialog window also contains the <strong>Advanced Settings</strong> tab that\ncan be used for setting the <code>id</code> attribute. However, our current configuration\n(<code>allowedContent: 'p abbr'</code>) means: \"only paragraphs and abbreviations are allowed, not\nattributes\". The <strong>Abbreviation</strong> plugin should take this fact into account and disable\nthe <strong>Advanced Settings</strong> tab unless the <code>id</code> attribute is allowed:</p>\n\n<pre><code>contents: [\n    ...\n    {\n        id: 'tab-adv',\n        label: 'Advanced Settings',\n        requiredContent: 'abbr[id]',    // ID must be allowed to enable this field.\n        elements: [\n            ...\n        ]\n    }\n    ...\n]\n</code></pre>\n\n<p>To sum it up, let us see how the <strong>Abbreviation</strong> dialog window changes with different\n<code>config.allowedContent</code> settings:</p>\n\n<table>\n<thead>\n<tr>\n<th style=\"text-align:center;\"><code>allowedContent = 'p abbr'</code> </th>\n<th style=\"text-align:center;\"> <code>allowedContent = 'p abbr[id]'</code> </th>\n<th style=\"text-align:center;\"> <code>allowedContent = 'p abbr[title,id]'</code></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:center;\"><p><img src=\"guides/plugin_sdk_integration_with_acf/acfDialog2.png\" alt=\"\" width=\"300\" height=\"208\"></p> </td>\n<td style=\"text-align:center;\"> <p><img src=\"guides/plugin_sdk_integration_with_acf/acfDialog1.png\" alt=\"\" width=\"300\" height=\"229\"></p> </td>\n<td style=\"text-align:center;\"> <p><img src=\"guides/plugin_sdk_integration_with_acf/acfDialog0.png\" alt=\"\" width=\"300\" height=\"230\"></p></td>\n</tr>\n</tbody>\n</table>\n\n\n<h2 id='plugin_sdk_integration_with_acf-section-integrating-with-acf-for-content-transformations'>Integrating with ACF for Content Transformations</h2>\n\n<p>Advanced Content Filter also introduces\n<a href=\"#!/guide/#!/guide/dev_advanced_content_filter-section-content-transformations\">content transformations</a>\nthat help clean up HTML code and make it consistent. This functionality can be\nused automatically in the <strong>Abbreviation</strong> feature to convert the invalid <code>&lt;acronym&gt;</code>\ntag into an <code>&lt;abbr&gt;</code>. In order to achieve this, we will need to define the\n<a href=\"#!/api/CKEDITOR.feature-property-contentForms\" rel=\"CKEDITOR.feature-property-contentForms\" class=\"docClass\">CKEDITOR.feature.contentForms</a> property that determines which tag\nis correct and accepted by the editor with the highest priority:</p>\n\n<pre><code>new <a href=\"#!/api/CKEDITOR.dialogCommand\" rel=\"CKEDITOR.dialogCommand\" class=\"docClass\">CKEDITOR.dialogCommand</a>( 'abbrDialog', {\n    allowedContent: 'abbr[title,id]',\n    requiredContent: 'abbr',\n    contentForms: [\n        'abbr',\n        'acronym'\n    ]\n} );\n</code></pre>\n\n<p>This configuration causes the following code transformation:</p>\n\n<pre><code>// HTML before\n&lt;p&gt;What is &lt;acronym title=\"Advanced Content Filter\"&gt;ACF&lt;/acronym&gt;?&lt;/p&gt;\n\n// HTML after\n&lt;p&gt;What is &lt;abbr title=\"Advanced Content Filter\"&gt;ACF&lt;/abbr&gt;?&lt;/p&gt;\n</code></pre>\n\n<p>The editor will automatically convert <code>&lt;acronym&gt;</code> tags into <code>&lt;abbr&gt;</code> tags when\npasting content and editing source code.</p>\n\n<p>Read more about <a href=\"#!/api/CKEDITOR.feature-property-contentForms\" rel=\"CKEDITOR.feature-property-contentForms\" class=\"docClass\">contentForms</a> in CKEditor JavaScript API.</p>\n\n<p class=\"tip\">\n    You can also <a href=\"https://github.com/ckeditor/ckeditor-docs-samples/tree/master/tutorial-abbr-acf\">download the\n    entire modified plugin folder</a> inluding the icon and the fully commented source code.\n</p>\n\n\n<h2 id='plugin_sdk_integration_with_acf-section-abbreviation-plugin-demo'>Abbreviation Plugin Demo</h2>\n\n<p>See the <a href=\"../samples/abbr.html\">working \"Abbreviation (Custom Plugin with Dialog, Context Menu and ACF Support)\" sample</a> that shows the final version of the Abbreviation plugin integrated with an editor instance.</p>\n\n<h2 id='plugin_sdk_integration_with_acf-section-further-reading'>Further Reading</h2>\n\n<p>Refer to the following resources for more information about creating CKEditor plugins:</p>\n\n<ul>\n<li><a href=\"#!/guide/plugin_sdk_sample\">Creating a CKEditor Plugin in 20 Lines of Code</a> &ndash; Create your first CKEditor plugin that inserts a piece of HTML code into the document.</li>\n<li><a href=\"#!/guide/plugin_sdk_sample_1\">Simple Plugin, Part 1</a> &ndash; Develop a basic Abbreviation plugin with a dialog window that lets the user insert a an abbreviation element into the document.</li>\n<li><a href=\"#!/guide/plugin_sdk_sample_2\">Simple Plugin, Part 2</a> &ndash; Modify the Abbreviation plugin by adding a custom context menu and abbreviation editing capabilities.</li>\n<li><a href=\"#!/guide/plugin_sdk_styles\">Plugin Stylesheets</a> &ndash; Tips on how to integrate custom plugin stylesheets with CKEditor.</li>\n</ul>\n\n\n<p>Refer to the following resources for more information about content filtering:</p>\n\n<ul>\n<li>The <a href=\"#!/guide/dev_acf\">Content Filtering (ACF)</a> article explains some ACF use cases and the rationale behind this feature.</li>\n<li>The <a href=\"#!/guide/dev_advanced_content_filter\">Advanced Content Filer</a> article contains more in-depth technical details about ACF.</li>\n<li>The <a href=\"#!/guide/dev_allowed_content_rules\">Allowed Content Rules</a> article explains the allowed and disallowed content rules format.</li>\n<li>The <a href=\"#!/guide/dev_disallowed_content\">Disallowed Content</a> article explains how blacklisting works in ACF.</li>\n<li><a href=\"#!/api/CKEDITOR.filter\" rel=\"CKEDITOR.filter\" class=\"docClass\">CKEDITOR.filter</a> contains API documentation for the main class responsible for ACF features.</li>\n<li><a href=\"#!/api/CKEDITOR.feature\" rel=\"CKEDITOR.feature\" class=\"docClass\">CKEDITOR.feature</a> contains API documentation of an interface representing an editor feature used in combination with <a href=\"#!/api/CKEDITOR.filter-method-addFeature\" rel=\"CKEDITOR.filter-method-addFeature\" class=\"docClass\">CKEDITOR.filter.addFeature</a>.</li>\n</ul>\n\n","title":"Integration with ACF","meta_description":"Integrate a plugin with Advanced Content Filter.","meta_keywords":"ckeditor, editor, wysiwyg, plugin, plugins, addon, add-on, abbr, abbreviation, sdk, custom, development, tutorial, example, sample, acf, content, filter, filtering"});