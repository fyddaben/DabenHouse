$(function(){
	$('#file_upload').uploadify({
		'swf'     : '/images/uploadify.swf',
		'formData':{
			'userid':'用户id',
			'username':'用户名',
			'rnd':'加密密文'
		}, 
		'cancelImg ':'/images/uploadify-cancel.png',
		'fileTypeExts' : '*.gif; *.jpg; *.png',
		'simUploadLimit ':'1',
		'uploader' : '/fileupload',
		'onUploadSuccess' : function(file, data, response) {
	
			$("#imglog").html(data);
		}
	});
});