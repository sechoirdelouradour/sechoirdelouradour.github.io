let url = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdweSKUnDL0v8_Xw3RLN4cYw_ik1pDd3U71GbEy6GI_ptChzw/formResponse"; //action url
let form = document.querySelector("#reservation_from"); //form element

$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

form.addEventListener("submit", (e)=>{
    e.preventDefault();//prevent default behaviour

    fetch(url,{
        method: "POST",
        mode: "no-cors",
        header:{
            'Content-Type': 'application/json'
            },
        body: getInputData()
    })
    .then(data=>{
        console.log(data);
        window.location.href = "index.html";
    })
    .catch(err=>console.error(err)); //promise based
});

//populating input data
function getInputData(){
    let dataToPost = new FormData(); //formdata API

    //fill name attributes to corresponding values
    dataToPost.append("entry.1048796954", document.querySelector("#name").value);
    dataToPost.append("entry.1661449210", document.querySelector("#email").value);
    dataToPost.append("entry.1958767559", document.querySelector('input[name=chambe1_config]:checked').value);

    return dataToPost;
}


