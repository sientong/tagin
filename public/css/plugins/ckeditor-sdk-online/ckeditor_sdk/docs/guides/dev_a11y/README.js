Ext.data.JsonP.dev_a11y({"guide":"<!--\nCopyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.\nFor licensing, see LICENSE.md.\n-->\n\n\n<h1 id='dev_a11y-section-accessibility-support-in-ckeditor'>Accessibility Support in CKEditor</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/dev_a11y-section-background'>Background</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-supported-platforms'>Supported Platforms</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-assisting-users-with-special-needs'>Assisting Users with Special Needs</a><ol>\n<li>\n<a href='#!/guide/dev_a11y-section-visual-impairment'>Visual Impairment</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-mobility-impairment'>Mobility Impairment</a></li>\n</ol>\n<li>\n<a href='#!/guide/dev_a11y-section-accessibility-features-overview'>Accessibility Features Overview</a><ol>\n<li>\n<a href='#!/guide/dev_a11y-section-keyboard-access'>Keyboard Access</a><ol>\n<li>\n<a href='#!/guide/dev_a11y-section-reaching-the-editor-on-the-page'>Reaching the Editor on the Page</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-keyboard-navigation'>Keyboard Navigation</a></li>\n</ol>\n<li>\n<a href='#!/guide/dev_a11y-section-assistive-technology-support'>Assistive Technology Support</a><ol>\n<li>\n<a href='#!/guide/dev_a11y-section-announcing-the-editor-on-the-page'>Announcing the Editor on the Page</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-wai-aria-support-in-editor-interface'>WAI-ARIA Support in Editor Interface</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-accessibility-instructions-dialog-window'>Accessibility Instructions Dialog Window</a></li>\n</ol>\n<li>\n<a href='#!/guide/dev_a11y-section-visual-aids'>Visual Aids</a><ol>\n<li>\n<a href='#!/guide/dev_a11y-section-high-contrast-mode'>High Contrast Mode</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-textual-labels-for-color-information'>Textual Labels for Color Information</a></li>\n</ol>\n<li>\n<a href='#!/guide/dev_a11y-section-creating-accessible-content'>Creating Accessible Content</a><ol>\n<li>\n<a href='#!/guide/dev_a11y-section-setting-language-of-parts-for-editor-content'>Setting Language of Parts for Editor Content</a></li>\n</ol>\n<li>\n</li>\n</ol>\n<li>\n<a href='#!/guide/dev_a11y-section-accessibility-features-demo'>Accessibility Features Demo</a></li>\n<li>\n<a href='#!/guide/dev_a11y-section-related-features'>Related Features</a></li></ol>\n</div>\n\n<p>Accessibility support is a priority issue in CKEditor. CKEditor complies with most important industry standards, recommendations and checklists, including:</p>\n\n<ul>\n<li><a href=\"http://www.state.gov/m/irm/impact/c32157.htm\">Section 508 Amendment to the Rehabilitation Act of 1973</a></li>\n<li><a href=\"http://www.w3.org/WAI/intro/wcag.php\">Web Content Accessibility Guidelines (WCAG 2.0)</a></li>\n<li><a href=\"http://www-03.ibm.com/able/guidelines/web/accessweb.html\">IBM Web Accessibility Checklist</a></li>\n<li><a href=\"http://www.w3.org/WAI/intro/aria.php\">WAI-ARIA</a></li>\n</ul>\n\n\n<p>It also includes a number of features that make it easy to use with assistive technologies, such as intuitive keyboard navigation or WAI-ARIA based user interface. Scroll to the <a href=\"#!/guide/dev_a11y-section-accessibility-features-overview\">Accessibility Features Overview</a> section for a short summary.</p>\n\n<h2 id='dev_a11y-section-background'>Background</h2>\n\n<p>Accessibility support in CKEditor goes back to early CKEditor 3.x releases; its most important foundation was work done in strict cooperation with IBM accessibility experts already in 2010, for <a href=\"http://ckeditor.com/blog/CKEditor-3.2-released\">CKEditor 3.2</a>. Our unique approach has always focused on providing accessible solutions that not only satisfy the requirements defined in the standards but also are <a href=\"http://ckeditor.com/blog/CKEditor-WAI-ARIA-Usable-Accessibility\">usable in practical terms</a>. We also strive to evoke accessibility-friendly approach in our customers by stressing out that <a href=\"http://ckeditor.com/blog/Commercial-Benefits-of-Accessibility\">good accessibility support increases business opportunities</a> and has lots of commercial benefits.</p>\n\n<h2 id='dev_a11y-section-supported-platforms'>Supported Platforms</h2>\n\n<p>In our accessibility testing we use the <strong>latest Firefox</strong> version with <strong>latest JAWS</strong> version as our reference environment and officially supported platform. This is because we have found this combination to be most reliable and standards-compliant.</p>\n\n<p>This does not mean, however, that CKEditor has any issues with other modern, standards-compliant browsers (including latest Internet Explorer versions) and alternative screen reader solutions like VoiceOver, NonVisual Desktop Access (NVDA) or ChromeVox. On the contrary: we assume that since we test in the most standards-compliant solution, other standards-compliant environments should also work correctly.</p>\n\n<p>In any case, if you encounter any accessibility-related issue while using CKEditor, please let us know by <a href=\"#!/guide/dev_issues_tracker\">creating a ticket</a> on our <a href=\"http://dev.ckeditor.com/\">Issues Tracker</a>, setting the <strong>Component</strong> field to <strong>Accessibility</strong>. We treat all accessibility issues with utmost attention and will be happy to solve them and further improve CKEditor compliance.</p>\n\n<h2 id='dev_a11y-section-assisting-users-with-special-needs'>Assisting Users with Special Needs</h2>\n\n<p>CKEditor compliance with numerous accessibility standards means that it can cater to the needs of users with disabilities.</p>\n\n<p>The following features will make it possible for people with special needs to use CKEditor:</p>\n\n<h3 id='dev_a11y-section-visual-impairment'>Visual Impairment</h3>\n\n<ul>\n<li>WAI-ARIA based UI with screen reader support.</li>\n<li>Full keyboard support for all editor features.</li>\n<li>High contrast rendering.</li>\n<li>All information conveyed with color is also available without color (e.g. through textual labels).</li>\n</ul>\n\n\n<h3 id='dev_a11y-section-mobility-impairment'>Mobility Impairment</h3>\n\n<ul>\n<li>Full keyboard support for all editor features.</li>\n</ul>\n\n\n<h2 id='dev_a11y-section-accessibility-features-overview'>Accessibility Features Overview</h2>\n\n<p>The following section describes some of the most important accessibility-related features that are available in CKEditor. You can try them out on the <a href=\"../samples/accessibility.html\">working \"Accessibility Support and Keyboard Shortcuts\" sample</a> or any other applicable demos listed below.</p>\n\n<h3 id='dev_a11y-section-keyboard-access'>Keyboard Access</h3>\n\n<p>The following features make working with CKEditor through standard keyboard easy.</p>\n\n<h4 id='dev_a11y-section-reaching-the-editor-on-the-page'>Reaching the Editor on the Page</h4>\n\n<p>CKEditor takes part in the <kbd>Tab</kbd> order of a web page that it is embedded in. It can be reached and exited by using the <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> keyboard shortcuts that are commonly used for navigating between page elements. Read more <a href=\"#!/guide/dev_tabindex\">here</a> and see the <a href=\"../samples/tabindex.html\">working demo</a> here.</p>\n\n<h4 id='dev_a11y-section-keyboard-navigation'>Keyboard Navigation</h4>\n\n<p>Once the editor is in focus (i.e. it is an active element for the user), its entire interface can be used through the keyboard. To do so, some basic key combinations can be employed. For example:</p>\n\n<ul>\n<li><kbd>Alt+F10</kbd> &ndash; Moves the focus to the toolbar. <kbd>Enter</kbd> (or <kbd>Space</kbd>) selects an option, <kbd>Esc</kbd> returns to the editing area.</li>\n<li><kbd>Alt+F11</kbd> &ndash; Moves the focus to the elements path. <kbd>Enter</kbd> and <kbd>Esc</kbd> can be used here as well.</li>\n<li><kbd>Tab</kbd>, <kbd>Shift+Tab</kbd> and <kbd>Arrow</kbd> keys &ndash; Move through toolbar groups and buttons as well as context menu options and dialog window elements.</li>\n</ul>\n\n\n<p>There are plenty other keyboard shortcuts that can be utilized. For most editor functions we have chosen the key combinations that the user will naturally use. Everything else is clarified in the <a href=\"#!/guide/dev_shortcuts\">documentation</a> as well as the <strong>Accessibility Instructions</strong> dialog window (<kbd>Alt+0</kbd>). You can also try out the <a href=\"../samples/accessibility.html\">working demo</a>. The editor usage through the keyboard is most intuitive and as straightforward as possible.</p>\n\n<h3 id='dev_a11y-section-assistive-technology-support'>Assistive Technology Support</h3>\n\n<p>The following features support using CKEditor with assistive technologies such as screen readers.</p>\n\n<h4 id='dev_a11y-section-announcing-the-editor-on-the-page'>Announcing the Editor on the Page</h4>\n\n<p>When the user reaches an editor instance, the screen reader announces it with the following text:</p>\n\n<pre><code>Rich text editor, editor1, press Alt+0 for help.\n</code></pre>\n\n<p>The <code>editor1</code> part of the text is simply the <a href=\"#!/api/CKEDITOR.config-cfg-title\">name that has been assigned to the editor instance</a> by the developer. This is even more useful when you have more than one editor instance on the same page. The website creator should make sure that editor instance names are meaningful, though, to make it really useful for the users.</p>\n\n<h4 id='dev_a11y-section-wai-aria-support-in-editor-interface'>WAI-ARIA Support in Editor Interface</h4>\n\n<p>The entire CKEditor user interface is ARIA-supported. As explained on <a href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets#ARIA\">Mozilla Developer Network</a>:</p>\n\n<blockquote>\n    <a href=\"http://www.w3.org/WAI/intro/aria.php\">WAI-ARIA</a>, the Accessible Rich Internet Applications specification from the W3C's Web Accessibility Initiative, provides a way to add the missing semantics needed by assistive technologies such as screen readers. ARIA enables developers to describe their widgets in more detail by adding special attributes to the markup. Designed to fill the gap between standard HTML tags and the desktop-style controls found in dynamic web applications, ARIA provides roles and states that describe the behaviour of most familiar UI widgets.\n</blockquote>\n\n\n<p>In CKEditor this includes the toolbar and bottom bar, panels and drop-down lists, context menus and dialog windows. Thanks to this feature the editor can be used with screen readers and other assistive technologies.</p>\n\n<h4 id='dev_a11y-section-accessibility-instructions-dialog-window'>Accessibility Instructions Dialog Window</h4>\n\n<p>Instead of bothering the user and forcing to hear lots of instructions every time an editor instance is reached, in CKEditor we simply remind the keyboard shortcut required to get help. When a user presses the <kbd>Alt+0</kbd> keyboard shortcut, the <strong>Accessibility Instructions</strong> dialog window is opened. It contains some detailed information about the accessibility features of CKEditor, including all keyboard shortcuts needed to navigate the editor and use its features.</p>\n\n<p><p><img src=\"guides/dev_a11y/a11y_01.png\" alt=\"Accessibility Instructions dialog window\" width=\"632\" height=\"507\"></p></p>\n\n<p>Thanks to this feature users do not need to be trained or pointed to documentation to understand how to use the editor, as the help is there whenever they need it.</p>\n\n<h3 id='dev_a11y-section-visual-aids'>Visual Aids</h3>\n\n<p>The following features make working with CKEditor easier for people with visual impairment.</p>\n\n<h4 id='dev_a11y-section-high-contrast-mode'>High Contrast Mode</h4>\n\n<p>One less commonly considered accessibility feature is the compatibility with the operating system High Contrast Mode. As the name suggests, this is an operating system feature. In Windows it can be enabled through the accessibility options available in the Control Panel. It can also be turned on by using the <kbd>Alt+Left Shift+PrntScr</kbd> keyboard shortcut.</p>\n\n<p>In High Contrast Mode all images and colors are discarded. A predominant color pair is then used to display the entire operating system interface (usually white or yellow on black, or vice versa).</p>\n\n<p>The image below shows a standard CKEditor instance loaded in Windows 8 High Contrast Mode in Firefox.</p>\n\n<p><p><img src=\"guides/dev_a11y/a11y_02.png\" alt=\"CKEditor in High Contrast Mode loaded in Firefox\" width=\"707\" height=\"486\"></p></p>\n\n<p>Note that not all browsers support High Contrast Mode. Some of them may simply show web pages in full color despite the operating system settings.</p>\n\n<h4 id='dev_a11y-section-textual-labels-for-color-information'>Textual Labels for Color Information</h4>\n\n<p>Color blind users may have trouble accessing information that is conveyed with color. In CKEditor all information conveyed with color (including the color selector) is also available without color (e.g. through textual labels).</p>\n\n<h3 id='dev_a11y-section-creating-accessible-content'>Creating Accessible Content</h3>\n\n<p>The following features can be used by developers to ensure that content created with CKEditor is accessible.</p>\n\n<h4 id='dev_a11y-section-setting-language-of-parts-for-editor-content'>Setting Language of Parts for Editor Content</h4>\n\n<p>The optional Language plugin, introduced in CKEditor 4.3, implements the <a href=\"http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-other-lang-id.html\">WCAG 3.1.2 Language of Parts</a> specification. It lets you assign one of the pre-configured languages to a text selection. See the <a href=\"../samples/language.html\">working demo</a> and get the plugin <a href=\"http://ckeditor.com/addon/language\">here</a>.</p>\n\n<h2 id='dev_a11y-section-accessibility-features-demo'>Accessibility Features Demo</h2>\n\n<p>See the <a href=\"../samples/accessibility.html\">working \"Accessibility Support and Keyboard Shortcuts\" sample</a> that showcases the usage of some accessibility-related features.</p>\n\n<h2 id='dev_a11y-section-related-features'>Related Features</h2>\n\n<p>Refer to the following resources for more information about accessibility in CKEditor:</p>\n\n<ul>\n<li>The <a href=\"#!/guide/dev_shortcuts\">Keyboard Shortcuts</a> article lists all keyboard shortcuts supported in CKEditor.</li>\n<li>The <a href=\"#!/guide/dev_tabindex\">Page Navigation Using the \"Tab\" Key</a> article discusses how CKEditor participates in the page <kbd>Tab</kbd> order.</li>\n</ul>\n\n","title":"Accessibility Support","meta_description":"Accessibility compliance and overview of accessibility-related features.","meta_keywords":"ckeditor, editor, wysiwyg, compatibility, accessibility, a11y, usability, wcag, atag, wai, aria, wai-aria, 508, disability, disabled, high, contrast, browser, support, screenreader, screen, reader, voiceover, chromevox, jaws"});