
let btn=document.querySelector('.btn')
let namebox=document.querySelector('#name')
let emailbox=document.querySelector('#email')
let i=0;


//scan all existing element from server 
window.addEventListener("DOMContentLoaded",async() => {
    console.log("Testing...");

        
        try{
            let response=await axios.get("http://localhost:4000/admin/getall");
            let a = response.data;
    
            a.forEach((element)=>{
                ShowNewUser(element)
            }); 
        }
        catch(err){   
            console.log(`Error : Something went wrong`);
            console.log(` Error type = ${err}`);
        }
    

});


//Adding new user details
btn.addEventListener('click',async(e)=>{
    e.preventDefault();
    myobj={
        title: namebox.value,
        email: emailbox.value,
        };
        try{
             let res = await axios.post("http://localhost:4000/admin/adduser",myobj);   
             ShowNewUser(res.data)
                console.log(" Stored Sucessfull")
        }catch(err){
            console.log(`Error : Something went wrong`);
            console.log(` Error type = ${err}`);
        }
     

})



function ShowNewUser(userdetails){
    document.getElementById('email').value='';
    document.getElementById('name').value='';

    if(localStorage.getItem(userdetails.email)!== null){
        //console.log(userdetails.email)
        removeUserFromScreen(userdetails.email)
    }

    let MainNodeVariable=document.getElementById('itemss');
    let childHtml=`<li id=${userdetails.id}> 
                        <b>Name:</b> ${userdetails.title} -<b> Email:</b> ${userdetails.email} 
                        <button onclick=deleteser('${userdetails.id}') class='buttonDly'> Remove </button> 
                        <button onclick=removeuser('${userdetails.email}','${userdetails.title}','${userdetails.id}') class="buttonEdt"> edit </button> 
                    </li> `;
    MainNodeVariable.innerHTML=MainNodeVariable.innerHTML + childHtml;
}



//remove details from the server
function deleteser(userid){
    function deleteapi(){
       let Del= axios
        .post(`http://localhost:4000/admin/deleteuser`,{id: userid})
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