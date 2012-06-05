define([], function() {
	return {
		capitalizeFirst :  function (str) { 
			return str.charAt(0).toUpperCase() + str.slice(1); 
		},
		isEmpty : function(str) {
		  	return /^[\s\xa0]*$/.test(str);
		}
		
	};
}
);
