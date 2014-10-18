var is_array = function(variable){
	if( Object.prototype.toString.call(variable) === '[object Array]' ) {
	    return true;
	}else{
		return false;
	}
};

module.exports = {
	is_array: is_array
};