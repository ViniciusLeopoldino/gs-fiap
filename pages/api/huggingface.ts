import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem vazia' });
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: message })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'Erro ao obter resposta.' });
    }

    const reply = data[0]?.generated_text || 'Desculpe, não consegui processar sua solicitação.';
    res.status(200).json({ response: reply });
  } catch (error) {
    console.error('Erro ao chamar API Hugging Face:', error);
    res.status(500).json({ error: 'Erro interno ao chamar a API Hugging Face' });
  }
}
