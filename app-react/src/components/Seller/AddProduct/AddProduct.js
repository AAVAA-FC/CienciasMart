import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function AddProduct({ id_seller }){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const submitHandler = async(event) => {
      event.preventDefault();
      
      const formData = new FormData();
      formData.append('id_seller',id_seller);
      formData.append('name',name);
      formData.append('description',description);
      formData.append('stock',stock);
      formData.append('cellphone',cellphone);
      formData.append('photo',photoBase64);
      formData.append('category',category);
      formData.append('price',price);

      try{  
	  const response = await fetch(`http://127.0.0.1:5000/api/sellers/addproduct/${id_seller}`, {
              method: 'POST',
	      headers:{
		  'Content-Type': 'application/json'
	      },
              body: JSON.stringify(formData)
          });

	  const response_data = await response.json();

	  if (response.ok){
	      console.log(response);
	      setMessage("Registro completado"); //Envia a pagina buena
	  } else {
	      setMessage(response_data.error);
	  }
      } catch (error){
	  console.error("Error:", error);
	  setMessage("Error. Por favor intenta más tarde"); //Mandar a pagina de rror
      }
  };

    const handleFileChange = (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onloadend = () => {
	    setPhotoBase64(reader.result);
	};
	if (file) {
	    reader.readAsDataURL(file);
	}
    };  

    return(
     <div> 
	<div>
	    <form onSubmit={submitHandler}>
		<div>
		    <label htmlFor="name">Nombre del producto:</label>
		    <input type="text" id="name" name="name" onChange={(event) => setName(event.target.value)} required />
		</div>
		<div>
		    <label htmlFor="price">Precio:</label>
		    <input type="number" id="price" name="price" onChange={(event) => setPrice(event.target.value)} step="0.01" min="0" required />
		</div>
		<div>
		    <label htmlFor="stock">Stock:</label>
		    <input type="number" id="stock" name="stock" onChange={(event) => setStock(event.target.value)}  min="1" required />
		</div>
		<div>
		    <label htmlFor="category">Categoría:</label>
		    <input type="text" id="category" name="category" onChange={(event) => setCategory(event.target.value)} required />
		</div>
		<div>
		    <label htmlFor="description">Características:</label>
		    <textarea id="description" name="description" onChange={(event) => setDescription(event.target.value)} rows="4" required></textarea>
		</div>
		<div>
		    <label htmlFor="photo">Foto:</label>
		    <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required />
		</div>
		<button type="submit">Publicar</button>
	    </form>
           </div>
        </div> 
    );
}

export default AddProduct;
