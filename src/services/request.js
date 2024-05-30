class Request {
  static getRequest = async (url) => {
    const request = await fetch(url);
    const result = await request.json();

    return result;
  };

  static postRequest = async (url, body) => {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body,
    });
    const result = await request.json();

    return result;
  };
}

export default Request;
