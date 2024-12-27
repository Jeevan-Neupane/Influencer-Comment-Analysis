# InfluencerInsight
The InfluencerInsight is a web application designed to assist influencers in analyzing YouTube and other social media comments and providing feedback using a deep learning model trained with BERT (Bidirectional Encoder Representations from Transformers). This platform leverages advanced natural language processing techniques for comment analysis.

## Features

- **YouTube Comment Analysis:**
  - Utilizes a deep learning model (BERT) to analyze comments from YouTube videos.
  - Provides sentiment analysis, keyword extraction, and identifies popular or engaging comments.
  
- **Feedback and Recommendations:**
  - Offers influencers insights and recommendations based on comment analysis.
  - Suggests strategies for improving engagement and channel growth.

- **Interactive Dashboard:**
  - Displays visualizations and analytics of comment data.
  - Allows influencers to track trends and performance metrics.

- **Chatbot Integration:**
  - Incorporates a chatbot feature powered by AI for content ideas and growth strategies.
  - Enables real-time interaction to brainstorm video concepts and audience engagement tactics.

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Styled Components
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  
- **Machine Learning:**
  - BERT (Bidirectional Encoder Representations from Transformers) - Deep learning model for natural language processing (NLP)
  
## Getting Started

Follow these steps to set up and run the Influencer Growth Platform locally:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/influencer-growth-platform.git
    cd influencer-growth-platform
    ```

2. **Install Dependencies:**
    ```bash
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd ../backend
    npm install

    #Install server dependencies
    cd ../server
    pip install -r requirements.txt
    ```
3. **Set Environment Variables:**
Create a .env file in the backend directory and copy the environment variables from .env.sample
4. **Run the Application:**
    ```bash
    # Start the backend
    cd ../frontend
    npm run dev

    # Start the frontend
    cd ../backend
    npm run dev

    #Start the server
    cd ../server
    uvicorn main:app
    ```
5. **Access the Application:**
Open your web browser and navigate to http://localhost:5173 to use the Influencer Growth Platform.

### Acknowledgements
- This project was developed as part of DeerHack by CloseAI.