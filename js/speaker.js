define(["jquery", "underscore"], function($, _){
	var Speaker = {
		init : function(){
			var self = this;
			self.populateVoices();
			self.bind();

		},

		bind : function(){
			var self = this;
			$("#speak").on("click",function(){
	            var text = $("input[type=text]").val();
	            var defaultOpt = {gender : "male", lang: "en"};
	            var picked_voice = $("select#pick_voice").val();
	            var voices = self.voices || [];
	            var voice = voices[parseInt(picked_voice,10)] || {};
	            var gender = $("input[name=gender]:checked").val();
	            var options = $.extend(defaultOpt, _.pick(voice, "voiceName", "lang", "gender"), {gender : gender});
	            //alert(text);
	            chrome.tts.speak(text, options, function(){
	                if (chrome.runtime.lastError) {
	                  console.log('Error: ' + chrome.runtime.lastError.message);
	                }
	            });
	        });

		},

		populateVoices : function(){
			var self = this;
			var selectField = $("select#pick_voice");
			var populateHtml = "";
			chrome.tts.getVoices(function(voices) {
				self.voices = voices;
	            for (var i = 0; i < voices.length; i++) {
	            	populateHtml += "<option value='" + i +"'>" + voices[i].voiceName + "</option>";
		            // console.log('Voice ' + i + ':');
		            // console.log('  name: ' + voices[i].voiceName);
		            // console.log('  lang: ' + voices[i].lang);
		            // console.log('  gender: ' + voices[i].gender);
		            // console.log('  extension id: ' + voices[i].extensionId);
		            // console.log('  event types: ' + voices[i].eventTypes);
	            }
	            selectField.html(populateHtml);
	        });
		}
	};
	


	return Speaker;
});