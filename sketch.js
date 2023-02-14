var fs = require('fs');
const { parse } = require('json2csv');

skinColorGenes = ['white','mixed', 'black'];
function skinColorGene(){
  if (Math.floor(Math.random()*2)==0){
    this.isDominant = false;} else {this.isDominant = true;
  }
  this.genome = skinColorGenes[Math.floor(Math.random()*skinColorGenes.length)];
}

heightTypeGenes = ['small','medium','tall'];
function heightTypeGene(){
  if (Math.floor(Math.random()*2)==0){
    this.isDominant = false;} else {this.isDominant = true;
  }
  this.genome = heightTypeGenes[Math.floor(Math.random()*heightTypeGenes.length)];
}

eyeColorGenes = ['black','brown','hazel','blue','green','lightBrown','lightBlue','grey'];
function eyeColorGene(){
  if (Math.floor(Math.random()*2)==0){
    this.isDominant = false;} else {this.isDominant = true;
  }
  this.genome = eyeColorGenes[Math.floor(Math.random()*eyeColorGenes.length)];
}

hairColorGenes = ['black','brown','blond','chatain','red'];
function hairColorGene(){
  if (Math.floor(Math.random()*2)==0){
    this.isDominant = false;} else {this.isDominant = true;
  }
  this.genome = hairColorGenes[Math.floor(Math.random()*hairColorGenes.length)];
}

hairTypeGenes = ['straight','wavy','curly','coily'];
function hairTypeGene(){
  if (Math.floor(Math.random()*2)==0){
    this.isDominant = false;} else {this.isDominant = true;
  }
  this.genome = hairTypeGenes[Math.floor(Math.random()*hairTypeGenes.length)];
}

sexGenes = ['x','y'];
function sexGene(){
  if (arguments[0] != undefined){
    this.genome = arguments[0];
  }else{
    this.genome = sexGenes[Math.floor(Math.random()*sexGenes.length)];
  }
}
function humanGenders(firstGene,secondGene){
  if (firstGene.genome==='x' && secondGene.genome==='x'){
    this.humanGender = 'female';
  }else{
    this.humanGender = 'male';
  }
  return this.humanGender;
}

function human(gender,generation){
  this.humanId = uniqueID();
  this.generation = generation;
  this.parentsId = [0,0];
  
  if (gender == 'female'){
    this.sexGenes =[new sexGene('x'),new sexGene('x')]
    this.Gender = 'female';
  }
  else if(gender == 'male'){
    this.sexGenes = [new sexGene('x'),new sexGene('y')];
    this.Gender = 'male';
  }
  else {
    this.sexGenes = [new sexGene(),new sexGene()];
    this.Gender = humanGenders(this.sexGenes[0],this.sexGenes[1]);
  }
  
  this.skinColorGenes=[new skinColorGene(),new skinColorGene()];
  this.humanSkinColor = dominantGenes(this.skinColorGenes[0],this.skinColorGenes[1]);
  
  this.eyeColorGenes=[new eyeColorGene(),new eyeColorGene()];
  this.humanEyeColor = dominantGenes(this.eyeColorGenes[0],this.eyeColorGenes[1]);
  
  this.hairColorGenes=[new hairColorGene(),new hairColorGene()];
  this.humanHairColor = dominantGenes(this.hairColorGenes[0],this.hairColorGenes[1]);
  
  this.hairTypeGenes=[new hairTypeGene(),new hairTypeGene()];
  this.humanHairType = dominantGenes(this.hairTypeGenes[0],this.hairTypeGenes[1]);
  
  this.heightTypeGenes=[new heightTypeGene(),new heightTypeGene()];
  this.humanHeight = dominantGenes(this.heightTypeGenes[0],this.heightTypeGenes[1]);
  
}

function dominantGenes(firstGene,secondGene){
  randomDominantGene = [arguments[0],arguments[1]];
  if (firstGene.isDominant == true && secondGene.isDominant == true) {
    this.dominantGene = randomDominantGene[Math.floor(Math.random()*2)].genome;}
    else if(firstGene.isDominant == true && secondGene.isDominant == false ){
    this.dominantGene = firstGene.genome;
  }else if(firstGene.isDominant == false && secondGene.isDominant == true ){
    this.dominantGene = secondGene.genome;
  }else{
    this.dominantGene = randomDominantGene[Math.floor(Math.random()*2)].genome;
  }
    
  return this.dominantGene;
}

