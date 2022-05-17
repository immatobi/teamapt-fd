let body = {};

body.changeBackground = (cn) => {

    const elem = document.querySelector('.body');

    if(elem){
        elem.classList.add(cn);
    }

}


export default body;