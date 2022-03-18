
let btn=document.querySelector('.btn')
let namebox=document.querySelector('#name')
let emailbox=document.querySelector('#email')
let i=0;


//scan all existing element from server 
window.addEventListener("DOMContentLoaded",() => {
    console.log("Testing...");

    function AutoLoad(){
        let response=axios
                .get("https://crudcrud.com/api/d4fa4cc280c64d2bb44e971ef17f6b30/Data")   
                return response;
                
    }
    async function automain(){
        try{
            await AutoLoad();
            for(var i=0;i<response.data.length;i++){
                ShowNewUser(response.data[i])
            }
        }
        catch(err){
           
            console.log(`Error : Something went wrong`);
            console.log(` Error type = ${err}`);
        }
    }
    automain();
});



//Adding new user details
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    myobj={
        name:namebox.value,
        email:emailbox.value,
        };

    function assigns(){
        let res = axios.post("https://crudcrud.com/api/d4fa4cc280c64d2bb44e971ef17f6b30/Data",myobj)
        return res;
    }

    async function main(){     
        try{
            await assigns();
                ShowNewUser(myobj)
                console.log(" Stored Sucessfull")
        }catch(err){
            console.log(`Error : Something went wrong`);
            console.log(` Error type = ${err}`);
        }
    }     
main();
})


function ShowNewUser(userdetails){
    document.getElementById('email').value='';
    document.getElementById('name').value='';

    if(localStorage.getItem(userdetails.email)!== null){
        //console.log(userdetails.email)
        removeUserFromScreen(userdetails.email)
    }

    let MainNodeVariable=document.getElementById('itemss');
    let childHtml=`<li id=${userdetails._id}> 
                        <b>Name:</b> ${userdetails.name} -<b> Email:</b> ${userdetails.email} 
                        <button onclick=deleteser('${userdetails._id}') class='buttonDly'> Remove </button> 
                        <button onclick=removeuser('${userdetails.email}','${userdetails.name}','${userdetails._id}') class="buttonEdt"> edit </button> 
                    </li> `;
    MainNodeVariable.innerHTML=MainNodeVariable.innerHTML + childHtml;
}



//remove details from the server
function deleteser(userid){
    function deleteapi(){
       let Del= axios
        .delete(`https://crudcrud.com/api/d4fa4cc280c64d2bb44e971ef17f6b30/Data/${userid}`)
        return Del;
    }
    async function main(){
    try{
        await deleteapi();
            removeUserFromScreen(userid);
            console.log("User Deleted From the Server")
    }
    catch(err){
        console.log(`Error : Something went wrong`);
        console.log(` Error type = ${err}`);
    }
    }
main();
}


//remove user from the frontend
function removeUserFromScreen(userid){
    const parentNode=document.getElementById('itemss');
    const childNodeToBeDeleted = document.getElementById(userid);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
}



//edit user details
function removeuser(useremail, username, userid){
    console.log('Edit function called');
    let Namebox=document.getElementById('name');
    let EmailBox=document.getElementById('email');

    console.log(username);
    Namebox.value = username;
    EmailBox.value = useremail;
    deleteser(userid);
}