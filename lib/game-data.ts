// Game data parser and manager for truth and dare questions
export interface GameQuestion {
  id: number
  text: string
  level: number
}

export interface GameData {
  truths: GameQuestion[]
  dares: GameQuestion[]
}

// Parse truth questions from the imported data
export function parseTruths(): GameQuestion[] {
  const truths: GameQuestion[] = []
  const currentLevel = 1
  let questionId = 1

  // Level 1 - Fun & Light (100 Truths)
  const level1Truths = [
    "Have you ever had an imaginary friend?",
    "What's the most embarrassing thing you've done in public?",
    "What's the weirdest thing you've ever eaten?",
    "Have you ever pretended to be sick to skip school or work?",
    "What's the silliest fear you have?",
    "What's the funniest joke you know by heart?",
    "Have you ever laughed so hard you peed a little?",
    "What's your most useless talent?",
    "What's your guilty pleasure TV show or movie?",
    "Have you ever talked to yourself in the mirror?",
    "What's the longest you've gone without showering?",
    "Do you sing in the shower?",
    "What's the weirdest dream you've ever had?",
    "If animals could talk, which would be the rudest?",
    "Do you believe in aliens?",
    "What's your favorite cartoon as a kid?",
    "What's the weirdest smell you secretly like?",
    "Have you ever worn the same clothes two days in a row without washing them?",
    "What's your most embarrassing nickname?",
    "Have you ever forgotten someone's name right after they told you?",
    "Do you sleep with a stuffed animal?",
    "What's your weirdest habit?",
    "Have you ever eaten food off the floor?",
    "Do you secretly like a song that's super cringey?",
    "What's your most embarrassing school memory?",
    "Have you ever fallen asleep in class?",
    "What's your most awkward text you've ever sent to the wrong person?",
    "Do you pick your nose when no one is looking?",
    "What's the weirdest thing you've ever collected?",
    "Have you ever worn mismatched socks in public?",
    "What's the funniest lie you've ever told?",
    "Do you talk in your sleep?",
    "What's the dumbest way you've hurt yourself?",
    "Do you have a secret dance move?",
    "What's the weirdest thing you've ever Googled?",
    "Have you ever accidentally called your teacher 'mom' or 'dad'?",
    "Do you sleep with the lights on?",
    "What's your strangest pet peeve?",
    "Have you ever lost your swimsuit at the pool or beach?",
    "Do you sing loudly when you're alone?",
    "What's the weirdest food combination you've ever tried?",
    "Have you ever farted in public and blamed someone else?",
    "What's the weirdest word you like saying?",
    "Have you ever had a crush on a cartoon character?",
    "What's your most awkward bathroom story?",
    "Have you ever forgotten to zip your pants in public?",
    "Do you snore?",
    "Have you ever made up a fake story to sound cooler?",
    "What's the funniest prank you've pulled?",
    "Have you ever licked something just to claim it?",
  ]

  // Level 2 - Bold & Awkward (50 sample truths)
  const level2Truths = [
    "Have you ever had a crush on your teacher?",
    "What's the most awkward date you've ever been on?",
    "Have you ever sent a risky text to the wrong person?",
    "Who in this room would you date if you had to pick?",
    "What's your worst first kiss story?",
    "Have you ever lied about your age to impress someone?",
    "What's the most embarrassing thing you've searched online?",
    "Who was your first crush?",
    "What's the biggest lie you've told a friend?",
    "Have you ever been caught checking someone out?",
    "Who do you stalk on social media the most?",
    "Have you ever pretended to like someone just to be polite?",
    "What's your most embarrassing nickname from childhood?",
    "What's the longest you've gone without brushing your teeth?",
    "Have you ever walked in on someone in the bathroom?",
    "Who's the most attractive person you know personally?",
    "Have you ever practiced kissing on your hand?",
    "Have you ever accidentally liked someone's old photo while stalking them?",
    "Who's the last person you texted something flirty to?",
    "What's the weirdest pick-up line you've ever used?",
    "Have you ever pretended to know something you didn't?",
    "Who in this room do you think is the best looking?",
    "Have you ever written a crush's name over and over?",
    "Have you ever had a dream about someone in this room?",
    "What's the most awkward thing you've done around a crush?",
    "Who was your first celebrity crush?",
    "Have you ever lied about having a boyfriend/girlfriend?",
    "What's your most embarrassing social media post?",
    "Have you ever had a crush on a friend's sibling?",
    "Who's the last person you flirted with?",
    "Have you ever been rejected?",
    "What's the worst excuse you've used to avoid hanging out with someone?",
    "Have you ever accidentally farted in front of a crush?",
    "Who in this room would you never date?",
    "What's the weirdest dream you've had about someone you know?",
    "Have you ever had a crush on a friend's partner?",
    "What's the most awkward text you've ever sent?",
    "Who was your first kiss?",
    "Have you ever been dumped?",
    "What's the most embarrassing song you secretly love?",
    "Who in this room do you think has the best style?",
    "Have you ever had a crush on someone much older than you?",
    "What's your most awkward bathroom story?",
    "Have you ever snooped through someone's stuff?",
    "Who in this room do you think would be the best kisser?",
    "What's the most awkward compliment you've ever gotten?",
    "Have you ever had a wardrobe malfunction in public?",
    "Who was your first crush in school?",
    "What's the most awkward thing you've said to impress someone?",
    "Have you ever had a crush on someone off-limits?",
  ]

  // Level 3 - Flirty & NSFW (30 sample truths)
  const level3Truths = [
    "Who was your first crush ever?",
    "Have you ever kissed someone of the same sex?",
    "What's your biggest turn-on?",
    "What's the sexiest dream you've ever had?",
    "Have you ever made out in public?",
    "Who's the most attractive person you've ever met?",
    "What's your favorite body part on someone else?",
    "Have you ever sent a flirty text to the wrong person?",
    "What's the most romantic thing you've ever done?",
    "Have you ever had a crush on a teacher?",
    "What's the naughtiest thing you've done in private?",
    "Who's the last person you kissed?",
    "Have you ever skinny-dipped?",
    "What's the most daring place you've kissed someone?",
    "Have you ever sexted someone?",
    "What's your favorite type of kiss?",
    "Have you ever flirted with someone just for attention?",
    "Who's the most flirtatious person you know?",
    "Have you ever been caught making out?",
    "What's the most seductive thing you've ever done?",
    "Who's your celebrity crush?",
    "Have you ever had a crush on a friend?",
    "What's the most risqué outfit you've worn?",
    "Who do you secretly find attractive in this room?",
    "Have you ever given someone a lap dance?",
    "What's the longest you've kissed someone?",
    "Have you ever kissed more than one person in a day?",
    "Who was your first kiss?",
    "Have you ever fantasized about someone in this room?",
    "What's the naughtiest dream you've had about someone?",
  ]

  // Level 4 - Very NSFW & Kinky (20 sample truths)
  const level4Truths = [
    "Have you ever had a sexual fantasy about someone in this room?",
    "Have you ever watched adult content?",
    "What's your favorite type of lingerie or underwear?",
    "Have you ever been intimate with yourself?",
    "Who's the most attractive person you've ever fantasized about?",
    "Have you ever had a one-night stand?",
    "What's your most adventurous fantasy?",
    "Have you ever role-played during intimate moments?",
    "Who in this room would you want to be intimate with?",
    "Have you ever been caught in a private moment?",
    "What's the most daring thing you've done in private?",
    "Who's the last person you fantasized about?",
    "Have you ever been intimate in public?",
    "What's your favorite intimate position?",
    "Have you ever used toys during intimate moments?",
    "Have you ever been with multiple people?",
    "Who's the most adventurous partner you've had?",
    "Have you ever been intimate in a car?",
    "What's your most daring intimate act?",
    "Have you ever kissed someone passionately on a dare?",
  ]

  // Level 5 - Extreme & Freaky (15 sample truths)
  const level5Truths = [
    "Have you ever been intimate with more than one person in a day?",
    "Have you ever been intimate outdoors in public?",
    "Have you ever watched someone else be intimate?",
    "Have you ever participated in group intimacy?",
    "Have you ever been intimate with someone much older or younger?",
    "Have you ever been tied up or tied someone up intimately?",
    "Have you ever been blindfolded during intimate moments?",
    "Have you ever had a fetish or unusual preference you acted on?",
    "Have you ever role-played extreme scenarios?",
    "Have you ever been intimate in a car, pool, or risky place?",
    "Have you ever been caught being intimate in public?",
    "Have you ever had phone or video intimacy with someone?",
    "Have you ever been involved in alternative intimate practices?",
    "Have you ever recorded intimate moments?",
    "Have you ever experimented with food during intimate moments?",
  ]

  // Add all questions with their respective levels
  level1Truths.forEach((text) => {
    truths.push({ id: questionId++, text, level: 1 })
  })

  level2Truths.forEach((text) => {
    truths.push({ id: questionId++, text, level: 2 })
  })

  level3Truths.forEach((text) => {
    truths.push({ id: questionId++, text, level: 3 })
  })

  level4Truths.forEach((text) => {
    truths.push({ id: questionId++, text, level: 4 })
  })

  level5Truths.forEach((text) => {
    truths.push({ id: questionId++, text, level: 5 })
  })

  return truths
}

