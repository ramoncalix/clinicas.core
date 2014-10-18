var time = new Date().getTime();

function millis(){
	return time.toString();
}

function segs(){
	return Math.round((time/1000)).toString();
}

module.exports = { millis: millis, segs: segs };