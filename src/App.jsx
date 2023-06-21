import { useState } from 'react';
import './styles/App.css';
import './styles/Custom.scss';

const questions = [
	{
		questionText: 'Qual o idiomafalado no Brasil?',
		answerOptions: [
			{ answerText: 'Português', isCorrect: true },
			{ answerText: 'Inglês', isCorrect: false },
			{ answerText: 'Francês', isCorrect: false },
			{ answerText: 'Alemão', isCorrect: false },
		],
	},
	{
		questionText: 'Quais os países que têm a maior e a menor expectativa de vida do mundo?',
		answerOptions: [
			{ answerText: 'Japão e Serra Leoa', isCorrect: true },
			{ answerText: 'Austrália e Afeganistã', isCorrect: false },
			{ answerText: 'Itália e Chade', isCorrect: false },
			{ answerText: 'Brasil e Congo', isCorrect: false },
		],
	},
	{
		questionText: 'Qual empresa criou o Iphone?',
		answerOptions: [
			{ answerText: 'Apple', isCorrect: true },
			{ answerText: 'Intel', isCorrect: false },
			{ answerText: 'Amazon', isCorrect: false },
			{ answerText: 'Microsoft', isCorrect: false },
		],
	},
	{
		questionText: 'Como aprender a programar?',
		answerOptions: [
			{ answerText: 'Praticando o que se aprende', isCorrect: true },
			{ answerText: 'Vendo vídeo', isCorrect: false },
			{ answerText: 'Lendo', isCorrect: false },
			{ answerText: 'Dormindo', isCorrect: false },
		],
	},
];

function App() {
	const [showScore, setShowScore] = useState(false);
	const [correctScore, setCorrectScore] = useState(0);
	const [wrongScore, setWrongScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);

	function handleAnswer(isCorrect) {
		if (isCorrect) {
			setCorrectScore(correctScore + 1);
		} else {
			setWrongScore(wrongScore + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	}

	const interval = 100 / questions.length;

	const correctProgress = (interval * correctScore).toFixed(2);
	const wrongProgress = (interval * wrongScore).toFixed(2);
	console.log(correctProgress, 'and', wrongProgress);

	return (
		<>
			<div className="progress-container mb-5 d-flex flex-row justify-content-between w-100 ">
				<div className="position-relative">
					<progress className="correct-progress" value={correctProgress} max={100} />
					<span className="position-absolute top-50 start-0">{`${correctProgress * (questions.length / 100)} / ${questions.length}`}</span>
				</div>
				<span className="rounded-circle bg-customBg1 text-white p-2 fw-bold ">{Math.floor(correctProgress)}</span>
				<div className="position-relative">
					<progress className="wrong-progress" value={wrongProgress} max={100} />
					<span className="position-absolute top-50 start-0">{`${wrongProgress * (questions.length / 100)} / ${questions.length}`}</span>
				</div>
			</div>

			<div className="app flex-column align-items-center">
				{showScore ? (
					<div className="score-section d-flex fs-24 align-items-center">
						Você pontuou {correctScore} de {questions.length}
					</div>
				) : (
					<>
						<div>
							<div className="question-section">
								<div className="question-count">
									<span>Questão {currentQuestion + 1}</span>/{questions.length}
								</div>
								<div className="question-text">{questions[currentQuestion].questionText}</div>
							</div>
							<div className="answer-section">
								{questions[currentQuestion].answerOptions.map((answerOption, index) => (
									<button onClick={() => handleAnswer(answerOption.isCorrect)} key={index}>
										{answerOption.answerText}
									</button>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
