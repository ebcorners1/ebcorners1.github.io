var ham = "";
var list = "";
var lang = "";

function OpenHamburger(OpenClosed) {
    switch (OpenClosed) {
        case "open":
            ham.classList.add("open");
            list.classList.add("open");
        break;

        case "closed":
            ham.classList.remove("open");
            list.classList.remove("open");
            lang.classList.remove("open");
            langDropDown.classList.remove("open");
        break;
    
        default:
            if (ham.classList.contains("open")) {
                ham.classList.remove("open");
                list.classList.remove("open");
                lang.classList.remove("open");
                langDropDown.classList.remove("open");
            } else {
                ham.classList.add("open");
                list.classList.add("open");
            };
        break;
    }
}   

function ChooseLanguage(OpenClosed){
    switch (OpenClosed) {
        case "open":
            lang.classList.add("open");
        break;

        case "closed":
            lang.classList.remove("open");
        break;

        default:
            if (lang.classList.contains("open")) {
                lang.classList.remove("open");
                langDropDown.classList.remove("open");
            } else {
                lang.classList.add("open"); 
                langDropDown.classList.add("open"); 
            }
        break;
    }
}

function X(){
    ham = document.getElementById("Hamburger");
        list = document.getElementsByTagName("header")[0].getElementsByTagName("nav")[0].getElementsByTagName("ul")[0];
        lang = document.getElementById("language");
        langDropDown = document.getElementsByClassName("nav-dropdown")[0];

        var mqls = [
            window.matchMedia("(max-width: 767px)"),
            window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
            window.matchMedia("(min-width: 922px) and (max-width: 1199px)"),
            window.matchMedia("(min-width: 1200px)")
        ]

        WidthChange();

        for (i = 0; i < mqls.length; i++){mqls[i].addListener(WidthChange);};

        function WidthChange(){
            if (mqls[0].matches) {
                list.classList.add("ham");
                ham.classList.remove("open");
                list.classList.remove("open");
                CharToSpan();
            } else if (mqls[1].matches) {
                ham.classList.remove("open");
                list.classList.remove("open");
                list.classList.remove("ham");
                RemoveSpans();
            } else if (mqls[2].matches) {
                ham.classList.remove("open");
                list.classList.remove("open");
                list.classList.remove("ham");
                RemoveSpans();
            } else if (mqls[3].matches) {
                ham.classList.remove("open");
                list.classList.remove("open");
                list.classList.remove("ham");
                RemoveSpans();
            }
        };
}

document.addEventListener("DOMContentLoaded", function(e){X();});
window.addEventListener("orientationchange", function(e){X();});
window.addEventListener("resize", function(e){X();});

var MenuCount;

function CircleCount() {
    for (ULs of document.getElementsByClassName("CircleMenu")) {
        return ULs.getElementsByTagName("LI").length;
    };
}

function InnerCircleDiameter() {
    for (ULs of document.getElementsByClassName("CircleMenu")) {
        for (classes of ULs.classList) {
            if (classes.startsWith("CM-ID-")) {return classes.slice(6)};
        };
    };
}

function OuterCircleDiameter() {
    for (ULs of document.getElementsByClassName("CircleMenu")) {
        for (classes of ULs.classList) {
            if (classes.startsWith("CM-MD-")) {
                if (document.documentElement.clientWidth < classes.slice(6)) {
                    return ((document.documentElement.clientWidth - InnerCircleDiameter()) / (CircleCount() - 1)); 
                } else {
                    return ((classes.slice(6) - InnerCircleDiameter()) / (CircleCount() - 1));   
                };
            };
        };
    };
}

function FontSize() {
    return ((OuterCircleDiameter() * 0.35) + "px");
    /* return ((OuterCircleDiameter() * 0.4) + "px"); */
}

