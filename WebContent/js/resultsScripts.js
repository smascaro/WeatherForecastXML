
function callForecastApi(city1, city2) {
    getXMLForecast(city1, true);
    getXMLForecast(city2, false);
}
var forecast1;
var forecast2;
var city1;
var city2;
var currentXML;
$(document).ready(function() { 
	$("#city1").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        $("#btnCompare").trigger("click");
	    }
	});
	$("#city2").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        $("#btnCompare").trigger("click");
	    }
	});
});



function setForecasts(fc, isFirstForecast) {
    if (isFirstForecast) {
        forecast1 = fc;
    } else {
        forecast2 = fc;
    }

}

function updateTable() {
    if (forecast1 && forecast2) {
        //run xpath and xslt against xmlDoc element
        var xmlDoc = document.implementation.createDocument(null, "forecasts");
        xmlDoc.documentElement.append(forecast1.documentElement.cloneNode(true));
        xmlDoc.documentElement.append(forecast2.documentElement.cloneNode(true));
        currentXML = xmlDoc;
        applyStyles(xmlDoc);

        $('#resultsTable')[0].style.display = 'table';

        /*
        $("#city1Name")[0].innerHTML = forecast1.firstChild.childNodes[0].getAttribute("name");
        $("#city2Name")[0].innerHTML = forecast2.firstChild.childNodes[0].getAttribute("name");

        min = forecast1.firstChild.childNodes[1].getAttribute("min");
        max = forecast1.firstChild.childNodes[1].getAttribute("max");
        temp = forecast1.firstChild.childNodes[1].getAttribute("value");
        $("#city1Temp")[0].innerHTML = temp + " ºC (" + min + "º min./" + max + "º max.)";

        min = forecast2.firstChild.childNodes[1].getAttribute("min");
        max = forecast2.firstChild.childNodes[1].getAttribute("max");
        temp = forecast2.firstChild.childNodes[1].getAttribute("value");
        $("#city2Temp")[0].innerHTML = temp + " ºC (" + min + "º min./" + max + "º max.)";

        $("#city1Humid")[0].innerHTML = forecast1.firstChild.childNodes[2].getAttribute("value") + "%";
        $("#city2Humid")[0].innerHTML = forecast2.firstChild.childNodes[2].getAttribute("value") + "%";

        $("#city1Sky")[0].innerHTML = forecast1.firstChild.childNodes[8].getAttribute("value");
        $("#city2Sky")[0].innerHTML = forecast1.firstChild.childNodes[8].getAttribute("value");


        */
    }
}


function applyStyles(xml) {
    var xsl = document.implementation.createDocument("","",null);
    xsl = loadXMLDoc("xml/table_template.xsl");

    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    document.getElementById("compareResults").innerHTML = "";
    document.getElementById("compareResults").appendChild(resultDocument);

}

function saveXMLFile() {
    var file = new Blob(["<forecasts>" + currentXML.documentElement.innerHTML + "</forecasts>"], {type: "text/xml"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = $("#city1Name")[0].innerHTML + "_" + $("#city2Name")[0].innerHTML + ".xml";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}