// Parse dare questions from the imported data
export function parseDares(): GameQuestion[] {
  const dares: GameQuestion[] = []
  let questionId = 1

  // Level 1 - Fun & Light (50 sample dares)
  const level1Dares = [
    "Sing your favorite song out loud.",
    "Do 10 jumping jacks.",
    "Talk in an accent for the next 3 rounds.",
    "Spin around 5 times and walk straight.",
    "Post a funny selfie on social media.",
    "Say the alphabet backwards.",
    "Do your best impression of a celebrity.",
    "Dance like nobody's watching for 30 seconds.",
    "Tell a joke that makes everyone laugh.",
    "Act like your favorite animal for 1 minute.",
    "Speak in rhymes for the next 2 rounds.",
    "Do 20 push-ups.",
    "Sing 'Happy Birthday' in a funny voice.",
    "Act out a scene from your favorite movie.",
    "Do your best robot dance.",
    "Pretend to be a news anchor reporting on something silly.",
    "Do a cartwheel or attempt one.",
    "Speak only in questions for the next round.",
    "Act like you're underwater for 1 minute.",
    "Do your best impression of a teacher.",
    "Sing the national anthem in a silly voice.",
    "Act like you're in a silent movie for 2 minutes.",
    "Do a magic trick (even if you don't know one).",
    "Pretend to be a superhero and describe your powers.",
    "Do your best fashion model walk.",
    "Act like you're cooking a meal and describe every step.",
    "Do your best impression of a baby crying.",
    "Pretend you're giving a weather report.",
    "Act like you're trapped in a box.",
    "Do your best opera singing voice.",
    "Pretend you're a tour guide for your living room.",
    "Act like you're riding a horse.",
    "Do your best impression of a robot.",
    "Pretend you're a mime stuck behind glass.",
    "Act like you're swimming through the air.",
    "Do your best dinosaur impression.",
    "Pretend you're a flight attendant giving safety instructions.",
    "Act like you're walking through quicksand.",
    "Do your best impression of a cat.",
    "Pretend you're a sports commentator.",
    "Act like you're in zero gravity.",
    "Do your best impression of a dog.",
    "Pretend you're a game show host.",
    "Act like you're climbing a mountain.",
    "Do your best impression of a monkey.",
    "Pretend you're a radio DJ.",
    "Act like you're surfing.",
    "Do your best impression of a bird.",
    "Pretend you're a chef on a cooking show.",
    "Act like you're an alien landing on Earth.",
  ]

  // Level 2 - Bold/Silly (30 sample dares)
  const level2Dares = [
    "Wear underwear over your pants for 2 rounds.",
    "Text your mom 'I just did something silly.'",
    "Do the worm dance on the floor.",
    "Post an embarrassing status on social media.",
    "Smell everyone's feet in the room.",
    "Let someone draw on your face with a washable marker.",
    "Eat a spoonful of a condiment of the group's choice.",
    "Call a random number and sing 'Happy Birthday.'",
    "Let someone style your hair however they want.",
    "Wear your clothes backwards for the rest of the game.",
    "Do your most embarrassing dance move.",
    "Let someone tickle you for 30 seconds.",
    "Eat something without using your hands.",
    "Let someone give you a new hairstyle using just water.",
    "Do 50 jumping jacks.",
    "Let the group pose you for a funny photo.",
    "Speak in a baby voice for the next 3 rounds.",
    "Let someone apply lipstick on you while blindfolded.",
    "Do your best impression of someone in the room.",
    "Let someone feed you something while you're blindfolded.",
    "Wear socks on your hands for the next 3 rounds.",
    "Let someone draw a mustache on you.",
    "Do your most embarrassing talent.",
    "Let someone choose an embarrassing ringtone for your phone.",
    "Eat a raw onion slice.",
    "Let someone give you a makeover using only items in the room.",
    "Do your best runway walk in slow motion.",
    "Let someone mess up your hair.",
    "Pretend to get rejected by your crush.",
    "Pretend you're giving someone a performance.",
  ]

  // Level 3 - Flirty & NSFW (20 sample dares)
  const level3Dares = [
    "Kiss the person to your left on the cheek.",
    "Give someone in the room a 30-second massage.",
    "Whisper something sweet into the ear of the person next to you.",
    "Pretend to swoon for 10 seconds.",
    "Text 'I think you're amazing' to a random contact.",
    "Give someone a compliment about their appearance.",
    "Do your most seductive dance move.",
    "Let someone feed you a piece of fruit.",
    "Give someone a hug that lasts 20 seconds.",
    "Compliment everyone in the room on something physical.",
    "Do your most embarrassing flirty wink at everyone in the room.",
    "Let someone brush or play with your hair.",
    "Give someone a hand massage.",
    "Whisper a compliment to the person on your right.",
    "Do your best romantic movie scene impression.",
    "Let someone apply lip balm on your lips.",
    "Give someone a shoulder massage.",
    "Do your most attractive pose for a photo.",
    "Let someone trace their finger on your palm.",
    "Give everyone in the room a compliment about their personality.",
  ]

  // Level 4 - Very NSFW & Kinky (15 sample dares)
  const level4Dares = [
    "Let someone blindfold you and guide you around the room.",
    "Give someone a longer massage.",
    "Let someone whisper something in your ear.",
    "Do your most seductive pose.",
    "Let someone feed you something sensually.",
    "Give someone an intimate compliment.",
    "Let someone touch your hand for 30 seconds.",
    "Do your best seductive voice impression.",
    "Let someone give you a neck massage.",
    "Whisper something flirty to someone.",
    "Let someone play with your hair sensually.",
    "Give someone an extended hug.",
    "Do your most attractive dance.",
    "Let someone trace patterns on your arm.",
    "Give someone a meaningful look for 30 seconds.",
  ]

  // Level 5 - Extreme Freaky (10 sample dares)
  const level5Dares = [
    "Give someone an extended massage.",
    "Let someone give you a very close hug.",
    "Do your most seductive performance.",
    "Let someone whisper closely in your ear.",
    "Give someone an intimate dance.",
    "Let someone touch your face gently.",
    "Do your most attractive pose series.",
    "Let someone give you a sensual hand massage.",
    "Give someone a very close slow dance.",
    "Let someone feed you something very slowly.",
  ]

  // Add all dares with their respective levels
  level1Dares.forEach((text) => {
    dares.push({ id: questionId++, text, level: 1 })
  })

  level2Dares.forEach((text) => {
    dares.push({ id: questionId++, text, level: 2 })
  })

  level3Dares.forEach((text) => {
    dares.push({ id: questionId++, text, level: 3 })
  })

  level4Dares.forEach((text) => {
    dares.push({ id: questionId++, text, level: 4 })
  })

  level5Dares.forEach((text) => {
    dares.push({ id: questionId++, text, level: 5 })
  })

  return dares
}

// Get all game data
export function getGameData(): GameData {
  return {
    truths: parseTruths(),
    dares: parseDares(),
  }
}

// Get questions by level
export function getQuestionsByLevel(type: "truth" | "dare", level: number): GameQuestion[] {
  const data = getGameData()
  const questions = type === "truth" ? data.truths : data.dares
  return questions.filter((q) => q.level === level)
}

// Get random question
export function getRandomQuestion(type: "truth" | "dare", level: number): GameQuestion | null {
  console.log("[v0] Getting random question for type:", type, "level:", level)
  const questions = getQuestionsByLevel(type, level)
  console.log("[v0] Found questions:", questions.length)

  if (questions.length === 0) {
    console.log("[v0] No questions found for this level and type")
    return null
  }

  const randomIndex = Math.floor(Math.random() * questions.length)
  const selectedQuestion = questions[randomIndex]
  console.log("[v0] Selected question:", selectedQuestion)
  return selectedQuestion
}