function addRuleSize(element, MenuIndex) {
    var wAndH = (parseInt(InnerCircleDiameter()) + ((OuterCircleDiameter()) * (MenuIndex - 1)));
    var aTop = (wAndH / 2);
    var newRule = "nav>ul.open.ham li.CircleMenu" + MenuIndex + " {top: calc(" + ~aTop + "px + 35px); left: calc((100% - " + wAndH + "px) / 2); width: " + wAndH + "px; height: " + wAndH + "px;}";
    var sheet = document.createElement("style");
    sheet.innerHTML = newRule;
    sheet.setAttribute("id", "CircleMenu" + MenuIndex);
    if (!document.getElementById("CircleMenu" + MenuIndex)) {document.body.appendChild(sheet);};

    var newRuleOne = "nav>ul.open.ham li.CircleMenu1" + " {top: calc(" + ~InnerCircleDiameter() / 2 + "px + 35px); left: calc((100% - " + InnerCircleDiameter() + "px) / 2); width: " + InnerCircleDiameter() + "px; height: " + InnerCircleDiameter() + "px;}";
    var sheetOne = document.createElement("style");
    sheetOne.innerHTML = newRuleOne;
    sheetOne.setAttribute("id", "CircleMenu1");
    if (!document.getElementById("CircleMenu1")) {document.body.appendChild(sheetOne);};

    var newRuleFont = "nav>ul.ham.open>li span[class^='Menu'] {font-size: " + FontSize() + "}";
    var sheetFont = document.createElement("style");
    sheetFont.innerHTML = newRuleFont;
    sheetFont.setAttribute("id", "FontSize");
    if (!document.getElementById("FontSize")) {document.body.appendChild(sheetFont);};
}

function addRuleOpen(element, MenuIndex) {
    var aHeight = ((InnerCircleDiameter() / 2) + ((MenuIndex - 1) * (OuterCircleDiameter() / 2)));
    /* var aPadding = (aHeight - parseInt(FontSize()) - (((OuterCircleDiameter() / 2) - parseInt(FontSize())) / 2)); */
    var aPadding = ((InnerCircleDiameter() / 2) + ((MenuIndex - 2) * (OuterCircleDiameter() / 2)));
    var newRule = "nav>ul.ham.open>li span[class^='Menu" + MenuIndex + "Char'] {height: " + aHeight + "px; padding-top: " + aPadding + "px; z-index: " + (6 - MenuIndex) + ";}"
    var sheet = document.createElement("style");
    sheet.innerHTML = newRule;
    sheet.setAttribute("id", "Menu" + MenuIndex + "Char");
    if (!document.getElementById("Menu" + MenuIndex + "Char")) {document.body.appendChild(sheet);};
}

function addRotationRule(element, MenuIndex) {
    var CharSpacing = 0;
    var TextRotation = 0;
    var CharSpacingDeg;
    var CharCount;

    for (classes of LIs.classList) {if (classes.startsWith("CM-S-")) {CharSpacing = classes.slice(5);};};
    for (classes of LIs.classList) {if (classes.startsWith("CM-R-")) {TextRotation = parseInt(classes.slice(5));};};     

    switch (CharSpacing) {
        case "1": CharSpacingDeg = 2.5; break;
        case "2": CharSpacingDeg = 3; break;
        case "3": CharSpacingDeg = 4; break;
        case "4": CharSpacingDeg = 5; break;
        case "5": CharSpacingDeg = 6; break;
        case "6": CharSpacingDeg = 7; break;
        case "7": CharSpacingDeg = 8; break;
        case "8": CharSpacingDeg = 9; break;
        case "9": CharSpacingDeg = 10; break;
        default: CharSpacingDeg = 0; break;
    }

    if (LIs.textContent.length > 0) {
        if (LIs.getElementsByTagName("A").length > 0) {
            for (aTags of LIs.getElementsByTagName("A")) {
                CharCount = 1
                var OverallAngle = (aTags.getElementsByTagName("SPAN").length - 1) * CharSpacingDeg;
                for (spans of aTags.getElementsByTagName("SPAN")) {
                    var charAngle = (OverallAngle / 2) - ((CharCount - 1) * CharSpacingDeg);
                    var newRule = "nav>ul.ham>li span.Menu" + MenuIndex + "Char" + CharCount + " {-webkit-transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg)); -moz-transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg)); -o-transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg)); transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg));}"
                    var sheet = document.createElement("style");
                    sheet.innerHTML = newRule;
                    sheet.setAttribute("id", "span.Menu" + MenuIndex + "Char" + CharCount)
                    if (!document.getElementById("span.Menu" + MenuIndex + "Char" + CharCount)) {document.body.appendChild(sheet);};
                    CharCount++;
                };
            };
        } else {
            CharCount = 1
            var OverallAngle = (LIs.getElementsByTagName("SPAN").length - 1) * CharSpacingDeg;
            for (spans of LIs.getElementsByTagName("SPAN")) {
                var charAngle = (OverallAngle / 2) - ((CharCount - 1) * CharSpacingDeg);
                var newRule = "nav>ul.ham>li span.Menu" + MenuIndex + "Char" + CharCount + " {-webkit-transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg)); -moz-transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg)); -o-transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg)); transform: rotate(calc(" + charAngle + "deg + " + TextRotation + "deg));}"
                var sheet = document.createElement("style");
                sheet.innerHTML = newRule;
                sheet.setAttribute("id", "span.Menu" + MenuIndex + "Char" + CharCount)
                if (!document.getElementById("span.Menu" + MenuIndex + "Char" + CharCount)) {document.body.appendChild(sheet);};
                CharCount++;
            };
        };
    }; 
}

