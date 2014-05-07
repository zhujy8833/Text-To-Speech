require.config({
    paths: {
        "jquery": "lib/jquery",
        "underscore": "lib/underscore",
        "mustache": "lib/mustache",
        "text": "vendor/require-text",
        "jquery-ui": "lib/jquery-ui-1.10.4.min"

    }

});

require(["jquery", "speaker"], function($, Speaker){
    $(document).ready(function(){

        Speaker.init();
    });

});