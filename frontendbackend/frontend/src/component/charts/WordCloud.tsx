import React from "react";
import ReactWordcloud from "react-wordcloud";

interface Props {
  topics: string[];
}

type OptionsType = {
  rotations: number;
  rotationAngles: number[];
};

const WordCloud: React.FC<Props> = ({ topics }) => {
  // Count the frequency of each topic
  const topicFrequencies: { [topic: string]: number } = {};
  topics.forEach((topic) => {
    topicFrequencies[topic] =
      (topicFrequencies[topic] || 0) + Math.floor(Math.random() * 1000);
  });

  // Convert topic frequencies to an array of objects expected by react-wordcloud
  const wordCloudData = Object.keys(topicFrequencies).map((topic) => ({
    text: topic,
    value: topicFrequencies[topic],
  }));
  const options: OptionsType = {
    rotations: 1,
    rotationAngles: [0,0],
  };
  return (
    <div className="">
      <ReactWordcloud words={wordCloudData} options={options} />
    </div>
  );
};

export default WordCloud;
