window.onload = function setFocus(){
//    document.getElementById("loadbox").setAttribute('style','opacity:0;pointer-events: none;')
    document.getElementById("input").focus();
}

function parseXML(xml_string){
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(xml_string, "text/xml");
  return xmlDoc
}

function parseArXivXML(xml_doc){
  var first_author_name_parts = xml_doc.querySelector("author name").textContent.split(" ");
  first_author_name_parts.shift();
  var first_author = first_author_name_parts.join(" ");
  var title = xml_doc.querySelector("entry title").textContent;
  var url = xml_doc.querySelector("entry id").textContent;
  var updated = xml_doc.querySelector("entry updated").textContent;
  var category = xml_doc.querySelector("category").getAttribute("term");
  var formatted = "📄 " + first_author + " et al. (" + updated.split("-")[0] + ") " + title + " (arX⠶" + category + ") " + url;
  return formatted
}

function listInfo(){
  var search_term = document.getElementById("input").value;
  var api_url = "http://export.arxiv.org/api/query?search_query=all:" + search_term + "&start=0&max_results=1"
  fetch(api_url)
	.then(response => response.text())
	.then(data => document.getElementById("responselist").innerHTML = parseArXivXML(parseXML(data)));
//	.then(data => console.log(parseXML(data)));
  /*var titleRE = new RegExp("\\n(.*?"+title+".*?)\\n","gi");
  var response = abbrevlist.match(titleRE).join("<br />");
      */
  // document.getElementById("responselist").innerHTML = response;

}
