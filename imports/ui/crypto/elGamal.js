const JSBN =  require('jsbn');
const BigInt = JSBN.BigInteger;
const Utils = require('./utils');

exports.generateKeyPairAsync = async function (primeBits = 32) {
  return new Promise(async (resolve, reject) =>{
    try{

      let qBigInt;
      let pBigInt;

      do {
        qBigInt = await Utils.getBigPrimeAsync(primeBits - 1);
        pBigInt = qBigInt.shiftLeft(1).add(BigInt.ONE);
      } while (!pBigInt.isProbablePrime()); // Ensure that p is a prime

      let gBigInt;
      do {
        // Avoid g=2 because of Bleichenbacher's attack
        gBigInt = await Utils.getRandomBigIntAsync(new BigInt('3'), pBigInt);
      } while (
        gBigInt.modPowInt(2, pBigInt).equals(BigInt.ONE) ||
        gBigInt.modPow(qBigInt, pBigInt).equals(BigInt.ONE) ||
        // g|p-1
        pBigInt.subtract(BigInt.ONE).remainder(gBigInt).equals(BigInt.ZERO) ||
        // g^(-1)|p-1 (evades Khadir's attack)
        pBigInt.subtract(BigInt.ONE).remainder(gBigInt.modInverse(pBigInt)).equals(BigInt.ZERO)
        );

      // Generate private key
      const xBigInt = await Utils.getRandomBigIntAsync(
        Utils.BIG_TWO,
        pBigInt.subtract(BigInt.ONE)
      );

      // Generate public key
      const ABigInt = gBigInt.modPow(xBigInt, pBigInt);

            console.log("\nPrivate Key Sk =", xBigInt.toString(10), "\n"); // PRIVATE KEY IS KEPT SECRET

            console.log("Public Key Pk =", {
              pBigInt: pBigInt.toString(10),
              gBigInt: gBigInt.toString(10),
              ABigInt: ABigInt.toString(10)
            }, "\n"); // PUBLIC KEY IS MADE PUBLIC

      resolve({
        p: pBigInt.toString(10),
        g: gBigInt.toString(10),
        A: ABigInt.toString(10),
        x: xBigInt.toString(10),
      });

    } catch(e){reject(e)}
  })
};

exports.encryptMessage = async function (m, p, g, A){
  return new Promise(async (resolve, reject) => {
    try{

      console.log(m)
      console.log(p)
      console.log(g)
      console.log(A)

      const pBigInt  = new BigInt(p, 10);

      const gBigInt  = new BigInt(g, 10);

      const ABigInt  = new BigInt(A, 10);

      const mBigInt  = new BigInt(m.toString(10), 10);

      const kBigInt = await Utils.getRandomNbitBigIntAsync(32); // EPHEMERAL KEY

      console.log("Ephemeral Key k = ", kBigInt.toString(10) + "\n");

      let c1BigInt = gBigInt.modPow(kBigInt, pBigInt);// CIPHERTEXT 1

      let c2BigInt;

      c2BigInt = mBigInt.multiply(ABigInt.modPow(kBigInt, pBigInt)).mod(pBigInt); // CIPHERTEXT 2

      console.log("Ciphertext (c1, c2) =", c1BigInt.toString(10), c2BigInt.toString(10), "\n");

      resolve({
        c1: c1BigInt.toString(10),
        c2: c2BigInt.toString(10),
      })

    } catch(e) { reject(e) }
  })
};