// Quill JS Editor Config

const toolbarOptions = [
  [{
    'header': [1, 2, 3, false]
  }, 'bold', 'italic', 'underline', 'strike', {
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }, 'blockquote'],
];

const options = {
  // debug: 'info',
  modules: {
    toolbar: '#toolbar'
  },
  placeholder: 'Pen a Revolution....',
  // readOnly: true,
  theme: 'snow'
};

const editor = new Quill('#pm-editor', options);

// Some Handy Functions

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

let getDate = () => {
  let date = new Date();
  let d = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "--" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
  return d;
}


// Save Quill JS text to PDF
let saveAsPDF = () => {
  // let doc = new jsPDF({ filters: ['ASCIIHexEncode'] });
  // let source = editor.root.innerHTML;
  // doc.setFont("NotoSans","normal");
  // doc.setFontSize(16);
  // doc.fromHTML(
  //   source,
  //   15,
  //   15, {
  //     'width': 180
  //   });

  // // doc.output("datauri");
  // console.log(doc.getFontList());
  // doc.save(getDate() + ".pdf");
  // document.getElementsByClassName("ql-editor")[0].style.color = "black";


  // let element = document.getElementsByClassName("ql-editor")[0];
  // element.style.color = "black";
  // let opt = {
  //   margin: 1,
  //   filename: getDate() + ".pdf",
  //   image: {
  //     type: 'jpeg',
  //     quality: 1
  //   },
  //   html2canvas: {
  //     scale: 2
  //   },
  //   jsPDF: {
  //     unit: 'px',
  //     format: 'a4',
  //     orientation: 'portrait',
  //   }
  // };

  // // New Promise-based usage:
  // html2pdf(element, opt).then(()=>{
  //   element.style.color="white";

  // })
  var rawdata = document.getElementsByClassName("ql-editor")[0].innerHTML;
  var printWindow = window.open('', '', 'height=842,width=595');
  printWindow.document.write(`<html><head><title></title></head><body><style type="text/css">
  @page{
    size: auto;
    margin: 3mm;
  }
  </style>
  ${rawdata}
  </body></html>`);
  printWindow.document.close();
  printWindow.print();


  showToast("Downloading PDF!");

  hideShare();
  // document.getElementsByClassName("ql-editor")[0].style.color = "white";
};

// Save .pnme.txt file to loaded and edited later
let saveAsTXT = () => {
  let data = JSON.stringify(editor.getContents()["ops"]);
  let fileName = getDate() + ".pnme.txt";
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
};

// Autosave
if (window.location.hash == "") {
  try {
    setInterval(() => {
      localStorage.setItem("draft0", editor.root.innerHTML);
    }, 1000);
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('AutoSave Failed!');
    }
  }
}

window.onload = (e) => {
  if (window.location.hash == "") {
    let data = localStorage.getItem("draft0");
    if (data) {
      editor.root.innerHTML = data;
    }
  }
  document.getElementById("loader").style.display = "none";
  document.getElementsByClassName("ql-picker-label")[0].setAttribute("aria-label", "Select Header Label");
  document.documentElement.className = "bg";
};


if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  document.getElementById("fileloadbtn").style.display = "none";
}

// File Load Progressbar

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

  reader.onloadend = (evt) => {
    if (evt.target.readyState == FileReader.DONE) {
      console.log(typeof (evt.target.result));
      console.log(evt.target.result);
      editor.setContents(JSON.parse(evt.target.result), "api");
      // console.log("ss");
    }
    // console.log("sss");
  };

  // Read in the image file as a binary string.
  reader.readAsBinaryString(evt.target.files[0]);
}

document.getElementById('loadfileinput').addEventListener('change', handleFileSelect, false);

let showToast = (msg) => {
  let sb = document.getElementById("snackbar");
  sb.innerHTML = msg;
  sb.className = "show";
  setTimeout(function () {
    sb.className = sb.className.replace("show", "");
  }, 1500);
}

let AutoCopyURL = () => {
  let copyText = document.getElementById("usm-url-link");
  copyText.select();
  document.execCommand("copy");

};

editor.on('text-change', function (delta, oldDelta, source) {
  if (source == 'api') {
    //
  } else if (source == 'user') {
    window.location.hash = "";
  }
});

let shareAsURL = () => {
  let data = JSON.stringify(editor.getContents()["ops"]);
  let enc = window.btoa(LZString.compressToEncodedURIComponent(data));
  hideShare();
  document.getElementById("usm-url-link").value = "https://penme.ml/#" + enc;
  addClass(document.getElementById("urlshare-modal"), "is-active");
  AutoCopyURL();
};

let hashh = window.location.hash.substr(1);
if (window.location.hash != "") {
  let res = LZString.decompressFromEncodedURIComponent(window.atob(hashh));
  editor.setContents(JSON.parse(res), "api");
}