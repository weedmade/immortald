// duckai_example.js
import { P2PClient } from '@openpond/sdk';

async function runExample() {
  try {
    // Instantiate the P2PClient; you can pass options if required by the docs.
    const client = new P2PClient();

    // Use the client to request a completion.
    // Adjust the prompt and model parameters as specified in the DuckAI documentation.
    const result = await client.requestCompletion({
      prompt: "What is the current yield on Pool A?",
      model: "duckai-default"
    });

    console.log("DuckAI output:", result);
  } catch (error) {
    console.error("Error running DuckAI example:", error);
  }
}

runExample();
