function createInputs() {
    const participantCount = parseInt(
      document.getElementById("participantCount").value
    );
    const participantInputs = document.getElementById("participantInputs");

    participantInputs.innerHTML = "";

    for (let i = 1; i <= participantCount; i++) {
      const participantNameInput = document.createElement("input");
      const roleInput = document.createElement("input");

      participantNameInput.type = "text";
      participantNameInput.placeholder = `이름 작성`;
      roleInput.type = "text";
      roleInput.placeholder = `역할 작성`;

      participantInputs.appendChild(participantNameInput);
      participantInputs.appendChild(roleInput);
      participantInputs.appendChild(document.createElement("br"));
    }
  }

  function allocateRoles() {
    const participantInputs = document.getElementById("participantInputs");
    const resultDiv = document.getElementById("result");
    const inputs = participantInputs.querySelectorAll('input[type="text"]');
    const participants = [];
    const roles = [];

    // Check for empty inputs
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        alert("빈 칸을 모두 채워주세요.");
        return;
      }
    }

    inputs.forEach((input, index) => {
      if (index % 2 === 0) {
        participants.push(input.value);
      } else {
        roles.push(input.value);
      }
    });

    if (participants.length !== roles.length) {
      resultDiv.innerText = "참여자와 역할의 수가 일치하지 않습니다.";
      return;
    }

    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    resultDiv.innerHTML = "<h2>결과</h2>";
    for (let i = 0; i < participants.length; i++) {
      resultDiv.innerHTML += `<p>${participants[i]} → ${roles[i]}</p>`;
    }
  }

  document
    .getElementById("participantCount")
    .addEventListener("input", createInputs);