import React, { useState } from 'react';
import styles from './Chatbot.module.css';

interface ChatbotProps {
  title: string;
  questions: string[];
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ title, questions, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [userResponse, setUserResponse] = useState('');
  const [chatResponses, setChatResponses] = useState<string[]>([]);

  const handleResponseSubmit = async () => {
    if (userResponse) {
      setResponses([...responses, userResponse]);
      setUserResponse('');

      try {
        const chatResponse = await fetchHuggingFaceResponse(userResponse);
        setChatResponses([...chatResponses, chatResponse]);
      } catch (error) {
        console.error("Erro ao chamar API Hugging Face:", error);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const fetchHuggingFaceResponse = async (message: string, retries: number = 5): Promise<string> => {
    for (let i = 0; i < retries; i++) {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (response.ok) {
        return data.response || "Erro ao obter resposta.";
      } else {
        console.error("Erro da API Hugging Face:", data.error);
        if (data.error && data.error.includes("currently loading")) {
          
          await new Promise(res => setTimeout(res, 1000));
        } else {
          throw new Error("Erro ao obter resposta.");
        }
      }
    }
    throw new Error("Máximo de tentativas atingido.");
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.chatbotHeader}>
        <h3>{title}</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div className={styles.chatWindow}>
        {responses.map((response, index) => (
          <div key={index} className={styles.userMessage}>
            <p>{response}</p>
            <div className={styles.chatbotResponse}>{chatResponses[index]}</div>
          </div>
        ))}
        <div className={styles.question}>
          <p>{questions[currentQuestionIndex]}</p>
        </div>
        <input 
          type="text" 
          value={userResponse} 
          onChange={(e) => setUserResponse(e.target.value)} 
          placeholder="Digite sua resposta" 
        />
        <button onClick={handleResponseSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
