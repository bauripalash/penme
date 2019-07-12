var toolbarOptions = [
    [{ 'header': [1, 2, 3, false] } , 'bold', 'italic', 'underline', 'strike' , { 'list': 'ordered'}, { 'list': 'bullet' }],
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
// editor.root.innerHTML = store.get("draft0")

// setInterval(function(){saveDraft()},3000);

// var saveDraft = function(){
//     data = editor.root.innerHTML;
//     store.set("draft0" , data);
//     console.log(store.get("draft0"));
// }