function CharToSpan() {
    MenuCount = 2;
    for (ULs of document.getElementsByClassName("CircleMenu")) {
        for (LIs of ULs.getElementsByTagName("LI")) {
            if (LIs.textContent.length > 0) {
                if (LIs.getElementsByTagName("A").length > 0) {
                    for (aTags of LIs.getElementsByTagName("A")) {SubCharToSpan(aTags);};
                } else {
                    SubCharToSpan(LIs);
                };
                RemoveRuleSize(MenuCount);
                addRuleSize(LIs, MenuCount);
                RemoveRuleOpen(MenuCount);
                addRuleOpen(LIs, MenuCount);
                addRotationRule(LIs, MenuCount);
                MenuCount++;
            };
        };
    };
}

function SubCharToSpan(element) {
    var elementText = element.textContent
    element.textContent = "";
    for (i = 0; i < elementText.length; i++) {
        var nNode = document.createElement("SPAN");
        nNode.innerHTML = elementText.charAt(i);
        nNode.classList.add("Menu" + MenuCount + "Char" + (i + 1));
        element.appendChild(nNode);
    };
}

function RemoveSpans() {
    MenuCount = 2;
    for (ULs of document.getElementsByClassName("CircleMenu")) {
        for (LIs of ULs.getElementsByTagName("LI")) {
            if (LIs.textContent.length > 0) {
                RemoveRuleOpen(MenuCount);
                if (LIs.getElementsByTagName("A").length > 0) {
                    for (aTags of LIs.getElementsByTagName("A")) {
                        RemoveRotationRule(aTags, MenuCount);
                        SubRemoveSpans(aTags);
                    };
                } else {
                    RemoveRotationRule(LIs, MenuCount);
                    SubRemoveSpans(LIs);
                };
                MenuCount++;
            };
        };
    };
}

function RemoveRuleOpen(MenuIndex) {
    /* for (rStyles of document.getElementById) { */
    if (document.getElementById("Menu" + MenuIndex + "Char")) {
        document.getElementById("Menu" + MenuIndex + "Char").remove();
    }
}

function RemoveRuleSize(MenuIndex) {
    if (document.getElementById("CircleMenu" + MenuIndex)) {
        document.getElementById("CircleMenu" + MenuIndex).remove();
    }
    if (document.getElementById("FontSize")) {
        document.getElementById("FontSize").remove();
    }
}

function RemoveRotationRule(element, MenuIndex) {
    var CharIndex = 1;
    for (spans of element.getElementsByTagName("SPAN")) {
        document.getElementById("span.Menu" + MenuIndex + "Char" + CharIndex).remove();
        CharIndex++;
    }
}

function SubRemoveSpans (element) {
    var nElementText = ""
    var spanRemoved = false;
    for (Spans of element.getElementsByTagName("SPAN")) {
        nElementText = nElementText + Spans.textContent;
        Spans.remove;
        spanRemoved = true;
    };
    if (spanRemoved) {element.textContent = nElementText;};
}