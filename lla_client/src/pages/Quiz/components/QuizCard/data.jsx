export const quizdata = [
  {
    quesno: 55,
    type: "text",
    question: "What is apple called in german",
    desc: "choose the correct option with proper pronounciation",
    options: ["apple", "apfel", "bananen", "brotchen"],
  },
  {
    quesno: 1,
    type: "image",
    imgsrc: "https://dummyimage.com/400x300",
    question: "What is it?",
    options: ["Apple", "Banana", "PineApple", "orange"],
  },
  {
    quesno: 2,
    type: "audio",
    question: "What are german fruit names?",
    desc: "choose the correct option with proper pronounciation",
    options: ["apple", "apfel", "bananen", "brotchen"],
    audios: [
      "/audio/a1.wav",
      "/audio/a2.wav",
      "/audio/a3.wav",
      "/audio/a4.wav",
    ],
  },
  {
    quesno: 3,
    type: "audio2text",
    question: "Write what you hear ",
    desc: "an audio will pe played write what you hear",
    audio: "abc.mp3",
  },
  {
    type: "result",
  },
];
