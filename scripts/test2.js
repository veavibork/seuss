function crunch(n) {
    var t0 = new Date().getTime();
    var lines = [];
    var enteredText = n;
    var linecheck = (enteredText.match(/\n/g)||[]).length;
    if(linecheck==0) {
        lines.push(enteredText);
    }
    else for(var i = 0; i < linecheck+1; i++)
    {
        if(i<linecheck){
        var x = enteredText.search(/\n/g)||[];
        lines.push(enteredText.substring(0, x));
        enteredText=enteredText.substring(x+1, enteredText.length);
        }
        else{
        lines.push(enteredText);
        }
    }

    var rows = lines.length;
    var cols = 0;
    var words = [];
    for (var i = 0; i < rows; i++) {
            var x = lines[i];
            var y = string_to_array(x);
            if(y.length>cols) {cols = y.length;};
            words.push(y);
    }
    var result = "<table><tr><td>row</td><td>syl</td><td>chars</td><td>rhyme</td></tr>";
    var wcount=0;
    for(var i = 0; i < rows; i++) {
        var scount=0;
        var x="";
        var row = "";
        var text = "";
        if(words[i][0]!=="") {
            var rowlength=lines[i].length;
            for(var i2 = 0; i2<words[i].length; i2++) {
                x = words[i][i2];
                wcount++;
                var y = brutefind(x);
                if(y!==undefined) {
                    scount+=y[1];
                    text+="<td>"+y[0]+"</td>";
                } else {
                    text+="<td>???</td>";
                }
            }
            var y = x.replace(/[^0-9A-Za-z']/g,'').toLowerCase();
            row = "<tr><td>"+(i+1)+"</td><td>"+scount+"</td><td>"+rowlength+"</td><td><button onclick=\'getrhyme(&quot;"+y+"&quot;)\'>get</button></td>"+text+"</tr>";
            result+=row;
        }
    }
    result+="</table>"
    var t1 = new Date().getTime();
    var header = "Word count: "+wcount+". Time: " + ((t1 - t0) / 1000) + " seconds.<br>Desired: 11 syllable line. 10-12 variance. 50 characters, 45-55 variance. A mid-line break may count as a syllable.<br>196 lines. ~24 blocks of 8 rhymes apiece.<br>";
    document.getElementById("demo").innerHTML = header+result;
};

function string_to_array(str) {
    var x = str.trim();
    x = x.replace(/[-]+/g, ' ').replace(/\s\s+/g, ' ').trim();
    return x.split(" ");
};

function brutefind(str) {
    var fix = str.replace(/[^0-9A-Za-z']/g,'').toLowerCase();
    for (var i = 0; i<dictionary.length;i++) {
        if(dictionary[i][0]==fix) {
            return dictionary[i];
        }
    }
    fix = fix.substring(0, fix.length-1);
    for (var i = 0; i<dictionary.length;i++) {
        if(dictionary[i][0]==fix) {
            return dictionary[i];
        }
    }
    fix = fix.substring(0, fix.length-1);
    for (var i = 0; i<dictionary.length;i++) {
        if(dictionary[i][0]==fix) {
            return dictionary[i];
        }
    }
    fix = fix.substring(0, fix.length-1);
    for (var i = 0; i<dictionary.length;i++) {
        if(dictionary[i][0]==fix) {
            return dictionary[i];
        }
    }
}

function getrhyme(str) {
    var x = "https://rhymezone.com/r/rhyme.cgi?Word="+str+"&typeofrhyme=perfect&org1=syl&org2=l&org3=y";
    var y = document.getElementById("framed");
    y.src = x;
    y.onload = function() {
        y.contentWindow.scrollto(100, 0);
    }
}