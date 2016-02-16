Ext.data.JsonP.CKEDITOR_plugins_indent({"tagname":"class","name":"CKEDITOR.plugins.indent","autodetected":{},"files":[{"filename":"plugin.js","href":"plugin48.html#CKEDITOR-plugins-indent"}],"singleton":true,"members":[{"name":"registerCommands","tagname":"method","owner":"CKEDITOR.plugins.indent","id":"method-registerCommands","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-CKEDITOR.plugins.indent","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/plugin48.html#CKEDITOR-plugins-indent' target='_blank'>plugin.js</a></div></pre><div class='doc-contents'><p>Global command class definitions and global helpers.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-registerCommands' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='CKEDITOR.plugins.indent'>CKEDITOR.plugins.indent</span><br/><a href='source/plugin48.html#CKEDITOR-plugins-indent-method-registerCommands' target='_blank' class='view-source'>view source</a></div><a href='#!/api/CKEDITOR.plugins.indent-method-registerCommands' class='name expandable'>registerCommands</a>( <span class='pre'>editor, commands</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Registers content-specific commands as a part of the indentation system\ndirected by generic commands. ...</div><div class='long'><p>Registers content-specific commands as a part of the indentation system\ndirected by generic commands. Once a command is registered,\nit listens for events of a related generic command.</p>\n\n<pre><code><a href=\"#!/api/CKEDITOR.plugins.indent-method-registerCommands\" rel=\"CKEDITOR.plugins.indent-method-registerCommands\" class=\"docClass\">CKEDITOR.plugins.indent.registerCommands</a>( editor, {\n    'indentlist': new indentListCommand( editor, 'indentlist' ),\n    'outdentlist': new indentListCommand( editor, 'outdentlist' )\n} );\n</code></pre>\n\n<p>Content-specific commands listen for the generic command's <code>exec</code> and\ntry to execute their own jobs, one after another. If some execution is\nsuccessful, <code>evt.data.done</code> is set so no more jobs (commands) are involved.</p>\n\n<p>Content-specific commands also listen for the generic command's <code>refresh</code>\nand fill the <code>evt.data.states</code> object with states of jobs. A generic command\nuses this data to determine its own state and to update the UI.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editor</span> : <a href=\"#!/api/CKEDITOR.editor\" rel=\"CKEDITOR.editor\" class=\"docClass\">CKEDITOR.editor</a><div class='sub-desc'><p>The editor instance this command is\napplied to.</p>\n</div></li><li><span class='pre'>commands</span> : Object<div class='sub-desc'><p>An object of <a href=\"#!/api/CKEDITOR.command\" rel=\"CKEDITOR.command\" class=\"docClass\">CKEDITOR.command</a>.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});