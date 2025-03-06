let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp; // global variable
//console.log(title,price,taxes,ads,discount,total,count,category,submit)

//get total
function getTotal(){
    //console.log("done")
    if(price.value != ''){
        //+srting convert to int
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML=result;
        total.style.background = '#090';
}else{
    total.innerHTML='';
    total.style.background = '#a00d02';

}
}

//create product
if(localStorage.product != null){
    dataProd = JSON.parse(localStorage.product)
}else{
    dataProd= [];
}

submit.onclick = function(){
    let newProd = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //update
    if(title.value != '' 
        && price.value != '' 
        && category.value != ''
        && newProd.count <100
    ){
    if(mood === 'create'){
         //create count
if(newProd.count > 1 ){
    for(let i = 0; i < newProd.count ; i++ ){
    dataProd.push(newProd);
    }
    }else{
    dataProd.push(newProd);
    }

    }else{
        dataProd[ tmp ] = newProd;
        mood = 'create'
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearData()

}
   

//save data in localstorage
    localStorage.setItem('product' , JSON.stringify(dataProd))
    //console.log(dataProd)
    showData()
}

//clear inputs 
function clearData(){
    title.value = '';   
    price.value = '';   
    taxes.value = '';   
    ads.value = '';   
    discount.value = '';   
    total.innerHTML = '';   
    count.value = '';   
    category.value = '';   
}

//read
function showData(){
    getTotal();

    let table = '';
    for(let i =0; i < dataProd.length ; i++){
        table += `
        <tr>
    <td>${i+1}</td>
    <td>${dataProd[i].title}</td>
    <td>${dataProd[i].price}</td>
    <td>${dataProd[i].taxes}</td>
    <td>${dataProd[i].ads}</td>
    <td>${dataProd[i].discount}</td>
    <td>${dataProd[i].total}</td>
    <td>${dataProd[i].category}</td>
    <td><button onclick = 'updateData( ${i} )' id="update">Update</button></td>
    <td><button onclick = 'deleteData( ${i} )' id="delete">Delete</button></td>
    
        
        </tr>
        `
       // table = dataProd[i]
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataProd.length>0){
        btnDeleteAll.innerHTML = `
    <td><button onclick = 'deleteAll()'>Delete All (${dataProd.length}) </button></td>
        
        `
    }else{
        btnDeleteAll.innerHTML = '';

    }
}
showData()

//delete
function deleteData(i)
{
dataProd.splice(i,1)
localStorage.product = JSON.stringify(dataProd)
showData()

}
function deleteAll(){
    dataProd.splice(0) //from first to last one 'all'
localStorage.clear()
showData()
}

//update
 function updateData(i){
    title.value = dataProd[i].title;
    price.value = dataProd[i].price;
    taxes.value = dataProd[i].taxes;
    ads.value = dataProd[i].ads;
    discount.value = dataProd[i].discount;
    getTotal();
    count.style.display = 'none'; // will disappeare
    category.value = dataProd[i].category;
   submit.innerHTML = 'Update'; 
   mood = 'update';
   tmp = i;
   scroll({
    top: 0 ,
    behavior:'smooth'
   })

   
 }
//search
let searchMood = 'title'; 
function getsearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title'; 
    }else{
        searchMood = 'category'; 

    }
    search.placeholder = 'Search By '+searchMood; 

    search.focus()
    //console.log(searchMood)
    search.value = '';
showData()

}
function searchData(value){
    //console.log(value)
    let table = '';
    for(let i = 0 ; i < dataProd.length ; i++){

    if(searchMood === 'title'){
            if(dataProd[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick = 'updateData( ${i} )' id="update">Update</button></td>
            <td><button onclick = 'deleteData( ${i} )' id="delete">Delete</button></td>
            
                
                </tr>
                `
            }
        
    }else{
            if(dataProd[i].category.includes(value)){
                table += `
                <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick = 'updateData( ${i} )' id="update">Update</button></td>
            <td><button onclick = 'deleteData( ${i} )' id="delete">Delete</button></td>
            
                
                </tr>
                `
            
        }
    }
    document.getElementById('tbody').innerHTML = table;
    }
}
//clean data

