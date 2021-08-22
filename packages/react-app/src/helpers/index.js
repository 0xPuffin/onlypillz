export { default as Transactor } from "./Transactor";
export { default as ipfs } from "./ipfs";


export function standardizeLink (link) {  
    if (link) {
        link = link.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/")
        return link.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else {
        return "";
    }
  };

  export function ipfsLinkFromHash(hash) {
      return "https://ipfs.io/ipfs/"+hash;
  }

  export function getURLParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  }