function firstGeneration(firstGenFemalesCount,firstGenMalesCount){
  if(currentGeneration==0){
      for (ii=0; ii<firstGenFemalesCount;ii++){
        population[currentGeneration][ii] = new human('female',currentGeneration);
      }
      for (jj=firstGenFemalesCount;jj<firstGenMalesCount+firstGenFemalesCount;jj++){
        population[currentGeneration][jj] = new human('male',currentGeneration);
      }
  }
}

function nextGeneration(){
  currentPopulation = [... population[currentGeneration]];
  possibleCouples = couplesCount(currentPopulation,currentPopulation.length);
  family = [];
  for(couples = 0;couples < possibleCouples;){
    spouse1 = currentPopulation.splice(randomInt(0,currentPopulation.length),1)[0];
    for (ii=0;ii<currentPopulation.length;ii++){
      if (currentPopulation[ii].Gender != spouse1.Gender){
        if ((spouse1.generation==0 && currentPopulation[ii].generation==0) || !spouse1.parentsId.includes(currentPopulation[ii].parentsId[0]) || !spouse1.parentsId.includes(currentPopulation[ii].parentsId[1])){
          spouse2 = currentPopulation.splice([ii],1)[0];
          numberOfBabies = randomInt(0,5);
          for (baby=0;baby<numberOfBabies;baby++){
            population[currentGeneration+1].push(new reproduction(spouse1,spouse2));
          }
          families[currentGeneration].push([spouse1,spouse2,numberOfBabies]);
          couples++
          break;
        }
      }
    }
  }
  currentGeneration++;
}
function couplesCount(currentPopulation,currentPopulationCount){
  numberOfMales = 0;
  numberOfFemales = 0;
  for (humans=0;humans<currentPopulationCount;humans++){
    if (currentPopulation[humans].Gender == 'male'){numberOfMales++}
    else {numberOfFemales++}    
  }
  rest = Math.abs(numberOfFemales-numberOfMales);
  return (currentPopulationCount-rest)/2;
}

function reproduction(human1, human2){
        this.baby = new human();
        this.baby.parentsId = [human1.humanId, human2.humanId];
        this.baby.sexGenes = [human1.sexGenes[Math.floor(Math.random()*2)],human2.sexGenes[Math.floor(Math.random()*2)]]
        this.baby.Gender = humanGenders(this.baby.sexGenes[0],this.baby.sexGenes[1]);
      
        this.baby.skinColorGenes=[human1.skinColorGenes[Math.floor(Math.random()*2)],human2.skinColorGenes[Math.floor(Math.random()*2)]];
        this.baby.humanSkinColor = dominantGenes(this.baby.skinColorGenes[0],this.baby.skinColorGenes[1]);
      
        this.baby.eyeColorGenes=[human1.eyeColorGenes[Math.floor(Math.random()*2)],human2.eyeColorGenes[Math.floor(Math.random()*2)]];
        this.baby.humanEyeColor = dominantGenes(this.baby.eyeColorGenes[0],this.baby.eyeColorGenes[1]);
      
        this.baby.hairColorGenes=[human1.hairColorGenes[Math.floor(Math.random()*2)],human2.hairColorGenes[Math.floor(Math.random()*2)]];
        this.baby.humanHairColor = dominantGenes(this.baby.hairColorGenes[0],this.baby.hairColorGenes[1]);

        this.baby.hairTypeGenes=[human1.hairTypeGenes[Math.floor(Math.random()*2)],human2.hairTypeGenes[Math.floor(Math.random()*2)]];
        this.baby.humanHairType = dominantGenes(this.baby.hairTypeGenes[0],this.baby.hairTypeGenes[1]);

        this.baby.heightTypeGenes=[human1.heightTypeGenes[Math.floor(Math.random()*2)],human2.heightTypeGenes[Math.floor(Math.random()*2)]];
        this.baby.humanHeight = dominantGenes(this.baby.heightTypeGenes[0],this.baby.heightTypeGenes[1]);
      
        this.baby.generation = human2.generation + 1;
        return this.baby;    
}

function simulation(initialFemales,initialMales,maxGenerations){
  currentGeneration = 0;
  maxGenerations = maxGenerations;
  families = [[]];
  population = [[]];
  firstGeneration(initialFemales,initialMales);
  while(currentGeneration<maxGenerations){
    population.push([]);
    families.push([]);
    nextGeneration();
    console.log('generation :'+currentGeneration+'generated');
  }
}

