const textarea    = document.getElementById("input-text");
const toneSelect  = document.getElementById("tone-select");
const generateBtn = document.getElementById("generate-btn");
const outputDiv   = document.getElementById("output");
const spinner     = document.getElementById("spinner");

generateBtn.addEventListener("click", async () => {
  const text = textarea.value.trim();
  const tone = toneSelect.value;
  if (!text) {
    return alert("Please put some content before getting started");
  }

  spinner.classList.remove("hidden");
  generateBtn.disabled = true;
  outputDiv.textContent = "";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone }),
    });
    const { newsletter } = await res.json();
    outputDiv.textContent = newsletter;
  } catch (err) {
    console.error(err);
    outputDiv.textContent = "Sorry! We couldn't generate your newsletter! Please try again.";
  } finally {
    spinner.classList.add("hidden");
    generateBtn.disabled = false;
  }
});

