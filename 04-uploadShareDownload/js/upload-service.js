
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");// gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)//encode the instance of certain characters in the url
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        //create a link that on click will make a post in facebook with the image we uploaded
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    //send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    //pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //gets the resualt and extarct the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}




