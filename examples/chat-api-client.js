// This is a simple client for dllama-api.
//
// Usage:
//
// 1. Start the server, how to do it is described in the `src/apps/dllama-api/README.md` file.
// 2. Run this script: `node examples/chat-api-client.js`

const HOST = '127.0.0.1';
const PORT = 9990;

async function chat(messages, maxTokens) {
    const response = await fetch(`http://${HOST}:${PORT}/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages,
            temperature: 0.7,
            stop: ['<|eot_id|>'],
            max_tokens: maxTokens
        }),
    });
    return await response.json();
}

async function ask(system, user, maxTokens) {
    console.log(`> system: ${system}`);
    console.log(`> user: ${user}`);
    const response = await chat([
        {
            role: 'system',
            content: system
        },
        {
            role: 'user',
            content: user
        }
    ], maxTokens);
    console.log(`${response.choices[0].message.content}`);
}

async function main() {
    await ask('You are an excellent math teacher.', 'What is 1 + 2?', 64);
    await ask('You are a romantic.', 'Where is Europe?', 64);
}

main();
