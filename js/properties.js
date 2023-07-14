// JavaScript
define( [], function () {
	'use strict';

	// ****************************************************************************************
	// Other Settings
	// ****************************************************************************************

	var ShowMode = {
		type: "string",
		label: "Event to display the popup on",
		component: "dropdown",
		ref: "props.ShowMode",
		defaultValue: 'c',
		options: [{
			value: "c",
			label: "On Click"
		},
		{
			value: "h",
			label: "On Mouseover"
		},
		{
			value: "n",
			label: "None"
		}]
	};
	var ShowImage = {
		type: "boolean",
		component: "switch",
		label: "Show Images",
		ref: "props.ShowImage",
		defaultValue: true,
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
	};
	var OnlyUrl = {
		type: "boolean",
		component: "switch",
		label: "The data contains only image url",
		ref: "props.OnlyUrl",
		defaultValue: true,
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
	};
	var IniTag = {
		type: "string",
		label: "Initial tag to search for",
		ref: "props.IniTag",
		defaultValue: '&lt;img',
		show: function (data) {
			return !data.props.OnlyUrl;
	   }
	};
	var EndTag = {
		type: "string",
		label: "Final tag to search for",
		ref: "props.EndTag",
		defaultValue: '&gt;',
		show: function (data) {
			return !data.props.OnlyUrl;
	   }
	};
	var ImageFields = {
		type: "string",
		label: "Comma Separated Image Fields names",
		ref: "props.ImageFields",
		defaultValue: 'Image'
	};
	var HeaderColor = {
		type: "string",
		label: "Header Color",
		ref: "props.HeaderColor",
		defaultValue: 'silver'
	};
	


	// ****************************************************************************************
	// ImageExt Definition
	// ****************************************************************************************

	// Appearance Panel
	var ImageExt = {
		uses: "settings",
		items: {
			settings: {
				type: "items",
				label: "Settings",
				items: {
					ShowImage: ShowImage,
					OnlyUrl: OnlyUrl,
					IniTag: IniTag,
					EndTag: EndTag,
					ShowMode: ShowMode,
					ImageFields: ImageFields,
					HeaderColor: HeaderColor,
				}
			},
		
			
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			ImageExt: ImageExt
		}
	};

} );
