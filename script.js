async function analyze() {
  const username = document.getElementById("username").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = "Analyzing...";

  // NOTE: Instagram's API is private. You'd normally need to use a backend proxy to handle scraping.
  // This is a placeholder for the scraping + scoring logic.

  // Simulated data - mock following list
  const followingList = [
    "cnn", "ocasio2018", "gretathunberg", "npr", // progressive
    "foxnews", "realcandaceo", "benshapiro", "prageru" // conservative
  ];

  const progressiveList = ["cnn", "ocasio2018", "gretathunberg", "npr", "aoc", "berniesanders"];
  const conservativeList = ["foxnews", "benshapiro", "prageru", "realcandaceo", "charliekirk11"];

  let progressiveScore = 0;
  let conservativeScore = 0;

  followingList.forEach(acc => {
    if (progressiveList.includes(acc.toLowerCase())) progressiveScore += 1;
    if (conservativeList.includes(acc.toLowerCase())) conservativeScore += 1;
  });

  const total = progressiveScore + conservativeScore;
  let resultText = `Progressive Score: ${progressiveScore}\nConservative Score: ${conservativeScore}\n`;

  if (total === 0) {
    resultText += "Not enough political accounts followed to determine lean.";
  } else if (progressiveScore > conservativeScore) {
    resultText += "Final Result: Leans Progressive.";
  } else if (conservativeScore > progressiveScore) {
    resultText += "Final Result: Leans Conservative.";
  } else {
    resultText += "Final Result: Neutral.";
  }

  resultDiv.innerText = resultText;
}
