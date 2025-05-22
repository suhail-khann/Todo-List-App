const axios = require('axios');

// Function to summarize todos using OpenAI API
async function summarizeTodos(todos) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const todoTexts = todos.map(todo => todo.text);
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes todo lists. Create a concise yet comprehensive summary of the pending tasks, organizing them by priority or category when appropriate.'
          },
          {
            role: 'user',
            content: `Please summarize these pending todos: ${JSON.stringify(todoTexts)}`
          }
        ],
        max_tokens: 300
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to generate summary with LLM');
  }
}

// Function to send summary to Slack
async function sendToSlack(summary, taskCount) {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    await axios.post(webhookUrl, {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📋 Todo Summary',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*You have ${taskCount} pending tasks:*`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: summary
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Generated on ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    });
    
    return true;
  } catch (error) {
    console.error('Error sending to Slack:', error.response?.data || error.message);
    throw new Error('Failed to send summary to Slack');
  }
}

module.exports = {
  summarizeTodos,
  sendToSlack
};