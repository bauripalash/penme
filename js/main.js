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
  var doc = new jsPDF('p', 'px', 'a4');
  var source = editor.root.innerHTML;
  doc.fromHTML(
    source,
    15,
    15, {
      'width': 180
    });

  doc.output("datauri");
  // doc.save(Date.now() + ".pdf");
  hideShare();

}

function saveAsTXT() {
  data = JSON.stringify(editor.getContents()["ops"]);
  fileName = Date.now() + ".pnme.txt";
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

try {
  setInterval(function () {
    localStorage.setItem("draft0", editor.root.innerHTML);
  }, 1000);
} catch (e) {
  if (e == QUOTA_EXCEEDED_ERR) {
    alert('AutoSave Failed!');
  }
}

window.onload = function (e) {
  editor.root.innerHTML = localStorage.getItem("draft0");
};
// mango = false;
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  document.getElementById("fileloadbtn").style.display = "none";
}

var reader;
var progress = document.querySelector('.percent');

function abortRead() {
  reader.abort();
}

function errorHandler(evt) {
  switch (evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break; // noop
    default:
      alert('An error occurred reading this file.');
  };
}

function updateProgress(evt) {
  // evt is an ProgressEvent.
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}

function handleFileSelect(evt) {
  // Reset progress indicator on new file selection.
  progress.style.width = '0%';
  progress.textContent = '0%';

  reader = new FileReader();
  reader.onerror = errorHandler;
  reader.onprogress = updateProgress;
  reader.onabort = function (e) {
    alert('File read cancelled');
  };
  reader.onloadstart = function (e) {
    document.getElementById('progress_bar').className = 'loading';
  };
  reader.onload = function (e) {
    // Ensure that the progress bar displays 100% at the end.
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout("document.getElementById('progress_bar').className='';", 2000);
    console.log("sssd");

  };

  reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) { // DONE == 2
      console.log(typeof (evt.target.result));
      console.log(evt.target.result);
      // editor.root.innerHTML = evt.target.result;
      editor.setContents(JSON.parse(evt.target.result) , "api");
      // console.log("ss");
    }
    // console.log("sss");
  };

  // Read in the image file as a binary string.
  reader.readAsBinaryString(evt.target.files[0]);
}

document.getElementById('loadfileinput').addEventListener('change', handleFileSelect, false);