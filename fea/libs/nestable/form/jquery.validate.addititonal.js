(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "jquery.metadata","jquery.form","jquery.validate","validate.message","additional-methods.min"], factory);
	} else {
		factory( jQuery );
	}
}(function() {
	$.extend($.fn, {
		validateA: function(options){
			return this.validateB(options);
		},
		validateB: function(options){
			options = $.extend({
				errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                //ignore: ".ignore-validate",
                errorPlacement: function (error, element) { // render error placement for each input type
                	var ep = $(element).parent('.input-icon');
                    if(ep.length > 0){
                    	var icon = ep.children('i');
                    	icon.removeClass('fa-check').addClass("fa-warning");  
                    	icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
                    } else {
                    	if (element.attr("name") == "pwdRad") { // for uniform radio buttons, insert the after the given container
    	                    error.addClass("no-left-padding").appendTo("#pwdRad_error");
    	                } else if (element.attr("name") == "service") { // for uniform checkboxes, insert the after the given container
    	                    error.addClass("no-left-padding").appendTo("#service_error");
    	                } else {
    	                	var ex = $(element).next('span.select2-container,div.ztree-select,div.bootstrap-select');
    	                	if(ex.length > 0){
    	                		error.insertAfter(ex);
    	                	} else {
    	                		error.insertAfter(element); // for other inputs, just perform default behavoir
    	                	}
    	                }
                    }
                },
                invalidHandler: function (event, validator) { //display error alert on form submit              
	                App.scrollTo($(this), -200);
	            },
                unhighlight: function (element) { // revert the change dony by hightlight
                    if($(element).parent('.input-icon').length == 0){
                    	$(element).closest('.form-group').removeClass('has-error');
                    }
	            },
	            highlight: function (element) { // hightlight error inputs
	            	$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
	            },
                success: function (label, element, msg) {
                	var ep = $(element).parent('.input-icon');
                	if(ep.length > 0){
                		var icon = ep.children('i');
                		$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                		icon.removeClass("fa-warning").addClass("fa-check");
                	} else {
                		if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                            label.closest('.form-group').removeClass('has-error').addClass('has-success');
                            label.remove(); // remove error label here
                        } else { // display success icon for other inputs
                            label.addClass('valid') // mark the current input as valid and display OK icon
                            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                        }
                	}
                },
                submitHandler: function (form) {
                    form[0].submit(); // submit the form
                }
			},options);
			$.metadata.setType('attr','validate');
			return this.validate(options);
		}
	});
}));