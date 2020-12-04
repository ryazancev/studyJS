const body = document.body;


setInterval(function() {
    const date = new Date();
    const div = document.createElement('div');
    div.textContent = date;
    
}, 1000)



// function clock(){
//     const date = new Date(),
//         hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
//         minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
//         seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
//     console.log(hours + ':' + minutes + ':' + seconds);
// }
// setInterval(clock, 1000);