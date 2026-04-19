const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Conversation history for multi-turn context
const conversation = [];

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to UI and history
  appendMessage('user', userMessage);
  conversation.push({ role: 'user', text: userMessage });
  input.value = '';

  // Disable button while waiting
  const btn = form.querySelector('button');
  btn.disabled = true;

  // Show thinking placeholder
  const thinkingEl = appendMessage('bot', 'EduBot is thinking...', true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.result) {
      thinkingEl.textContent = data.result;
      thinkingEl.classList.remove('thinking');
      // Add model reply to history
      conversation.push({ role: 'model', text: data.result });
    } else {
      thinkingEl.textContent = 'Sorry, no response received.';
      thinkingEl.classList.remove('thinking');
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    thinkingEl.textContent = 'Failed to get response from server.';
    thinkingEl.classList.remove('thinking');
  } finally {
    btn.disabled = false;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

function appendMessage(sender, text, isThinking = false) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'user' : 'bot');

  const bubble = document.createElement('span');
  bubble.classList.add('bubble');
  if (isThinking) bubble.classList.add('thinking');
  bubble.textContent = text;

  msgDiv.appendChild(bubble);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Return the bubble element so we can update it later
  return bubble;
}
