let usdToUah;
function current() {
  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    } else {
      return await res.json();
    }
  };
  
  
  getResource('http://localhost:3000/usdToUah')
    .then(data => {
      usdToUah = data;
      usdToUah = usdToUah.transfer;
    });
}
current();

export default usdToUah;