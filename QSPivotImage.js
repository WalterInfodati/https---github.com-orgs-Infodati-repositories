define( ["qlik", 
		"jquery", 
		"text!./template.html",	
        'text!./css/scoped-bootstrap.css',
        './js/extensionUtils',
        './js/micromodal.min',
        './js/properties',
        './js/iniProperties',
        'text!./css/micromodal.css',
        'text!./partials/modal.html'],
	function ( qlik, $, template, bootstrapCss, extensionUtils, microModal, props, iniProps, microModalCss, modalHtml) {
		'use strict';
		//extensionUtils.addStyleToHeader(cssContent);
		extensionUtils.addStyleToHeader(bootstrapCss);
		extensionUtils.addStyleToHeader(microModalCss);
		$('body').append(modalHtml);
		return {
			definition: props,
        	initialProperties: iniProps,
			template: template,
			bootstrapCss: bootstrapCss,
			microModal: microModal,
			microModalCss: microModalCss,
			support: {
				snapshot: true,
				export: true,
				exportData: false
			},
			paint: function () {
				return qlik.Promise.resolve();
			},
			controller: ['$scope', function ( $scope ) {
				//add your rendering code here
				$scope.html = "";
				$( document ).ready(function() {
					if($scope.layout.props != undefined){
						if($scope.layout.props.HeaderColor != undefined){
							$('.modal__header').css('background-color', $scope.layout.props.HeaderColor);
						}
						if($scope.layout.props.ShowImage == undefined){
							$scope.layout.props.ShowImage = true;
						}
						if($scope.layout.props.ShowMode == undefined){
							$scope.layout.props.ShowMode = 'c';
						}
						if($scope.layout.props.IniTag == undefined && $scope.layout.props.OnlyUrl){
							$scope.layout.props.IniTag = '&lt;img';
						}
						if($scope.layout.props.EndTag == undefined && $scope.layout.props.OnlyUrl){
							$scope.layout.props.EndTag = '&gt;';
						}
						if($scope.layout.props.ImageFields == undefined){
							$scope.layout.props.ImageFields = 'Image';
						}
						console.log('ShowMode: ' + $scope.layout.props.ShowMode);
						console.log('IniTag: ' + $scope.layout.props.IniTag);
						console.log('EndTag: ' + $scope.layout.props.EndTag);
						console.log('ShowImage: ' + $scope.layout.props.ShowImage);
						console.log('OnlyUrl: ' + $scope.layout.props.OnlyUrl);
						console.log('ImageFields: ' + $scope.layout.props.ImageFields);
						console.log('HeaderColor: ' + $scope.layout.props.HeaderColor);
						if($scope.layout.props.ShowImage === true){
							console.log('Starting to show images');
							app = qlik.currApp(this);
							var fields = $scope.layout.props.ImageFields.split(',');
							for(var i=0;i<fields.length;i++){
							var field = app.field(fields[i]);
								field.selectAll();
								field.lock();
							}

							//Inizializzo le immagini nella pivot						
							showImages();
							if($scope.layout.props.ShowMode == 'h'){
								console.log('Image popup visualization is active on mousehover');
							}else if($scope.layout.props.ShowMode == 'c'){
								console.log('Image popup visualization is active on click');
							}else{
								console.log('Image popup visualization is disabled');
							}
							//Seleziono solo la struttura della tabella Pivot
							const holder = $('article.qv-object-pivot-table, table.ng-scope');
							// Create an observer instance linked to the callback function
							var observer = new MutationObserver(function(mutationsList, observer) {
								//console.log('mutationsList.length: ' + mutationsList.length);
								$(mutationsList).each(function(index, item){
									//console.log(item.type);
									if (item.type === 'childList'){
										if(item.target.localName == 'span'){
											showImages();									
										}
									}
								});
							});

							// Start observing the target node for configured mutations
							observer.observe(holder[0], { 
								attributes: true, 
								childList: true, 
								subtree: true 
							});
						}else{
							console.log('Image visualization is disabled');
						}
					}
					
					console.log( "ready!" );
				});
				
				$scope.$watch('layout.props', function(newValue, oldValue, scope) {
					
				}, true);
				
				function showImages(){
					//console.log('ShowImages: ' + $scope.layout.props.ShowImage);
					
					if($scope.layout.props.ShowImage){
						
						//var imgs = $('span.ng-binding');
						var imgs = $('article.qv-object-pivot-table span.ng-binding');
					  	//console.log('Trovati ' + imgs.length + ' elementi');
					  	
					  	imgs.each(function(index){
							//console.log(this.innerHTML);
							if($scope.layout.props.OnlyUrl){
								if(this.innerHTML.indexOf("http://") == 0 || this.innerHTML.indexOf("https://") == 0){
									imgNum ++;
									var innHtmlImg = '<img rel="popover" id="img-' + imgNum + '" class="img-pivot" src="' + this.innerHTML + '">';
									this.innerHTML = innHtmlImg;

									var img = $('#img-' + imgNum);
									//var modal = document.getElementById('modal-content')
									if($scope.layout.props.ShowMode == 'h'){
										img.on('mouseover', function(){ showImage(this.id);});
										//console.log('Image Popup visualization is active on mouseover');
									}else if($scope.layout.props.ShowMode == 'c'){
										img.click(function(event){showImage(this.id);});
										//console.log('Image Popup visualization is active on click');
									}else{
										console.log('Image Popup visualization is NOT active');
									}
								}
							}else{
								if(this.innerHTML.indexOf($scope.layout.props.IniTag) == 0){
									imgNum ++;
									//<a href="#" data-toggle="popover" title="Popover Header" data-html="true" data-content="<img src='http://localhost:15249/img1.jpg' width='200' />">Toggle popover</a>
									var startSrc = this.innerHTML.indexOf('src="');
									if(startSrc != -1){
										var src = this.innerHTML.substr(startSrc+5);
										//console.log(tmp);
										var endStr = src.indexOf('"');
										if(endStr != -1){
											src = src.substr(0, endStr);
										}
										//console.log(src);
									}
									var innHtmlImg = this.innerHTML.replace($scope.layout.props.IniTag, '<img rel="popover" id="img-' + imgNum + '" class="img-pivot"').replace($scope.layout.props.EndTag, '>');
									this.innerHTML = innHtmlImg;

									var img = $('#img-' + imgNum);
									//var modal = document.getElementById('modal-content')
									if($scope.layout.props.ShowMode == 'h'){
										img.on('mouseover', function(){ showImage(this.id);});
										//console.log('Image Popup visualization is active on mouseover');
									}else if($scope.layout.props.ShowMode == 'c'){
										img.click(function(event){showImage(this.id); });
										//console.log('Popup is active on click');
									}else{
										console.log('Popup is NOT active');
									}
								}
							}
						  });
				  }else{
						console.log('Image visualization is disabled!');
				  }
				}
				function showImage(id){
					//console.log('showImage ' + id);
					$('#modal-image').css('display', 'block');
					$('#modal-close').off();
					$('#modal-close').on('click', function(){ hideImage();});
					$('#modal-image').on('click', function(){ hideImage();});
					$('#micromodal-content').html('');
					var el = $('#' + id).clone();
					el.addClass('img-popup').removeClass('img-pivot');
					$('#micromodal-content').append(el);					
					imgId = id;
				}
				
				function hideImage(){
					//console.log('hideImage->El Id: ' + imgId);
					$('#modal-image').css('display', 'none');
					if($scope.layout.props.ShowMode == 'c'){
						app = qlik.currApp(this);
						var fields = $scope.layout.props.ImageFields.split(',');
						for(var i=0;i<fields.length;i++){
							var field = app.field(fields[i]);
							field.clear()
						}
					}
					var img = document.getElementById(imgId); 
					//console.log(img);
					img.focus();
				}
			}]
		};

	}
	);
	
var imgNum = 0;
var imgId = '';
var app = undefined;