export const PostWithoutAuth = (url, body) => {

    var request = fetch(url,  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "application/json",
        },
        body : JSON.stringify(body),
      })

    return request
}

export const PostingWithoutAuth = (url, body) => {

  var request = fetch(url,  {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
      body : JSON.stringify(body),
    })

  return request
}
