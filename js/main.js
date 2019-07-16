window.EVERCHECKED = false;

var toolbarOptions = [
  [{
    'header': [1, 2, 3, false]
  }, 'bold', 'italic', 'underline', 'strike', {
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }, 'blockquote'],
  // [],        // toggled buttons
  // ['blockquote'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  // [],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown


  // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  // [{ 'align': [] }],

  // ['clean']                                         // remove formatting button
];

var options = {
  // debug: 'info',
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Compose an epic...',
  // readOnly: true,
  theme: 'snow'
};

var editor = new Quill('#pm-editor', options);

function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

function toggleNav() {
  document.getElementById('navbar-burger').classList.toggle('is-active');
  document.getElementById('navbar-extra').classList.toggle('is-active');

}

function showAbout() {
  addClass(document.getElementById("about-modal"), "is-active");
}

function hideAbout() {
  removeClass(document.getElementById("about-modal"), "is-active");
}

function showShare() {
  addClass(document.getElementById("share-modal"), "is-active");
}

function hideShare() {
  removeClass(document.getElementById("share-modal"), "is-active");
}

function saveAsPDF() {
  var doc = new jsPDF();
  var source = editor.root.innerHTML;
  doc.fromHTML(
    source,
    15,
    15, {
      'width': 180
    });

  // doc.output("datauri");
  doc.save(Date.now() + ".pdf");
  hideShare();

}

function saveAsTXT() {
  data = editor.getText();
  fileName = Date.now() + ".txt";
  var a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  a.href = window.URL.createObjectURL(
    new Blob([data], {
      type: "text/plain;charset=utf-8"
    })
  );
  a.setAttribute("download", fileName);
  a.click();
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
  hideShare();
}

// var setLS_1 = function(){
//   store.set("slot" , "1");
//   removeClass(document.getElementById("slot1") , "is-outlined");
// };

// var setLS_2 = function(){
//   store.set("slot" , "2");
//   removeClass(document.getElementById("slot2") , "is-outlined");
// };

// var setLS_3 = function(){
//   store.set("slot" , "3");
//   removeClass(document.getElementById("slot3") , "is-outlined");
// };

// window.onload = function(e){
//   whichslot = store.get("slot");
//   if (whichslot == "1"){
//     removeClass(document.getElementById("slot1l") , "is-outlined");
//   }else if (whichslot == "2"){
//     removeClass(document.getElementById("slot2l") , "is-outlined");

//   }else if (whichslot == "3"){
//     removeClass(document.getElementById("slot3l") , "is-outlined");

//   }else{
    
//   }
// };



var rad = document.slotForm.slot;
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        (prev) ? addClass(document.getElementById(prev.value + "l") , "is-outlined"): null;
        if (this !== prev) {
            prev = this;
        }
        slotchange(this.value);
    });
}

function slotchange(v){
  window.EVERCHECKED = true;
  if (v == "slot1"){
        removeClass(document.getElementById("slot1l") , "is-outlined");
        loadslot("1");
      }else if (v == "slot2"){
        removeClass(document.getElementById("slot2l") , "is-outlined");
        loadslot("2");
      }else if (v == "slot3"){
        loadslot("3");
        removeClass(document.getElementById("slot3l") , "is-outlined");
          }else{
    
  }
    
}

function loadslot(s){
  editor.root.innerHTML = store.get("draft" + s);
}

if (EVERCHECKED){
  try {
    setInterval(function() {
      
      if (["1" , "2" , "3"].indexOf(store.get("slot"))){
        getslot = store.get("slot");
      }else{
        getslot = "0";
      }
      
      store.set("draft" + getslot, editor.root.innerHTML);
    }, 1000);
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('AutoSave Failed!');
    }
  }
}else{
  try {
    setInterval(function() {
      store.set("draft0", editor.root.innerHTML);
    }, 1000);
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('AutoSave Failed!');
    }
  }
}


window.onload = function(e){
  editor.root.innerHTML = store.get("draft0");
}

