// 참여자 입력 필드 생성 함수
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

// 역할 랜덤으로 할당하는 함수
function allocateRoles() {
  const participantInputs = document.getElementById("participantInputs");
  const resultDiv = document.getElementById("result");
  const inputs = participantInputs.querySelectorAll('input[type="text"]');
  const participants = [];
  const roles = [];

  // 빈 입력 확인
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      alert("빈 칸을 모두 채워주세요.");
      return;
    }
  }

  // 참여자와 역할 분리
  inputs.forEach((input, index) => {
    if (index % 2 === 0) {
      participants.push(input.value);
    } else {
      roles.push(input.value);
    }
  });

  // 참여자와 역할 수 일치 확인
  if (participants.length !== roles.length) {
    resultDiv.innerText = "참여자와 역할의 수가 일치하지 않습니다.";
    return;
  }

  // 할당 중 카운트 다운
  let count = 4;
  resultDiv.innerHTML = `<h2>결과</h2><p id="countdown">할당 중...</p>`;
  const countdownElement = document.getElementById("countdown");

  const timerInterval = setInterval(() => {
    count--;
    countdownElement.innerText = `${count}`;

    // 크게 다른 색으로 스타일링
    countdownElement.style.fontSize = "30px";
    countdownElement.style.color = "red"; // 변경할 색상 설정

    if (count === 0) {
      clearInterval(timerInterval);
      displayResults(participants, roles, resultDiv);
    }
  }, 1000);
}

// 결과를 화면에 표시하는 함수
function displayResults(participants, roles, resultDiv) {
  // 역할 랜덤으로 섞기
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  // 결과 출력
  resultDiv.innerHTML = "<h2>결과</h2>";
  for (let i = 0; i < participants.length; i++) {
    resultDiv.innerHTML += `<p>${participants[i]} → ${roles[i]}</p>`;
  }
}

// 참여자 수 입력 이벤트 리스너 등록
document
  .getElementById("participantCount")
  .addEventListener("input", createInputs);
