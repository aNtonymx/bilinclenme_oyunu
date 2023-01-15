const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Aşağıdakilerden Hangisi Daha güvenli bir şifredir?',
        choice1: '876341A',
        choice2: '7b6c5d4e',
        choice3: 'AcD87!.Az',
        choice4: '27fZ1453.elF!330',
        answer: 4,
    },
    {
        question:
            "Aşağıdakilerden hangisi aktif bir digital ayak izi değildir",
        choice1: "Gönderilen e-postalar",
        choice2: "Arkadaşının gönderisine yorum yapmak",
        choice3: "Bir web sitesinde çıkan reklama tıklamak",
        choice4: "Video paylaşım sitesinde video paylaşmak",
        answer: 3,
    },
    {
        question: "Aşağıdakilerden hangisi dijital vatandaşlık ilkelerinden birisi değildir?",
        choice1: "Dijital Ulaşım",
        choice2: "Dijital Güvenlik",
        choice3: "Dijital Etik",
        choice4: "Dijital İletişim",
        answer: 3,
    },
    {
        question: "Hangisi Anti-Virüs uygulaması değildir?",
        choice1: "Kaspersky",
        choice2: "Norton",
        choice3: "Malwarebytes",
        choice4: "Google",
        answer: 4,
    }
,
    {
        question: "Aşağıdakilerden hangisi dijital vatandaşlık ilkelerinden birisi değildir?",
        choice1: "Dijital Ulaşım",
        choice2: "Dijital Güvenlik",
        choice3: "Dijital Etik",
        choice4: "Dijital İletişim",
        answer: 1,
    },
    {
        question: "Aşağıdakilerden hangisi sitenin güvenli olduğunu öğrenme yollarından birisi değildir?",
        choice1: "Site sahibinin kimliğini öğrenmek",
        choice2: "SSL sertifikasının olup olmadığını kontrol etmek",
        choice3: "SSS sayfasını incelemek",
        choice4: "Çerezleri Kullanımını Kabul Etmek",
        answer: 4,
    },
    {
        question: "Aşağıdakilerden hangisi Güvenli ticaret yollarından değildir?",
        choice1: "Kredi kartı ile ödeme yapmak",
        choice2: "Sanal Kart Kullanmak",
        choice3: "Kripto Para ile ödeme yapmak",
        choice4: "Nakit ödeme yapmak",
        answer: 1,
    },
    {
        question: "4-Aşağıdakilerden hangisi siber zorbalığa uğradığınızda yapılması gerekenlerden biri değildir?",
        choice1: "onlineislemler.egm.gov.tr üzerinden ihbarda bulunmak",
        choice2: "Emniyet Genel Müdürlüğü Siber Suçlarla Mücadele birimine müracaat etmek",
        choice3: "İlgili dijital platformun şikâyet bildirme özelliğini kullanmak",
        choice4: "Sosyal medya üzerinden saldırganı ifşa edecek paylaşımlarda bulunmak",
        answer: 4,
    },
    {
        question: "Aşağıdakilerden hangisi iki faktörlü kimlik doğrulamaya örnek değildir?",
        choice1: "Kullanıcı adı ve parola",
        choice2: "PIN kodu ve yüz doğrulama",
        choice3: "Parmak izi ve akıllı erişim kartı",
        choice4: "Parola ve tek kullanımlık SMS kodu",
        answer: 1,
    },
    {
        question: "- Aşağıdakilerden hangisi sosyal medyanın güvenli kullanımına aykırı bir davranıştır?",
        choice1: "Sosyal medya hesapları üzerinden bilgi paylaşımı yapmak",
        choice2: "Sosyal medya platformlarının hangi bilgileri topladığını gözden geçirmek",
        choice3: "Sosyal medya hesapları için iki aşamalı doğrulama seçeneklerini aktif etmek",
        choice4: "Sosyal medya platformlarında talep edilen özel nitelikli kişisel verileri paylaşmak",
        answer: 4,
    },
    







]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()