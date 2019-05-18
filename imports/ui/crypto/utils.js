//const Bluebird = require('bluebird');
//const P = Bluebird.Promise;
// const crypto = require('crypto');
// import { randomBytes } from 'react-native-randombytes'
import { Random } from 'meteor/random'
const JSBN =  require('jsbn');
const BigInt = JSBN.BigInteger;
// Promise.promisifyAll(crypto);

exports.BIG_TWO = new BigInt('2');

/**
 * Trims a BigInt to a specific length.
 * @param {BigInt} bi BigInt to be trimmed.
 * @param {number} bits Number of bits in the output.
 * @returns {BigInt}
 */
function trimBigInt(bi, bits) {
  const trimLength = bi.bitLength() - bits;
  return trimLength > 0 ? bi.shiftRight(trimLength) : bi;
}

/**
 * Returns a random BigInt with the given amount of bits.
 * @param {number} bits Number of bits in the output.
 * @returns {BigInt}
 */
exports.getRandomNbitBigIntAsync = async function(bits) {
  return new Promise(async (resolve, reject) => {
    try{
      // Generate random bytes with the length of the range
      // const buf = await crypto.randomBytesAsync(Math.ceil(bits / 8));

      const charactersCount = Math.ceil(bits / 8);

      const buf = Random.secret(charactersCount); // DIVIDE BY 8 TO GET NB CHARACTERS FROM NB BITS
      // WARNING: USING Meteor Random HERE^, IS IT SECURE?

      const bi = new BigInt(buf).abs(); // NO BASE?

      // Trim the result and then ensure that the highest bit is set
      const result = trimBigInt(bi, bits).setBit(bits - 1);

      //console.log("______RANDOM 2_______")
      //console.log(result.toString(10));

      resolve(result);

    } catch(e) { reject(e) }
  })
};

exports.generateRandomNbitBigIntListAsync = async function(bits, length, index, list){
  return new Promise(async (resolve, reject) => {
    try{
      if(index < length){
        let randomInteger = await exports.getRandomNbitBigIntAsync(bits);
        list.push(randomInteger);
        resolve(exports.generateRandomNbitBigIntListAsync(bits, length, index + 1, list));
      } else {
        resolve(list);
      }
    } catch(e) { reject(e) }
  })
};

exports.generateRandomNbitBigIntListWithRandomTailLengthAsync = async function(bits, maxTailBitLength, length, index, list){
  return new Promise(async (resolve, reject) => {
    try{
      if(index < length){
        let tailLength = await exports.getRandomBigIntAsync(new BigInt("0", 10), new BigInt(maxTailBitLength.toString(10), 10));
        let randomInteger = await exports.getRandomNbitBigIntAsync(bits + parseInt(tailLength.toString(10), 10));
        list.push(randomInteger);
        resolve(exports.generateRandomNbitBigIntListWithRandomTailLengthAsync(bits, maxTailBitLength, length, index + 1, list));
      } else {
        resolve(list);
      }
    } catch(e) { reject(e) }
  })
};

/**
 * Returns a random BigInt in the given range.
 * @param {BigInt} min Minimum value (included).
 * @param {BigInt} max Maximum value (excluded).
 * @returns {BigInt}
 */
exports.getRandomBigIntAsync = async function(min, max) {
  const range = max.subtract(min).subtract(BigInt.ONE);

  let bi;
  do {
    // Generate random bytes with the length of the range
    // const buf = await crypto.randomBytesAsync(Math.ceil(range.bitLength() / 8));

    const buf = Random.secret(range.bitLength() / 8); // DIVIDE BY 8 TO GET NB CHARACTERS FROM NB BITS

    // Offset the result by the minimum value
    bi = new BigInt(buf).abs().add(min);



  } while (bi.compareTo(max) >= 0);
  // console.log("______RANDOM 1_______")
  // console.log(bi.toString(10));

  // Return the result which satisfies the given range
  return bi;
};

/**
 * Returns a random prime BigInt value.
 * @param {number} bits Number of bits in the output.
 * @returns {BigInt}
 */
exports.getBigPrimeAsync = async function(bits) {
  // Generate a random odd number with the given length
  let bi = (await exports.getRandomNbitBigIntAsync(bits)).or(BigInt.ONE);

  console.log("BI");
  console.log(bi.toString(10));

  while (!bi.isProbablePrime()) {
    bi = bi.add(exports.BIG_TWO);
  }

  // Trim the result and then ensure that the highest bit is set
  return trimBigInt(bi, bits).setBit(bits - 1);
};

/**
 * Parses a BigInt.
 * @param {BigInt|string|number} obj Object to be parsed.
 * @returns {?BigInt}
 */
exports.parseBigInt = function(obj) {
  if (obj === undefined) return null;

  return obj instanceof Object ? obj : new BigInt(`${obj}`);
};

/**
 * Computes the discrete base g logarithm of g^m  modulo p.
 * @param {BigInt} g^m.
 * @param {BigInt} g.
 * @param {BigInt} p.
 * @param {BigInt} maximum possible m.
 * @returns {?BigInt}
 */
exports.babyStepsGiantStepsDiscreteLog =  async function (gPowMBigInt, gBigInt, pBigInt, maxMBigInt) {
  return new Promise(async (resolve, reject) => {
    try{

      let result;


      let babySteps = {};
      let babyStep = BigInt(1, 10);

      for(let r = 0; BigInt(r, 10).leq(maxMBigInt); r++){
        babySteps[babyStep] = BigInt(r, 10);
        babyStep = babyStep.multiply(gBigInt).remainder(pBigInt)
      }

      let giantStride = gBigInt.pow(pBigInt.minus(BigInt(2, 10)).multiply(maxMBigInt)).remainder(pBigInt);

      let giantStep = gPowMBigInt;

      for(let q= 0; BigInt(q, 10).leq(maxMBigInt); q++){
        if(babySteps[giantStep]){
          result = BigInt(q, 10).multiply(maxMBigInt).add(babySteps[giantStep]);
          resolve(result)
        } else {
          giantStep = giantStep.add(giantStride)
        }
      }

      resolve(BigInt(-1));

    } catch(e){ reject(e) }
  })
};


exports.computeMaxNbAggregatedVotes = function(maxPlainTextBigInt, bitLength){

  let product = new BigInt("1", 10);
  let i =0;
  while(product.bitLength() < bitLength){
    product = product.multiply(maxPlainTextBigInt);
    i += 1;
  }
  return i-1;
};
