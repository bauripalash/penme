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

function showShare(){
  addClass(document.getElementById("share-modal"), "is-active");
}

function hideShare(){
  removeClass(document.getElementById("share-modal"), "is-active");
}

function saveAsPDF(){
  var doc = new jsPDF();
  var source = editor.root.innerHTML;
  doc.fromHTML(
    source,
    15,
    15,
    {
      'width': 180
    });

    // doc.output("datauri");
    doc.save(Date.now());
    hideShare()
  
}

// editor.root.innerHTML = store.get("draft0")

// setInterval(function(){saveDraft()},3000);

// var saveDraft = function(){
//     data = editor.root.innerHTML;
//     store.set("draft0" , data);
//     console.log(store.get("draft0"));
// }