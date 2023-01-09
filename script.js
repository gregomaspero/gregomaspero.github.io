const storyDiv = document.getElementById("story");
const optionsDiv = document.getElementById("options");
const scriptDiv = document.getElementById("script");

// Get the selected genres, themes and settings
const genre = document.getElementById("genre").value;
const theme = document.getElementById("theme").value;
const setting = document.getElementById("setting").value;

// Get the generate button
const generateBtn = document.getElementById("generate");

// Generate the story on button click
generateBtn.addEventListener("click", () => {
  // Prompts for the OpenAI API
  const prompts = [`In a ${setting} world,`, `The main character is a ${genre} hero,`, `The story is about ${theme}`];

  // Get the story from the OpenAI API
  fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer <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>`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompts,
      max_tokens: 500,
      temperature: 0.7
    })
  })
    .then(response => response.json())
    .then(data => {
      // Display the generated story in the story div
      storyDiv.innerHTML = `<h3>The Story:</h3>${data.choices[0].text}`;

      // Display the options for continuing the story
      optionsDiv.innerHTML = `<h3>Options:</h3><button id="option1">${data.choices[1].text}</button><button id="option2">${data.choices[2].text}</button>`;

      // Get the two options buttons
      const option1Btn = document.getElementById("option1");
      const option2Btn = document.getElementById("option2");

      // Generate the story based on option1
      option1Btn.addEventListener("click", () => {
        // Prompts for the OpenAI API
        const option1Prompts = [`Continuing with the story: ${data.choices[1].text}`];

        // Get the story from the OpenAI API
        fetch("https://api.openai.com/v1/engines/davinci/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer <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>`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: option1Prompts,
            max_tokens: 500,
            temperature: 0.7
          })
        })
          .then(response => response.json())
          .then(data => {
            // Display the generated story in the story div
            scriptDiv.innerHTML = `<h3>The Script:</h3>${data.choices[0].text}`;
          });
      });

      // Generate the story based on option2
      option2Btn.addEventListener("click", () => {
        // Prompts for the OpenAI API
        const option2Prompts = [`Continuing with the story: ${data.choices[2].text}`];

        // Get the story from the OpenAI API
        fetch("https://api.openai.com/v1/engines/davinci/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer <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>`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: option2Prompts,
            max_tokens: 500,
            temperature: 0.7
          })
        })
          .then(response => response.json())
          .then(data => {
            // Display the generated story in the story div
            scriptDiv.innerHTML = `<h3>The Script:</h3>${data.choices[0].text}`;
          });
      });
    });
});