// const allLikeButton =document.querySelectorAll(".like-btn");//for many button

// async function likeButton(productId,btn) {
//     try{
//         let response=await axios({
//             method: 'post',
//             url: `/product/${productId}/like`,
//             headers:{'X-Requested-With':'XMLHttpRequest'},
// // for ajax reauest i have use haeder-XMLHttpRequest
           
//           });
//         //   far-white blank colour and fas=red
//           if(btn.children[0].classList.contains('fas')){
//             btn.children[0].classList.remove('fas')
//             btn.children[0].classList.add('far')
            
//           }
//           else{
//             btn.children[0].classList.remove('far')
//             btn.children[0].classList.add('fas')
//           }
//         //   console.log(response);
//     }
//     catch(e){
//         // console.log(e);
//         //this is use a redirect 
//         window.location.replace('/login'); //for error redirect but this is backend part res.redirect but no obj
//         //since we use this locatioin-replace login
//         // console.log(e.message);
      
//     }
    
// }





// for(let btn of allLikeButton){
//     btn.addEventListener('click',()=>{
//         let productId=btn.getAttribute('product-id');
//         likeButton(productId,btn);

//     })
// }



const allLikeButton = document.querySelectorAll(".like-btn");

async function likeButton(productId, btn) {
    try {
        let response = await axios({
            method: 'post',
            url: `/product/${productId}/like`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        // Toggle the heart icon color (red or white)
        if (btn.children[0].classList.contains('fas')) {
            btn.children[0].classList.remove('fas');
            btn.children[0].classList.add('far');
        } else {
            btn.children[0].classList.remove('far');
            btn.children[0].classList.add('fas');
        }

        console.log(response.data);  // Log the success message

    } catch (e) {
        // If the user is not logged in, redirect to the login page
        if (e.response && e.response.status === 401) {
            window.location.replace('/login'); // Redirect to login page
        } else {
            console.error('Error occurred: ', e.message);
            alert('An error occurred. Please try again later.');
        }
    }
}

for (let btn of allLikeButton) {
    btn.addEventListener('click', () => {
        let productId = btn.getAttribute('product-id');
        likeButton(productId, btn);
    });
}



//for removing cart item
const allRemoveButtons = document.querySelectorAll('.btn-danger');

allRemoveButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        const itemId = button.getAttribute('data-item-id'); // Assuming data-item-id is added to the button
        try {
            // Send request to the backend to remove the item
            const response = await axios.post(`/cart/remove/${itemId}`);

            // Remove the item from the DOM if successful
            if (response.status === 200) {
                button.closest('.card').remove(); // Remove the card element from the DOM
                alert('Item removed successfully');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            alert('An error occurred while removing the item. Please try again.');
        }
    });
});

