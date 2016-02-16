<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Page Navigation Using the "Tab" Key

To ease page navigation by using keyboard and further boost accessibility, CKEditor can be reached by using the <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> shortcuts that are commonly used for navigating between page elements.

This is a default behavior that works for both classic and inline editors. For [classic](#!/guide/dev_framed), `iframe`-based editors, you will simply enter the editing area. For [inline](#!/guide/dev_inline) editors, the toolbar will appear for each editable element that you navigate to and editing it will become enabled.

## Influencing Tab Index

You can customize the place that CKEditor will take in the <kbd>Tab</kbd> order of a web page that it is embedded in. Use the CKEDITOR.config.tabIndex option to assign a custom `tabindex` value to a CKEditor instance. For example:

    config.tabIndex = 3;

This will cause CKEditor to become the third page element that you will enter when using the <kbd>Tab</kbd> key, no matter what its position could be in the page source.

<p class="tip">
    Please note that this configuration setting is an equivalent of adding the standard <code>tabindex</code> attribute to the element that is being replaced with CKEditor.
</p>

## "Tab" Key Based Navigation Demo

See the [working "Page Navigation Using the "Tab" Key" sample](../samples/tabindex.html) where you can try this page navigation method in practice.

## Related Features

Refer to the following resources for more information about accessibility in CKEditor:

* The [Accessibility Support in CKEditor](#!/guide/dev_a11y) article explains CKEditor compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The [Keyboard Shortcuts](#!/guide/dev_shortcuts) article lists all keyboard shortcuts supported in CKEditor.