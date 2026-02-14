document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");

  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");

  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");

  const cardStatsContainer = document.querySelector(".stats-cards");

  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username should not be empty!!");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid Username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;

      const targetUrl = "https://leetcode.com/graphql/";
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";

      const myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");

      const graphql = JSON.stringify({
        query: `
        query userSessionProgress($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
              totalSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
        `,
        variables: { username },
      });

      const response = await fetch(proxyUrl + targetUrl, {
        method: "POST",
        headers: myHeaders,
        body: graphql,
      });

      if (!response.ok) {
        throw new Error("Unable to fetch User details!");
      }

      const parsedData = await response.json();
      console.log("Logging data:", parsedData);
      displayUserData(parsedData);
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }

  function displayUserData(parsedData) {
    const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
    const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
    const totalHardQues = parsedData.data.allQuestionsCount[3].count;

    const acStats = parsedData.data.matchedUser.submitStats.acSubmissionNum;

    const solvedTotalQues = acStats[0].count;
    const solvedTotalEasyQues = acStats[1].count;
    const solvedTotalMediumQues = acStats[2].count;
    const solvedTotalHardQues = acStats[3].count;

    console.log("Solved Total:", solvedTotalQues);
    console.log("Easy:", solvedTotalEasyQues);
    console.log("Medium:", solvedTotalMediumQues);
    console.log("Hard:", solvedTotalHardQues);

    updateProgress(
      solvedTotalEasyQues,
      totalEasyQues,
      easyLabel,
      easyProgressCircle
    );
    updateProgress(
      solvedTotalMediumQues,
      totalMediumQues,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(
      solvedTotalHardQues,
      totalHardQues,
      hardLabel,
      hardProgressCircle
    );

    const submissionStats =
      parsedData.data.matchedUser.submitStats.totalSubmissionNum;

    const cardData = [
      {
        label: "Overall Submissions",
        value: submissionStats[0].count,
      },
      {
        label: "Overall Easy Submissions",
        value: submissionStats[1].count,
      },
      {
        label: "Overall Medium Submissions",
        value: submissionStats[2].count,
      },
      {
        label: "Overall Hard Submissions",
        value: submissionStats[3].count,
      },
    ];

    console.log("Data of cards:", cardData);

    // Optional rendering (if you want cards visible)
    cardStatsContainer.innerHTML = "";
    cardData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "stat-card";
      card.innerHTML = `<h4>${item.label}</h4><p>${item.value}</p>`;
      cardStatsContainer.appendChild(card);
    });
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("User Name:", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});
