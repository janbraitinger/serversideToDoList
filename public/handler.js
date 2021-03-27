const mainArray = [];

// toDo Error messages of the input validation
// toDo AddServerData is sometimes undefined -> defer

const init = () => {
    let entryValue = document.getElementById("entry").value;
   // entryValue = entryValue.replace(',',' -');
	entryValue = replaceKomma(entryValue);
	if (entryValue.length > 0 && entryValue.length < 125)
	{
		add(entryValue);
		document.getElementById("errormsg").innerHTML = ""
		document.getElementById("entry").style.borderColor = "";
}else{
document.getElementById("entry").style.borderColor = "red";
	document.getElementById("errormsg").innerHTML = "your input is not allowed!";
}
    entryValue = document.getElementById("entry").value = "";
};



function replaceKomma(param){
while(true){
	if(!param.includes(",")){
	return param;

	}

	param = param.replace(',', ' -');
}
}


const add = (data) => {
    if (data.length > 1) {
        mainArray.push(data);
        let ul = document.getElementById("entrys");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(data));
        li.innerHTML += '<span class="close">&times;</span>';
        ul.appendChild(li);
        sendData(data);
        close();
    }

}


function addServerData(data) {
    document.getElementById("loading").innerHTML = "loading items - pls wait a second";
    //setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    let ul = document.getElementById("entrys");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(data));
    li.innerHTML += '<span class="close">&times;</span>';
    ul.appendChild(li);
    close();
    // }, 0);

}


const sendData = (data) => {
    data = '{"entry":"' + data + '"}';
    const XHR = new XMLHttpRequest();
    XHR.open('POST', '/newEntry');
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(data);
}


const deleteData = (data) => {
    console.log(data);
    mainArray.pop(data);
    let newdata = '{"deleteEntry":"' + data + '"}';
    const XHR = new XMLHttpRequest();
    XHR.open('POST', '/deleteEntry');
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(newdata);

}





const close = () => {
    var closebtns = document.getElementsByClassName("close");
    var i;
    _flag = true
    for (i = 0; i < closebtns.length; i++) {
        closebtns[i].addEventListener("click", function () {
            this.parentElement.style.display = 'none';
            if (_flag)
                deleteData(this.parentElement.innerHTML.split('<span class="close">')[0]);
            _flag = false;

        });
    }

}


const createNewList = () => {
    window.location.href = "/auth";
}
