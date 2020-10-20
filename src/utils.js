import { LEVELS } from './config'
const { EASY, MEDIUM, HARD } = LEVELS 

function randomInt() {
  // Max excluded
  let min = 0
  let max = 1
  if (arguments.length == 1) {
    max = arguments[0]
  } else if (arguments.length > 1) {
    min = arguments[0]
    max = arguments[1]
  }

  return Math.floor(Math.random() * (max - min)) + min;
}


function randomSample(population, k) {
  let sample = new Array(k)
  for (let i = 0; i < k; i++) {
    let rnd_pos = randomInt(population.length)
    sample[i] = population[rnd_pos]
    population.splice(rnd_pos, 1)
  }
  return sample
}

function range(start, end) {
  // End included
  if (end < start) {
    return []
  }
  //From: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}


function makeEasyGame(n_arms) {
  let probs = randomSample([0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4], n_arms)
  probs[randomInt(n_arms)] = 0.8
  return probs
}


function makeHardGame(n_arms) {
  let probs = new Array(n_arms)

  let best_prob = randomSample([0.7, 0.8, 0.9], 1)[0]
  let distances = randomSample([0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.6], n_arms)


  function newProb(best, distance) {
    return Math.round((best - distance) * 100) / 100
  }

  for (let i = 0; i < n_arms; i++) {
    probs[i] = newProb(best_prob, distances.pop())
  }


  let two_rnd_pos = randomSample(range(0, n_arms - 1), 2)

  //Close to best arm
  probs[two_rnd_pos[0]] = newProb(best_prob, randomSample([0.1, 0.2, 0.2, 0.3], 1)[0])

  //Winning arm
  probs[two_rnd_pos[1]] = best_prob

  return probs
}


export function makeGame(level) {
  switch (level) {
    case EASY:
      return makeEasyGame(3)
    case MEDIUM:
      return makeEasyGame(5)
    case HARD:
      return makeHardGame(5)
    default:
      return []
  }
}


function getArmReward(probs, arm_position) {
  let arm_prob = probs[arm_position]

  if (Math.random() < arm_prob) {
    return 1
  } else {
    return 0
  }

}