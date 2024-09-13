# PolyChat

PolyChat is an interactive chat interface similar to ChatGPT that allows users to engage with open-source language models such as **Gemma**, **Llama**, and **Mixtral**. The application maintains a context of the last 5 conversations and a customizable system prompt for a more tailored interaction. You can even change to different models and they will also have same context awareness.

## Screenshots

### Normal Prompt and Context Awareness
![polychat-normal](https://github.com/user-attachments/assets/ec315d3d-eeec-4292-9887-1141fce13112)


### Changing Models
![polychat-model-change](https://github.com/user-attachments/assets/ef250e9a-b6f5-41ba-9945-e951e5ebf21b)

### Coding Prompt
![polychat-coding](https://github.com/user-attachments/assets/249a49c2-360d-4df4-bd8f-c2ee47a5caba)


## Features

- **Multiple LLM Models**: Interact with open-source models like:
  - Mixtral-8x7b
  - Gemma 2
  - Llama 3.1-70b
- **Contextual Chat**: Retains the context of the last 5 conversations, improving the flow of interactions.
- **System Prompt**: A predefined system message that guides the behavior of the LLM models. By default, the system prompt encourages concise and short answers.
- **Real-time Loading Animation**: Displays a loading animation while waiting for AI responses.
- **Model Selection**: Dynamically switch between different models during the conversation.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/HarshSharma20503/PolyChat.git
cd PolyChat
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
Create a .env file in the root directory with your API keys.

```bash
VITE_GROQ_API_KEY=<your-groq-api-key>
```

4. Run the application:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`.

## Usage

- Type your query into the message input box, and press Enter or click Send.
- The selected model will generate a response based on the prompt and the conversation’s context.
- You can switch between models using the dropdown selector in the interface.

## Technologies Used

- React: Frontend framework
- Bootstrap: For styling and layout
- LangChain: Handling the LLM model interactions
- Lottie: For animated loading states

## Future Enhancements

- Add more open-source LLM models for a wider variety of interactions.
- Improve the context management to allow deeper conversation history.
- Enhance system prompt customization for different user needs.

## Contributing

Feel free to submit issues or contribute to this project by creating pull requests. For major changes, please open an issue to discuss what you’d like to change.
