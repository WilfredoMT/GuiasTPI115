//MT20015 - Wilfredo Jose Mancia Tejada - TPI115 - 61b
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
		
	}
	return code;
}   
	  var orden=0;
	  var obj;
	  /*
	  var datosAgregar=
	  {
        image: "xd",
        price: "cdfdf",
        title: "cdcd",
        category: "eletronicos",
        description: "cvdfcd"
	  }
	  */
	  
	function agregarProducto()
	{
		javascript: console.log("not");
		var image=document.getElementById("imagen").value;
	    var price=document.getElementById("precio").value;
	    var title=document.getElementById("titulo").value;
	    var description=document.getElementById("descripcion").value;
	    var category=document.getElementById("categoria").value;
  
	   
	  // validar
if(image=='' || price=='' || title=='' || category=='' || description==''){
	alert("Llenar todos los campos");
}
else{
	const formData = new FormData();
    formData.append('image', image);
    formData.append('price', price);
    formData.append('title', title);
	formData.append('description', description);
    formData.append('category', category);

	var addresult;
	fetch("https://retoolapi.dev/JE2Jss/productos",
	{ method:"POST",
	  body: JSON.stringify(
		{
			image:image,
			price:price,
			title:title,
			description:description,
			category:category
		}
	  ),
	  headers: {
		 'Accept': 'application/json',
		 'Content-type': 'application/json; charset=UTF-8',
	  }
	}
	
	)
	
	.then(response=>response.json())
	
	.then(data=>addresult=data)
	alert("Subido correctamente")
	.then(obtenerProductos());
}



	}

	function borrarDatos()
	{
		var id = document.getElementById("borrar").value;
		console.log('element clicked');
		console.log(id);
		fetch('https://retoolapi.dev/JE2Jss/productos/' + id, 
		{
		method: 'DELETE',
		})
		.then(alert('Hecho'))
		.then(res=>res.json())
		.then(obtenerProductos()) 

	}

	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");   
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		}
	}

//funcion extra
function verInfo()
{
	document.getElementById("info").innerHTML = "Salida de texto por Javascript: GL01 y GT01"
}



// /*
function obtenerProductos() 
{
	fetch('https://retoolapi.dev/JE2Jss/productos')
	.then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
						producto.price=parseFloat(producto.price)
					}
				);
				listarProductos(data)})
	
}
// */
/*
function obtenerProductos() {
	fetch('https://retoolapi.dev/u9HlL9/productos')
		  .then(res=>res.json())
		  .then(data=>
		    {
				productos=data;
		        listarProductos(data)
		    }
		)
}
*/
	  

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}