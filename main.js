document.getElementById("myform").addEventListener("submit", saveBookmark);

// save bookmarks
function saveBookmark(e) {
	// get form values
	var siteName = document.getElementById("siteName").value;

	var siteUrl = document.getElementById("siteUrl").value;

if (!validateForm(siteName, siteUrl)) {
    return false;
}
    

	var bookmark = {
		name: siteName,
		url: siteUrl
	};

	if (localStorage.getItem("bookmarks") === null) {
		var bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	} else {
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

    document.getElementById("myform").reset();
	fetchBookmarks();

	e.preventDefault();
}

// Delete bookmarks

function deleteBookmark(url) {
	//get  bookmarks from localstorage

	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			// remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Reset back to LocalStorage

	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	// Re fetch bookmarks
	fetchBookmarks();
}

// Fetch bookmarks

function fetchBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	var bookMarksResults = document.getElementById("bookMarksResults");
	bookMarksResults.innerHTML = "";

	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookMarksResults.innerHTML +=
			'<div class="card bg-light text-dark card-body mt-3">' +
			"<h3>" +
			name +
			' <a class="btn btn-default" target="_blank" href="' +
			url +
			'">Visit</a>' +
			" <a onclick =\"deleteBookmark('" +
			url +
			'\')" class="btn btn-danger" href="#">Delete </a>' +
			"</h3>" +
			"</div>";
	}
}

function validateForm(siteName,siteUrl) {
    
    if (!siteName || !siteUrl) {
		alert("Please fill the form");
		return false;
		
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!siteUrl.match(regex)) {
             
            alert("Please use a valid URL")
            return false;
        }
    return true;
}