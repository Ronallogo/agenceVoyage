import Swal from 'sweetalert2'




export function _confirm(message : string){
  Swal.fire({
    title: "Confirmation",
    text : message ,
    icon : "success",
    showConfirmButton : false ,


    showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
    }

  });
}






