document.addEventListener('DOMContentLoaded', function() {
	var btn = document.getElementById('meinKnopf');
	if (btn) {
		btn.addEventListener('click', function(event) {
			event.preventDefault(); // verhindert das Folgen des Links
			alert('hello world');
		});
	}
});
