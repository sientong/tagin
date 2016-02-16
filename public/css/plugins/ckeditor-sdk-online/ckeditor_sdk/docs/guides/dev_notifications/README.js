Ext.data.JsonP.dev_notifications({"guide":"<!--\nCopyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.\nFor licensing, see LICENSE.md.\n-->\n\n\n<h1 id='dev_notifications-section-notifications'>Notifications</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/dev_notifications-section-showing-a-notification'>Showing a Notification</a></li>\n<li>\n<a href='#!/guide/dev_notifications-section-notification-interface'>Notification Interface</a></li>\n<li>\n<a href='#!/guide/dev_notifications-section-notification-integration'>Notification Integration</a></li>\n<li>\n<a href='#!/guide/dev_notifications-section-notification-aggregator'>Notification Aggregator</a></li></ol>\n</div>\n\n<p class=\"requirements\">\n    This feature was introduced in <strong>CKEditor 4.5</strong>. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href=\"http://ckeditor.com/download\">Download</a> site and <a href=\"#!/guide/dev_plugins\">need to be added to your custom build</a> with <a href=\"http://ckeditor.com/builder\">CKBuilder</a>.\n</p>\n\n\n<p>The optional <a href=\"http://ckeditor.com/addon/notification\">Notification</a> and <a href=\"http://ckeditor.com/addon/notificationaggregator\">Notification Aggregator</a> plugins introduced in CKEditor 4.5 make it possible to show the user information about the status of selected operations directly in the editor.</p>\n\n<p>The new notification system lets you display all sorts of information in a consistent way because all plugins using the <a href=\"#!/api/CKEDITOR.plugins.notification\" rel=\"CKEDITOR.plugins.notification\" class=\"docClass\">notification API</a> will show information in the same way. This API also allows you to integrate the editor's notifications with your website (your CMS for example). Note that notifications do not work with dialog windows so no dialog should be displayed when the notification is to be shown.</p>\n\n<p>There are <a href=\"#!/api/CKEDITOR.plugins.notification-property-type\" rel=\"CKEDITOR.plugins.notification-property-type\" class=\"docClass\">four types of notifications</a> available:</p>\n\n<ul>\n<li><code>info</code> (default) &ndash; Information for the user (e.g. \"File is uploading.\", \"ACF modified content.\").</li>\n<li><code>warning</code> &ndash; A warning or an error message (e.g. \"This type of file is not supported.\", \"You cannot paste the script.\"),</li>\n<li><code>success</code> &ndash; Information about an operation that finished successfully (e.g. \"File uploaded.\", \"Data imported.\").</li>\n<li><code>progress</code> &ndash; Information about the progress of an operation. When the operation is done, the notification type should be changed to <code>success</code>.</li>\n</ul>\n\n\n<p>The image below shows an example of a success and a progress notification.</p>\n\n<p><p><img src=\"guides/dev_notifications/notification.png\" alt=\"Notifications example\" width=\"656\" height=\"275\"></p></p>\n\n<h2 id='dev_notifications-section-showing-a-notification'>Showing a Notification</h2>\n\n<p>To show a simple notification you need to <a href=\"#!/api/CKEDITOR.plugins.notification-method-constructor\" rel=\"CKEDITOR.plugins.notification-method-constructor\" class=\"docClass\">create a notification</a> instance and call the <a href=\"#!/api/CKEDITOR.plugins.notification-method-show\" rel=\"CKEDITOR.plugins.notification-method-show\" class=\"docClass\">CKEDITOR.plugins.notification.show</a> method or you can use the <a href=\"#!/api/CKEDITOR.editor-method-showNotification\" rel=\"CKEDITOR.editor-method-showNotification\" class=\"docClass\">CKEDITOR.editor.showNotification</a> shortcut:</p>\n\n<pre><code>// The editor needs the \"notification\" plugin.\nvar editor = <a href=\"#!/api/CKEDITOR-method-replace\" rel=\"CKEDITOR-method-replace\" class=\"docClass\">CKEDITOR.replace</a>( 'editor1', {\n    extraPlugins: 'notification'\n} );\n\neditor.once( 'instanceReady', function() {\n    // Create and show the notification.\n    var notification1 = new <a href=\"#!/api/CKEDITOR.plugins.notification\" rel=\"CKEDITOR.plugins.notification\" class=\"docClass\">CKEDITOR.plugins.notification</a>( editor, {\n        message: 'Error occurred',\n        type: 'warning'\n    } );\n    notification1.show();\n\n    // Use shortcut - it has the same result as above.\n    var notification2 = editor.showNotification( 'Error occurred', 'warning' );\n} );\n</code></pre>\n\n<p>Note that the <a href=\"#!/api/CKEDITOR.editor-method-showNotification\" rel=\"CKEDITOR.editor-method-showNotification\" class=\"docClass\">CKEDITOR.editor.showNotification</a> method is available even without the Notification plugin. In such case an alert will be shown instead of the notification.</p>\n\n<p>Once you create a notification you can update its state and even change its type:</p>\n\n<pre><code>var notification = editor.showNotification( 'Uploading...', 'progress', 0.25 );\n\n// ...\n\nnotification.update( { progress: 0.75 } );\n\n// ...\n\nnotification.update( { type: 'success', message: 'File uploaded.' } );\n</code></pre>\n\n<p>Note that a developer may implement the notification interface in a custom way, for example to show the notification with a slide-in animation. In such case updating one notification is not the same as hiding one and showing another. One notification should show the status of one process, so it is better to update it to the <code>success</code> type instead of creating a new one every time the status changes.</p>\n\n<p>To learn more about the notification API, check the <a href=\"#!/api/CKEDITOR.plugins.notification\" rel=\"CKEDITOR.plugins.notification\" class=\"docClass\">CKEDITOR.plugins.notification</a> documentation.</p>\n\n<h2 id='dev_notifications-section-notification-interface'>Notification Interface</h2>\n\n<p>By default notifications are displayed at the top center of the editable area. However, they try to be visible as long as possible without leaving the editable area. It means that notifications will move if a part of the editable will be out of the viewport, so you can edit a very long document and the notification will still be visible. The notifications also move below the toolbar if you are using the <a href=\"#!/guide/dev_uitypes-section-floating-user-interface\">floating user interface</a>, but they will not be visible at all if the editor is not visible at all.</p>\n\n<p><p><img src=\"guides/dev_notifications/notification_stick.png\" alt=\"Notifications stick to the viewport border to be visible as long as possible\" width=\"654\" height=\"304\"></p></p>\n\n<p>Notifications can also hide after a timeout.</p>\n\n<ul>\n<li>By default, <code>info</code> and <code>success</code> notifications hide after 5 seconds &mdash; this can be changed using the <a href=\"#!/api/CKEDITOR.config-cfg-notification_duration\" rel=\"CKEDITOR.config-cfg-notification_duration\" class=\"docClass\">CKEDITOR.config.notification_duration</a> option. The notification duration can also be changed on an instance basis.</li>\n<li>The <code>warning</code> notifications need to be hidden manually.</li>\n<li>The <code>progress</code> notifications are also not hidden automatically. They wait for the next progress update and to be finally changed to <code>success</code> or <code>warning</code>.</li>\n</ul>\n\n\n<p>The user can always hide notifications manually by using the <code>X</code> button or the <kbd>Esc</kbd> key.</p>\n\n<p>If you want to make sure that a notification will be shown after an update, that update needs to be marked as\n<a href=\"#!/api/CKEDITOR.plugins.notification-method-update\" rel=\"CKEDITOR.plugins.notification-method-update\" class=\"docClass\">important</a>. This matters also with regard to accessibility &mdash; important updates will be read by screen readers while the rest of the updates will not, because we do not want to spam the user with tons of messages if a notification is updated very often.</p>\n\n<h2 id='dev_notifications-section-notification-integration'>Notification Integration</h2>\n\n<p>If you want to replace the standard notification interface with a custom one or you want to integrate editor notifications with your website or CMS, you can do it by listening to notification events: <a href=\"#!/api/CKEDITOR.editor-event-notificationShow\" rel=\"CKEDITOR.editor-event-notificationShow\" class=\"docClass\">notificationShow</a>, <a href=\"#!/api/CKEDITOR.editor-event-notificationUpdate\" rel=\"CKEDITOR.editor-event-notificationUpdate\" class=\"docClass\">notificationUpdate</a> and <a href=\"#!/api/CKEDITOR.editor-event-notificationHide\" rel=\"CKEDITOR.editor-event-notificationHide\" class=\"docClass\">notificationHide</a>.</p>\n\n<p>To prevent notifications from being shown it is not enough to prevent <a href=\"#!/api/CKEDITOR.editor-event-notificationShow\" rel=\"CKEDITOR.editor-event-notificationShow\" class=\"docClass\">CKEDITOR.editor.notificationShow</a>, but you need to cancel <a href=\"#!/api/CKEDITOR.editor-event-notificationUpdate\" rel=\"CKEDITOR.editor-event-notificationUpdate\" class=\"docClass\">CKEDITOR.editor.notificationUpdate</a> too, otherwise important updates will display the notification.</p>\n\n<pre><code>editor.on( 'notificationShow', function( evt ) {\n    alert( evt.data.notification.message );\n\n    // Do not show the default notification.\n    evt.cancel();\n} );\n\neditor.on( 'notificationUpdate', function( evt ) {\n    // Do not show the notification even if the update was important.\n    evt.cancel();\n} );\n</code></pre>\n\n<p>Note that if you cancel the <a href=\"#!/api/CKEDITOR.editor-event-notificationUpdate\" rel=\"CKEDITOR.editor-event-notificationUpdate\" class=\"docClass\">CKEDITOR.editor.notificationUpdate</a> event, it only means that the notification will not be shown even if the update was important. The notification object will be updated anyway, including the <a href=\"#!/api/CKEDITOR.plugins.notification-property-element\" rel=\"CKEDITOR.plugins.notification-property-element\" class=\"docClass\">CKEDITOR.plugins.notification.element</a> property, so you do not need to do it manually. The event is fired before updating the notification object, so it is possible to compare old and new values:</p>\n\n<pre><code>editor.on( 'notificationUpdate', function( evt ) {\n    if( evt.data.options &amp;&amp; evt.data.options.message != evt.data.notification.message ) {\n        alert( 'Message changed!');\n    }\n} );\n</code></pre>\n\n<p>If you cancel the <a href=\"#!/api/CKEDITOR.editor-event-notificationHide\" rel=\"CKEDITOR.editor-event-notificationHide\" class=\"docClass\">CKEDITOR.editor.notificationHide</a> event, the notification will not be hidden. In this case it will not matter whether the defined notification duration passed or the user pressed the <code>X</code> button or <kbd>Esc</kbd>.</p>\n\n<h2 id='dev_notifications-section-notification-aggregator'>Notification Aggregator</h2>\n\n<p>If you want to show one notification aggregating many small tasks, you can use the <a href=\"#!/api/CKEDITOR.plugins.notificationAggregator\" rel=\"CKEDITOR.plugins.notificationAggregator\" class=\"docClass\">notification aggregator</a>.</p>\n\n<p><p><img src=\"guides/dev_notifications/notification_aggregator.png\" alt=\"Notifications aggregator example\" width=\"657\" height=\"277\"></p></p>\n\n<pre><code>// The editor needs the \"notificationaggregator\" plugin.\nvar editor = <a href=\"#!/api/CKEDITOR-method-replace\" rel=\"CKEDITOR-method-replace\" class=\"docClass\">CKEDITOR.replace</a>( 'editor1', {\n    extraPlugins: 'notificationaggregator'\n} );\n\neditor.once( 'instanceReady', function() {\n    // Create a notification aggregator with the description template.\n    var aggregator = new <a href=\"#!/api/CKEDITOR.plugins.notificationAggregator\" rel=\"CKEDITOR.plugins.notificationAggregator\" class=\"docClass\">CKEDITOR.plugins.notificationAggregator</a>( editor, 'Uploading {current} of {max}... {percentage}%' );\n\n    // Create two tasks with different weights and add them to the aggregator.\n    var task1 = aggregator.createTask( { weight: 60 } ),\n        task2 = aggregator.createTask( { weight: 40 } );\n\n    // Finish the first task (100% done of the first task and 60% (=60/(60+40)) of the total).\n    task1.done();\n\n    // Update the second task (25% (10/40) done of the second task and 70% (=(60+10)/(60+40)) of the total).\n    task2.update( 10 );\n} );\n</code></pre>\n\n<p>It is also possible to create a separate template for a single item message, so that it would not look strange if the aggregator was handling only one task (for example: <em>Loading file.</em> instead of <em>Loading files 1 of 1.</em>).</p>\n\n<p>To learn more about the notification aggregator check <a href=\"#!/api/CKEDITOR.plugins.notificationAggregator\" rel=\"CKEDITOR.plugins.notificationAggregator\" class=\"docClass\">CKEDITOR.plugins.notificationAggregator</a> and <a href=\"#!/api/CKEDITOR.plugins.notificationAggregator.task\" rel=\"CKEDITOR.plugins.notificationAggregator.task\" class=\"docClass\">CKEDITOR.plugins.notificationAggregator.task</a>.</p>\n","title":"Notifications","meta_description":"Using editor notifications to show status information.","meta_keywords":"ckeditor, editor, wysiwyg, notification, notifications, aggregator, alert, status, information, warning, success, progress"});