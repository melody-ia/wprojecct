const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk');
const querystring = require('querystring');
const data = querystring.parse( process.argv[2] || '', '+');

// Create Auth object
const auth = new Auth({
  projectId: "f54c06f6ed4647c3a1659249b976333b",
  secretId: "a4eaa9112a474b9aad672cd0b5da0069",
  privateKey: data.key,
  // privateKey: '0x7bda59b7bb88c939813a6a24ce54e9d0c87758617296487b5a11d482e2c67146',
  chainId: 1,
});

// Instantiate SDK
const sdk = new SDK(auth);

const getCollectionsByWallet =(walletAddress)=>{
  return sdk.api.getNFTs({
      publicAddress: walletAddress,
      includeMetadata:true
  });
}

(async() => {
  try {
      const result = await getCollectionsByWallet(data.wallet);
      // const result = await getCollectionsByWallet('0xD7c5c74c86B1FC9Bfad6e8DCD1E221f4AE02cD06');
      console.log(result['assets'][0]['metadata']['image']);

  } catch (error) {
      console.log(error);
  }
})();