// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};


// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Create various p Aequor
function pAequorFactory (specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,

    // method to change the first DNA base of the specimen. The base cannot be the same twice in a row
    mutate() {
      let dnaBases = ['A', 'T', 'C', 'G'];
      dnaBases = dnaBases.filter(item => item !== dna[0])
      dna.shift();
      dna.unshift(dnaBases[Math.floor(Math.random() * 3)]);
      return dna;
    },

    // method to compare the DNA between the current specimen and another one. Return the % of common
    compareDNA(anotherpAequor) {
      let commonDNA = 0;
      for (let i = 0; i < 15; i++) {
        if(dna[i] === anotherpAequor.dna[i]) {
          commonDNA++;  
        }
      }
      commonDNA /= 15;
      commonDNA *= 100;
      console.log(`Specimen ${specimenNum} and specimen ${anotherpAequor.specimenNum} have ${commonDNA.toFixed(2)}% DNA in common.`); 
    },

    // method to check if the current specimen will be able to survive and return boolean
    willLikelySurvive() {
      let count;
      const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
      count = countOccurrences(dna, 'C') + countOccurrences(dna, 'G');
      countPour = count / 15 * 100;
      if(countPour >= 60) {
        return true;
      } else {
        return false;
      }
    },
  }
};



let specimen1 = pAequorFactory(1, mockUpStrand());
let specimen2 = pAequorFactory(2, mockUpStrand());
specimen1.compareDNA(specimen2);



let specimensToStudy = [];

// function which will generate 30 specimens able to survive
function generateSpecimen () {
  for (let i = 0; specimensToStudy.length < 30; i++) {
    let specimen = [];
    specimen[i] = pAequorFactory(i , mockUpStrand());
    if(specimen[i].willLikelySurvive() === true) {
      specimensToStudy.push(specimen[i]);
    };
  }
  return specimensToStudy;
}

generateSpecimen();
console.log(specimensToStudy);
console.log(specimensToStudy.length);


