function generateStory() {
    var genre = document.storyForm.genre.value;
    var theme = document.storyForm.theme.value;
    var setting = document.storyForm.setting.value;
  
    var data = {
      genre: genre,
      theme: theme,
      setting: setting
    };
  
    fetch("https://api.openai.com/v1/engines/davinci/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer <YOUR_API_KEY_HERE>",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        var story = data.choices[0].text;
        var storyDiv = document.getElementById("story");
        var p = document.createElement("p");
        p.innerHTML = story;
        storyDiv.appendChild(p);
      });
  }