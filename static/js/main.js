const toolbarOptions = [
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

const options = {
  // debug: 'info',
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Compose an epic...',
  // readOnly: true,
  theme: 'snow'
};

const editor = new Quill('#pm-editor', options);

let hasClass = (ele, cls) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

let addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
};

let removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
};

let toggleNav = () => {
  document.getElementById('navbar-burger').classList.toggle('is-active');
  document.getElementById('navbar-extra').classList.toggle('is-active');

};

let showAbout = () => {
  addClass(document.getElementById("about-modal"), "is-active");
};

let hideAbout = () => {
  removeClass(document.getElementById("about-modal"), "is-active");
};

let showShare = () => {
  addClass(document.getElementById("share-modal"), "is-active");
};

let hideShare = () => {
  removeClass(document.getElementById("share-modal"), "is-active");
};

let saveAsPDF = () => {
  let doc = new jsPDF('p', 'px', 'a4');
  let source = editor.root.innerHTML;
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

let saveAsTXT = () => {
  let data = JSON.stringify(editor.getContents()["ops"]);
  let fileName = Date.now() + ".pnme.txt";
  let a = document.createElement("a");
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
  setInterval(() => {
    localStorage.setItem("draft0", editor.root.innerHTML);
  }, 1000);
} catch (e) {
  if (e == QUOTA_EXCEEDED_ERR) {
    alert('AutoSave Failed!');
  }
}

window.onload = (e) => {
  let data = localStorage.getItem("draft0");
  if (data){
    editor.root.innerHTML = data;
  }
  document.getElementById("loader").style.display = "none";
  
};
// mango = false;
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  document.getElementById("fileloadbtn").style.display = "none";
}

let reader;
let progress = document.querySelector('.percent');

let abortRead = () => {
  reader.abort();
};

let errorHandler = (evt) => {
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

let updateProgress = (evt) => {
  // evt is an ProgressEvent.
  if (evt.lengthComputable) {
    let percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}

let handleFileSelect = (evt) => {
  // Reset progress indicator on new file selection.
  progress.style.width = '0%';
  progress.textContent = '0%';

  reader = new FileReader();
  reader.onerror = errorHandler;
  reader.onprogress = updateProgress;
  reader.onabort = (e) => {
    alert('File read cancelled');
  };
  reader.onloadstart = (e) => {
    document.getElementById('progress_bar').className = 'loading';
  };
  reader.onload = (e) => {
    // Ensure that the progress bar displays 100% at the end.
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout("document.getElementById('progress_bar').className='';", 2000);
    console.log("sssd");

  };

  reader.onloadend =  (evt) => {
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