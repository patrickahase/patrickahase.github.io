// create bool for modal's open state
let modalIsOpen = true;

function toggleModalOpen(){
  // get reference to modal parent element
  // i can get this by class name because I know only 1 element has that class
  let modal = document.getElementsByClassName("modalWrapper")[0];
  if(modalIsOpen){
    modalIsOpen = false;
    modal.style.display = 'none';
  } else {
    modalIsOpen = true;
    modal.style.display = 'flex';
  }
}