simulation(10,10,10);



  jsonPopulation = JSON.stringify(population);
  jsonFamilies = JSON.stringify(families);

  headerPopulation1 = "humanId,generation,parent1Id,parent2Id,sexGenome1,sexGenome2,gender,";
  headerPopulation2 = "skinColorGenome1,skinColorGenome1isDominant,skinColorGenome2,skinColorGenome2isDominant,humanSkinColor,";
  headerPopulation3 = "eyeColorGenome1,eyeColorGenome1isDominant,eyeColorGenome2,eyeColorGenome2isDominant,humanEyeColor,";
  headerPopulation4 = "hairColorGenome1,hairColorGenome1isDominant,hairColorGenome2,hairColorGenome2isDominant,humanHairColor,";
  headerPopulation5 = "hairTypeGenome1,hairTypeGenome1isDominant,hairTypeGenome2,hairTypeGenome2isDominant,humanHairType,";
  headerPopulation6 = "heightTypeGenome1,heightTypeGenome1isDominant,heightTypeGenome2,heightTypeGenome2isDominant,humanHeightType";
  headerPopulation = headerPopulation1+headerPopulation2+headerPopulation2+headerPopulation3+headerPopulation4+headerPopulation5+headerPopulation6;

  populationJson = [];
  for (ii in population){
    for (jj in population[ii]){
      dataJson = {
        humanId: population[ii][jj].humanId,
        generation : population[ii][jj].generation,
        parent1Id: population[ii][jj].parentsId[0],
        parent2Id: population[ii][jj].parentsId[1],
        sexGenome1:population[ii][jj].sexGenes[0].genome,
        sexGenome2:population[ii][jj].sexGenes[1].genome,
        gender: population[ii][jj].Gender,
        skinColorGenome1: population[ii][jj].skinColorGenes[0].genome,
        skinColorGenome1isDominant : population[ii][jj].skinColorGenes[0].isDominant,
        skinColorGenome2: population[ii][jj].skinColorGenes[1].genome,
        skinColorGenome2isDominant : population[ii][jj].skinColorGenes[1].isDominant,
        humanSkinColor:population[ii][jj].humanSkinColor,
        eyeColorGenome1: population[ii][jj].eyeColorGenes[0].genome,
        eyeColorGenome1isDominant : population[ii][jj].eyeColorGenes[0].isDominant,
        eyeColorGenome2: population[ii][jj].eyeColorGenes[1].genome,
        eyeColorGenome2isDominant : population[ii][jj].eyeColorGenes[1].isDominant,
        humanEyeColor:population[ii][jj].humanEyeColor,
        hairColorGenome1: population[ii][jj].hairColorGenes[0].genome,
        hairColorGenome1isDominant : population[ii][jj].hairColorGenes[0].isDominant,
        hairColorGenome2: population[ii][jj].hairColorGenes[1].genome,
        hairColorGenome2isDominant : population[ii][jj].hairColorGenes[1].isDominant,
        humanHairColor:population[ii][jj].humanHairColor,
        hairTypeGenome1: population[ii][jj].hairTypeGenes[0].genome,
        hairTypeGenome1isDominant : population[ii][jj].hairTypeGenes[0].isDominant,
        hairTypeGenome2: population[ii][jj].hairTypeGenes[1].genome,
        hairTypeGenome2isDominant : population[ii][jj].hairTypeGenes[1].isDominant,
        humanHairType:population[ii][jj].humanHairType,
        heightTypeGenome1: population[ii][jj].heightTypeGenes[0].genome,
        heightTypeGenome1isDominant : population[ii][jj].heightTypeGenes[0].isDominant,
        heightTypeGenome2: population[ii][jj].heightTypeGenes[1].genome,
        heightTypeGenome2isDominant : population[ii][jj].heightTypeGenes[1].isDominant,
        humanHeightType:population[ii][jj].humanHeight,
      }
      populationJson.push(dataJson);
    }
  }

  headerFamilies = 'coupleGeneration,coupleParent1,coupleParent2,coupleChildrensCount';

  familiesJson = [];
  for (ii in families){
    for (jj in families[ii]){
      dataJson = {
        coupleGeneration : families[ii][jj][0].generation,
        coupleParent1 : families[ii][jj][0].humanId,
        coupleParent2 : families[ii][jj][1].humanId,
        coupleChildrensCount : families[ii][jj][2]
      }
      familiesJson.push(dataJson);
    }
  }

  const csvPopulation = parse(populationJson, { delimiter: ',', header: headerPopulation });

  fs.writeFile("population.txt", csvPopulation, function(err) {
    if (err) {
        console.log(err);
    }
  });

  
  const csvFamilies = parse(familiesJson, { delimiter: ',', header: headerFamilies });

  fs.writeFile("families.txt", csvFamilies, function(err) {
    if (err) {
        console.log(err);
    }
  });


  




function uniqueID() {
return Math.floor(Math.random() * Date.now())
}

function randomInt(min,max){
  return Math.floor(Math.random()*(max - min) + min);
}

