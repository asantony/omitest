const PostData = function () {
    this.postdatatoServer = (postUrl, datatoappend, respondonSuccess, respondonFailure) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datatoappend)
        }
        fetch(postUrl, requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    respondonFailure(error)
                    return;
                }
                respondonSuccess(response)
            })
            .catch(error => {
                respondonFailure(error)
            });
    }
}

export default PostData
