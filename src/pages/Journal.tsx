import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, SkipForward, BookOpen } from 'lucide-react';

const INITIAL_PROMPTS = [
  {
    question: "What is a personality trait of yours that has helped you in a crisis?",
    hint: "Think about traits like 'stubbornness,' 'calmness,' or 'dark humor.'"
  },
  {
    question: "What part of your body do you often overlook but are grateful for today?",
    hint: "Think of your 'unsung heroes' like your liver, your pinky toe for balance, or your ears."
  },
  {
    question: "What is a habit you’ve built that you’re proud of?",
    hint: "Even 'drinking one glass of water in the morning' counts as a win."
  },
  {
    question: "What is a piece of advice you’re glad you didn’t take?",
    hint: "Reflect on a time your intuition saved you from a path that wasn't right for you."
  },
  {
    question: "What is something you’ve forgiven yourself for recently?",
    hint: "Focus on the lightness you feel now that you've let go of that guilt."
  },
  {
    question: "What is a 'win' from your childhood that still makes you smile?",
    hint: "Think of a spelling bee, a sports goal, or a brave moment on the playground."
  },
  {
    question: "What is a fear you’ve conquered, no matter how small?",
    hint: "Did you make a difficult phone call? Kill a spider? Acknowledge the courage."
  },
  {
    question: "How has your taste in music or art evolved in a way you appreciate?",
    hint: "Be glad for your current ability to find beauty in things you used to ignore."
  },
  {
    question: "What is a boundary you set recently that made you feel safe?",
    hint: "Thank yourself for saying 'no' to something that would have drained you."
  },
  {
    question: "What is a 'flaw' you have that actually has a secret benefit?",
    hint: "For example, 'being over-sensitive' often means you are highly empathetic."
  },
  {
    question: "What is the most useful thing you’ve learned this year?",
    hint: "Focus on how this knowledge gives you more agency in your life."
  },
  {
    question: "What is a compliment you received that you actually believed?",
    hint: "Reflect on why that specific compliment resonated with your soul."
  },
  {
    question: "What is something you’re 'better at' than you were a year ago?",
    hint: "Notice the gradual growth that usually goes invisible."
  },
  {
    question: "What is your favorite way to spend time alone?",
    hint: "Be grateful for the comfort you find in your own company."
  },
  {
    question: "What is a dream you have for the future that gives you hope?",
    hint: "The ability to imagine a better future is a gift in itself."
  },
  {
    question: "What is a 'guilty pleasure' that you’ve stopped feeling guilty about?",
    hint: "Whether it's reality TV or a specific snack, appreciate the pure joy it brings."
  },
  {
    question: "What is a physical sensation you love feeling?",
    hint: "Think of sun on your skin, a hot shower, or the feeling of fresh grass."
  },
  {
    question: "What is a book or quote that changed how you see yourself?",
    hint: "Identify the specific sentence that made you feel 'seen.'"
  },
  {
    question: "What is one thing you did today just because it made you happy?",
    hint: "Acknowledge the act of self-kindness, no matter how brief."
  },
  {
    question: "Who is a 'background character' in your life you appreciate?",
    hint: "Think of the barista who knows your order or the person who cleans your office."
  },
  {
    question: "What is a joke that always makes you laugh, no matter how many times you hear it?",
    hint: "Be grateful for the friend who told it to you or the memory of that laughter."
  },
  {
    question: "Who is a teacher or mentor who believed in you when you didn't?",
    hint: "Reflect on how their belief changed your trajectory."
  },
  {
    question: "What is a specific thing a friend did recently that made you feel loved?",
    hint: "Focus on the 'little' things, like a check-in text or a shared meme."
  },
  {
    question: "What is a family tradition (born or chosen) that you cherish?",
    hint: "Describe the feeling of belonging that comes with this tradition."
  },
  {
    question: "Who is someone you can be your 'weirdest' self around?",
    hint: "Appreciate the freedom of not having to perform or mask."
  },
  {
    question: "What is a lesson a child or pet taught you recently?",
    hint: "They often teach us about presence, play, or unconditional love."
  },
  {
    question: "Who is a historical figure you’re grateful for?",
    hint: "Think of someone whose bravery or invention paved the way for your life."
  },
  {
    question: "What is a 'hard conversation' you had that actually improved a relationship?",
    hint: "Be grateful for the honesty and the bridge it built."
  },
  {
    question: "What is something you admire about your 'worst' enemy or a difficult person?",
    hint: "This is a master-level gratitude exercise. Find one neutral strength they have."
  },
  {
    question: "Who is the person in your life who always tells you the truth?",
    hint: "Be grateful for their honesty, even when it’s hard to hear."
  },
  {
    question: "What is a piece of art or music that makes you feel connected to humanity?",
    hint: "Reflect on the fact that someone else felt what you feel and made something from it."
  },
  {
    question: "Who is the most reliable person you know?",
    hint: "Think about the peace of mind their consistency gives you."
  },
  {
    question: "What is a random act of kindness you witnessed recently?",
    hint: "Focus on the feeling that the world is a kinder place than we think."
  },
  {
    question: "What is a quality in your partner or best friend that balances you out?",
    hint: "If you're a worrier, are they a 'grounder'?"
  },
  {
    question: "Who is someone you’ve lost who still influences you for the better?",
    hint: "Be grateful for the 'ghost' of their wisdom."
  },
  {
    question: "What is a 'small talk' moment that actually felt quite nice today?",
    hint: "Maybe it was a smile from a stranger or a quick laugh with a cashier."
  },
  {
    question: "Who is someone you can call at 2:00 AM?",
    hint: "Acknowledge the safety net that person provides."
  },
  {
    question: "What is a way that someone has surprised you for the better lately?",
    hint: "People can be more thoughtful than we give them credit for."
  },
  {
    question: "What is a 'thank you' you forgot to say but can feel now?",
    hint: "Write the 'thank you' here as if they are listening."
  },
  {
    question: "What is something in your fridge right now that you’re excited to eat?",
    hint: "Describe the flavor or the comfort it will provide."
  },
  {
    question: "What is your favorite 'cozy corner' in your home?",
    hint: "Why does this specific spot make you feel safe?"
  },
  {
    question: "What is a smell that instantly takes you to a happy place?",
    hint: "Think of rain on pavement, old books, or a specific perfume."
  },
  {
    question: "What is a piece of clothing that makes you feel like 'you'?",
    hint: "Focus on the confidence or comfort it provides."
  },
  {
    question: "What is a sound in nature that you find incredibly soothing?",
    hint: "Is it the wind in the trees, a rushing river, or birds at dawn?"
  },
  {
    question: "What is a luxury you have that you often take for granted?",
    hint: "Think of things like high-speed internet, hot water, or a soft pillow."
  },
  {
    question: "What is something beautiful you saw on your way to work or the store?",
    hint: "Look for the 'glimmers'—a flower in a sidewalk crack or a sunset."
  },
  {
    question: "What is your favorite time of day for lighting?",
    hint: "Is it 'golden hour,' or the blue light of dusk?"
  },
  {
    question: "What is an invention in your kitchen that you couldn't live without?",
    hint: "Think of the humble toaster, the microwave, or a sharp knife."
  },
  {
    question: "What is a plant or tree near you that you’ve noticed changing with the seasons?",
    hint: "Appreciate the steady, quiet rhythm of nature."
  },
  {
    question: "What is a texture you love to touch?",
    hint: "Think of velvet, smooth stones, or a pet’s fur."
  },
  {
    question: "What is a 'cheap' item you bought that has brought you massive joy?",
    hint: "A specific pen? A $1 plant? A funky mug?"
  },
  {
    question: "What is your favorite thing about the city or town you live in?",
    hint: "Think of a specific park, a library, or just the 'vibe.'"
  },
  {
    question: "What is a color you’ve been drawn to lately?",
    hint: "How does looking at this color make you feel?"
  },
  {
    question: "What is something in your environment that reminds you of a goal you reached?",
    hint: "A diploma, a trophy, or even a messy craft project."
  },
  {
    question: "What is a 'view' you have access to that never gets old?",
    hint: "Even if it’s just the view from your bedroom window."
  },
  {
    question: "What is a specific 'modern convenience' you are glad exists?",
    hint: "GPS? Air conditioning? Music streaming?"
  },
  {
    question: "What is something you use every day that was a gift?",
    hint: "Reflect on the person who gave it to you and their intent."
  },
  {
    question: "What is a song that makes you want to dance, even if you’re alone?",
    hint: "Be grateful for the physical impulse to move."
  },
  {
    question: "What is the most comfortable thing you own?",
    hint: "Describe the feeling of sinking into it at the end of a long day."
  },
  // Category 4: Hardships & Reframing
  {
    question: "What is a 'closed door' you are now glad you didn't walk through?",
    hint: "Think of a job you didn't get or a relationship that ended."
  },
  {
    question: "What is a struggle you had today that made you stronger?",
    hint: "Focus on the 'muscle' you built, like patience or resilience."
  },
  {
    question: "What is a 'mistake' you made that led to a surprising discovery?",
    hint: "Think of 'happy accidents' in cooking, work, or travel."
  },
  {
    question: "What is a boring task you do that actually provides you with stability?",
    hint: "Doing the laundry means you have clean clothes; be grateful for the 'system.'"
  },
  {
    question: "What is something you’ve lost that taught you the value of what you have?",
    hint: "Focus on the clarity that came after the loss."
  },
  {
    question: "What is a difficult emotion you felt today that you allowed yourself to feel?",
    hint: "Be grateful for your capacity to be honest with yourself."
  },
  {
    question: "What is a 'disaster' from your past that you can now laugh about?",
    hint: "Time plus tragedy equals comedy—be glad for the 'time' part."
  },
  {
    question: "What is a criticism you received that actually helped you grow?",
    hint: "Reframe the sting of the critique into the value of the growth."
  },
  {
    question: "What is something you are 'over' or 'done with' that used to bother you?",
    hint: "Be grateful for the emotional maturity of outgrowing a petty worry."
  },
  {
    question: "What is a 'hard' person in your life who has forced you to develop boundaries?",
    hint: "They are your 'boundary trainer'—be grateful for the skill they forced you to learn."
  },
  {
    question: "What is a time you felt 'at the bottom' and how did the climb up feel?",
    hint: "Appreciate your own 'bounce back' factor."
  },
  {
    question: "What is a physical scar you have and the story of survival it tells?",
    hint: "See it as a badge of experience rather than a blemish."
  },
  {
    question: "What is a 'rainy day' (literal or figurative) that allowed you to rest?",
    hint: "Be grateful for the permission to stop that the 'bad weather' gave you."
  },
  {
    question: "What is a doubt you had about yourself that you proved wrong?",
    hint: "Celebrate the 'I told you so' you gave to your inner critic."
  },
  {
    question: "What is a resource (money, time, help) that showed up just when you needed it?",
    hint: "Reflect on the feeling of 'just-in-time' support."
  },
  {
    question: "What is a 'no' that eventually led to a better 'yes'?",
    hint: "Trace the path from a disappointment to a current success."
  },
  {
    question: "What is something you’ve survived that you never thought you could?",
    hint: "Sit with the power of your own endurance."
  },
  {
    question: "What is a health scare or injury that made you appreciate your body more?",
    hint: "Focus on the relief of recovery or the lessons of the limitation."
  },
  {
    question: "What is a mess in your life right now that proves you are 'living'?",
    hint: "A messy kitchen means you ate; a messy desk means you worked."
  },
  {
    question: "What is a silence that was actually peaceful rather than lonely?",
    hint: "Distinguish between the two and appreciate the calm."
  },
  // Category 5: Modern Life & Small Miracles
  {
    question: "What is a piece of news you read today that was actually positive?",
    hint: "Seek out the 'good news' stories to balance the noise."
  },
  {
    question: "What is a 'synchronicity' or coincidence that happened lately?",
    hint: "Did you think of someone and then they called? Appreciate the mystery."
  },
  {
    question: "What is your favorite thing about the internet?",
    hint: "Focus on the access to information, memes, or connecting with loved ones."
  },
  {
    question: "What is a 'future invention' you are excited to see in your lifetime?",
    hint: "Be grateful for the era of rapid innovation we live in."
  },
  {
    question: "What is a holiday or celebration you’re looking forward to?",
    hint: "Enjoy the 'pre-gratitude' of the anticipation."
  },
  {
    question: "What is a specific animal you think is amazing?",
    hint: "Think of the complexity of a bee, the grace of a cat, or the vastness of a whale."
  },
  {
    question: "What is a 'made-up' holiday you want to celebrate (e.g., 'Self-Care Sunday')?",
    hint: "Be grateful for the agency to create your own joy."
  },
  {
    question: "What is something you can afford now that you couldn't five years ago?",
    hint: "Even if it's just 'the name-brand cereal.'"
  },
  {
    question: "What is a hobby you have that makes time disappear?",
    hint: "Be grateful for the state of 'flow.'"
  },
  {
    question: "What is a movie you’ve seen more than five times?",
    hint: "Why does it feel like 'home' to you?"
  },
  {
    question: "What is a smell in a grocery store that you love?",
    hint: "The bakery? The produce section? The coffee aisle?"
  },
  {
    question: "What is a 'small win' you had in traffic or transit today?",
    hint: "Getting all green lights or finding a seat on the train."
  },
  {
    question: "What is a podcast or YouTuber who makes you feel smarter?",
    hint: "Appreciate the free education available at your fingertips."
  },
  {
    question: "What is a way you’ve been able to help someone else lately?",
    hint: "Being useful to others is one of the greatest feelings; be grateful for the chance."
  },
  {
    question: "What is something you’re wearing right now that feels soft?",
    hint: "Focus entirely on the tactile comfort."
  },
  {
    question: "What is a 'secret' you have that makes you smile?",
    hint: "A surprise you're planning or a personal goal you're working on."
  },
  {
    question: "What is a weather pattern you find beautiful (even if others don't)?",
    hint: "Fog? Thunderstorms? Overcast skies?"
  },
  {
    question: "What is a way you’ve simplified your life recently?",
    hint: "Be grateful for the 'less' that gives you 'more.'"
  },
  {
    question: "What is a dream you had last night that was interesting or pleasant?",
    hint: "Be grateful for your brain's nighttime 'cinema.'"
  },
  // User-added prompts (categories 1-5)
  {
    question: "What is the feeling of \"relief\" you felt when a plan was canceled?",
    hint: "Be grateful for the gift of unexpected 'stolen' time for yourself."
  },
  {
    question: "What is a specific \"gut feeling\" that once protected you?",
    hint: "Thank your subconscious for working in the background to keep you safe."
  },
  {
    question: "What is the feeling of \"Awe\" you experienced recently?",
    hint: "Whether it was a massive mountain or a tiny bug, appreciate the feeling of being small."
  },
  {
    question: "What is a \"memory\" that feels like a warm hug whenever it pops up?",
    hint: "Be grateful for your brain’s ability to 'replay' joy whenever you need it."
  },
  {
    question: "What is the feeling of \"flow\" where you forgot what time it was?",
    hint: "Acknowledge the magic of being fully immersed in a task."
  },
  {
    question: "What is a \"secret\" you keep that makes you feel powerful or special?",
    hint: "Be grateful for the private world inside your own head."
  },
  {
    question: "What is a \"long-held belief\" you let go of that made you feel lighter?",
    hint: "Celebrate the mental flexibility required to unlearn something."
  },
  {
    question: "What is the feeling of \"nostalgia\" for a place you’ve never been?",
    hint: "Appreciate your imagination’s ability to travel through time and space."
  },
  {
    question: "What is a \"clumsy\" moment that made you laugh at yourself?",
    hint: "Be grateful for the humility and humor that comes with being human."
  },
  {
    question: "What is the feeling of \"satisfaction\" after a physical workout?",
    hint: "Focus on the chemical cocktail (endorphins) your body makes for free."
  },
  {
    question: "What is a \"lonely\" moment that actually taught you how to be your own friend?",
    hint: "Reframe solitude as a training ground for self-reliance."
  },
  {
    question: "What is the feeling of \"anticipation\" before a first date or a big trip?",
    hint: "Be grateful for the 'butterflies'—they mean you are still excited by life."
  },
  {
    question: "What is a \"nightmare\" you woke up from, feeling grateful it wasn't real?",
    hint: "Use the contrast to appreciate the safety of your actual bed."
  },
  {
    question: "What is the feeling of \"forgiving\" someone without them knowing?",
    hint: "Be grateful for the peace you gave yourself by letting go."
  },
  {
    question: "What is the feeling of \"total exhaustion\" that makes sleep feel like a miracle?",
    hint: "Appreciate the 'earned' rest that comes after a hard day's work."
  },
  {
    question: "What is the feeling of \"being understood\" without saying a word?",
    hint: "Think of a glance shared with a friend or partner that said everything."
  },
  {
    question: "What is the feeling of \"finding something you thought was lost\"?",
    hint: "Relive the tiny jolt of victory when the keys or the ring reappeared."
  },
  {
    question: "What is the feeling of \"bravery\" you felt when your voice shook but you spoke anyway?",
    hint: "Acknowledge that courage isn't the absence of fear, but the presence of action."
  },
  {
    question: "What is the feeling of \"being a regular\" somewhere?",
    hint: "Be grateful for the sense of belonging at a local shop or gym."
  },
  {
    question: "What is the feeling of \"home\" that isn't a physical building?",
    hint: "Maybe it’s a person, a song, or a specific hobby."
  },
  // Category 2 additions
  {
    question: "What is a \"spice\" in your cabinet that comes from halfway around the world?",
    hint: "Think of the history of the spice trade and how lucky we are to have it in a jar."
  },
  {
    question: "What is a \"foreign film\" or \"translated book\" that gave you a new perspective?",
    hint: "Be grateful for the bridge that art builds between different cultures."
  },
  {
    question: "What is a \"myth or legend\" from your ancestry that you love?",
    hint: "Appreciate the stories that were passed down through centuries to reach you."
  },
  {
    question: "What is a \"public transit\" system that moves thousands of people every day?",
    hint: "Think of the orchestration and the collective trust required to make it work."
  },
  {
    question: "What is a \"museum or gallery\" you’ve visited (or seen online)?",
    hint: "Be grateful for the curation and preservation of human history."
  },
  {
    question: "What is a \"holiday\" from another culture that you find beautiful?",
    hint: "Appreciate the diversity of ways humans celebrate being alive."
  },
  {
    question: "What is a \"street food\" or \"family recipe\" that feels like culture on a plate?",
    hint: "Focus on the labor and love that goes into traditional cooking."
  },
  {
    question: "What is a \"scientific instrument\" (like a telescope or microscope)?",
    hint: "Be grateful for the tools that allow us to see what is otherwise invisible."
  },
  {
    question: "What is a \"sport or game\" that brings people together across borders?",
    hint: "Think of the Olympics or a global video game community."
  },
  {
    question: "What is a \"non-profit or charity\" whose mission you admire?",
    hint: "Be grateful that there are people dedicated to solving problems you don't even see."
  },
  {
    question: "What is a \"type of architecture\" (Gothic, Modernist, etc.) that moves you?",
    hint: "Appreciate the human desire to make functional things beautiful."
  },
  {
    question: "What is a \"streaming service\" that gives you more music than a king had 100 years ago?",
    hint: "Reflect on the sheer abundance of human creativity at your fingertips."
  },
  {
    question: "What is a \"wild animal\" you’ve seen that felt like a \"glitch in the matrix\"?",
    hint: "Think of a hawk in the city or a deer in the yard—nature reclaiming space."
  },
  {
    question: "What is a \"social movement\" you’re glad happened before you were born?",
    hint: "Acknowledge the rights and freedoms you enjoy because others fought for them."
  },
  {
    question: "What is a \"piece of furniture\" that was handmade?",
    hint: "Be grateful for the craftsmanship and the time the creator spent on it."
  },
  {
    question: "What is a \"bridge\" (literal or figurative) you crossed today?",
    hint: "Think of the physical engineering or a conversation that resolved a conflict."
  },
  {
    question: "What is a \"local library\" and the fact that you can borrow anything for free?",
    hint: "It’s one of the last 'sacred' public spaces; appreciate its existence."
  },
  {
    question: "What is a \"language\" you find beautiful to listen to, even if you don't speak it?",
    hint: "Focus on the melody and the rhythm of the human voice."
  },
  {
    question: "What is an \"old map\" and how it shows the bravery of early explorers?",
    hint: "Be grateful that the world has been 'mapped' for your safety."
  },
  {
    question: "What is a \"sunrise\" you watched alone?",
    hint: "Appreciate the quiet start to a world that is about to get very loud."
  },
  // Category 3 additions
  {
    question: "What is your \"nervous system\" and its ability to feel a breeze?",
    hint: "Think of the millions of electrical impulses happening right now."
  },
  {
    question: "What is the \"reflex\" that made you catch something before it fell?",
    hint: "Thank your body for being faster than your conscious mind."
  },
  {
    question: "What is your \"immune system\" and a time it fought off a cold for you?",
    hint: "Imagine a tiny army inside you that never takes a day off."
  },
  {
    question: "What is the \"lungs\" and the automatic way they breathe while you sleep?",
    hint: "Be grateful for the 'autopilot' features of your biology."
  },
  {
    question: "What is your \"skin\" and its ability to heal a papercut?",
    hint: "Think of the complex 'repair crew' that knits your cells back together."
  },
  {
    question: "What is your \"liver or kidneys\" and how they filter your blood 24/7?",
    hint: "Appreciate the silent, internal cleaning service you never have to hire."
  },
  {
    question: "What is your \"eye’s ability\" to adjust from a dark room to a bright sun?",
    hint: "Focus on the aperture-like precision of your pupils."
  },
  {
    question: "What is your \"voice\" and the fact that no one else sounds exactly like you?",
    hint: "Be grateful for your unique sonic footprint in the world."
  },
  {
    question: "What is your \"sense of balance\" that allows you to walk without thinking?",
    hint: "Thank the tiny 'gyroscope' inside your inner ear."
  },
  {
    question: "What is your \"DNA\" and the billions of years of survival it took to get to you?",
    hint: "You are the current 'winner' of an unbroken chain of life."
  },
  {
    question: "What is the \"warmth\" of your own blood?",
    hint: "Focus on the heat your body generates just by being alive."
  },
  {
    question: "What is your \"ability to dream\" and the bizarre movies your brain makes?",
    hint: "Be grateful for the free, nightly entertainment in your subconscious."
  },
  {
    question: "What is your \"thumbs\" and the incredible things they allow you to do?",
    hint: "From texting to opening jars, appreciate the 'opposing' miracle."
  },
  {
    question: "What is your \"stomach\" and its ability to turn a sandwich into energy?",
    hint: "Think of your body as a high-tech power plant."
  },
  {
    question: "What is your \"tears\" and their ability to wash away emotional or physical pain?",
    hint: "Be grateful for the body’s 'pressure-release valve.'"
  },
  {
    question: "What is your \"knees\" and the thousands of steps they’ve taken for you?",
    hint: "Appreciate the shock absorbers that keep you moving."
  },
  {
    question: "What is your \"brain’s plasticity\" and the fact that you can learn something new today?",
    hint: "Be grateful that you aren't 'stuck' with the version of yourself you were yesterday."
  },
  {
    question: "What is your \"hair\" and how it protects your scalp or expresses your style?",
    hint: "Whether you have a lot or a little, appreciate its purpose."
  },
  {
    question: "What is your \"circadian rhythm\" and the way it knows when it’s time to rest?",
    hint: "Be grateful for the internal clock that syncs you with the planet."
  },
  {
    question: "What is your \"proprioception\" (knowing where your limbs are without looking)?",
    hint: "Close your eyes and touch your nose—that’s a biological superpower."
  },
  // Category 4 additions
  {
    question: "What is a \"junk drawer\" that always seems to have exactly what you need?",
    hint: "Be grateful for the chaos that contains the solution."
  },
  {
    question: "What is a \"bookmark\" that has traveled through many stories with you?",
    hint: "Appreciate the small object that holds your place in other worlds."
  },
  {
    question: "What is the \"first 10 minutes\" of your morning before you check your phone?",
    hint: "Be grateful for the 'sacred buffer' between you and the world."
  },
  {
    question: "What is a \"scented candle\" or \"incense\" that changes the mood of a room?",
    hint: "Appreciate how a tiny flame can create an atmosphere."
  },
  {
    question: "What is the \"weight\" of a physical book in your hands?",
    hint: "Focus on the tactile reality of holding someone else's thoughts."
  },
  {
    question: "What is a \"magnet\" on your fridge that reminds you of a trip?",
    hint: "Be grateful for the 'anchor' to a happy past moment."
  },
  {
    question: "What is a \"pair of socks\" with a fun pattern that only you know you're wearing?",
    hint: "Appreciate the small, private rebellions of joy."
  },
  {
    question: "What is a \"mug\" that fits your hand perfectly?",
    hint: "Think about the ergonomics and the comfort of that daily ritual."
  },
  {
    question: "What is the \"silence\" of a library or a house of worship?",
    hint: "Be grateful for places designed specifically for quiet."
  },
  {
    question: "What is the \"click\" of a mechanical keyboard or a light switch?",
    hint: "Appreciate the satisfying tactile feedback of a working world."
  },
  {
    question: "What is a \"water bottle\" that keeps you hydrated all day?",
    hint: "It’s a tiny, portable well; be grateful for the convenience."
  },
  {
    question: "What is an \"old hoodie\" that has seen you through many moods?",
    hint: "Be grateful for the 'uniform' of comfort."
  },
  {
    question: "What is the \"glow\" of a screen in a dark room (the light of information)?",
    hint: "Reframe the blue light as a window to the sum of human knowledge."
  },
  {
    question: "What is the \"steam\" from a hot shower on a cold morning?",
    hint: "Focus on the visual beauty of the vapor."
  },
  {
    question: "What is the \"smell of old paper\" in a used bookstore?",
    hint: "Be grateful for the 'scent of time' and shared history."
  },
  {
    question: "What is a \"clock\" that ticks quietly in the background?",
    hint: "Appreciate the steady rhythm of life moving forward."
  },
  {
    question: "What is the \"feeling of a rug\" under your bare feet?",
    hint: "Focus on the soft barrier between you and the hard floor."
  },
  {
    question: "What is a \"favorite pen\" that makes your handwriting look better?",
    hint: "Be grateful for the tools that make expression easier."
  },
  {
    question: "What is a \"power outlet\" and the fact that energy is just there?",
    hint: "Imagine the massive grid of wires working to charge your phone."
  },
  {
    question: "What is the \"lid\" on a coffee cup that prevents a mess?",
    hint: "Thank the tiny engineering detail that saved your shirt today."
  },
  // Category 5 additions
  {
    question: "What is a \"random conversation\" with a stranger that changed your day?",
    hint: "Be grateful for the 'NPC' who briefly became a main character."
  },
  {
    question: "What is a \"missed train\" that led you to see something beautiful?",
    hint: "Appreciate the 'detours' that lead to new discoveries."
  },
  {
    question: "What is a \"song on the radio\" that played exactly when you needed to hear it?",
    hint: "Be grateful for the 'universe’s playlist.'"
  },
  {
    question: "What is the \"chance meeting\" that led to your current job or partner?",
    hint: "Trace back the chain of events—how many tiny things had to go right?"
  },
  {
    question: "What is the \"weather\" on the day you were born?",
    hint: "Be grateful for the atmosphere that welcomed you to the world."
  },
  {
    question: "What is a \"book you found by accident\" in a thrift store?",
    hint: "Appreciate the 'serendipity' of the right book finding the right person."
  },
  {
    question: "What is a \"mistake\" someone else made that ended up benefiting you?",
    hint: "Be grateful for the weird, messy interconnectedness of people."
  },
  {
    question: "What is the \"exact distance\" of the Earth from the Sun?",
    hint: "If we were a few miles closer or further, we wouldn't exist. Be grateful for the 'Goldilocks Zone.'"
  },
  {
    question: "What is the \"gravity\" that keeps your feet on the ground?",
    hint: "Thank the earth for literally holding onto you."
  },
  {
    question: "What is the \"stardust\" that makes up your body?",
    hint: "Be grateful that you are literally made of ancient, exploded suns."
  },
  {
    question: "What is a \"rejection\" that saved you from a situation you weren't ready for?",
    hint: "Acknowledge the 'protective power' of the word No."
  },
  {
    question: "What is the \"internet connection\" that allowed you to read this?",
    hint: "Think of the light traveling through glass fibers under the ocean."
  },
  {
    question: "What is the \"oxygen\" being produced by a tree miles away from you?",
    hint: "Be grateful for your invisible, distant 'business partner' (the tree)."
  },
  {
    question: "What is a \"dream you had\" that gave you a creative idea?",
    hint: "Thank your brain for working overtime while you were 'off the clock.'"
  },
  {
    question: "What is the \"existence of dogs/cats\" and their choice to hang out with humans?",
    hint: "Be grateful for the inter-species friendship that makes life better."
  },
  {
    question: "What is a \"favor you did for someone\" that came back to you years later?",
    hint: "Appreciate the long-term 'karma' of kindness."
  },
  {
    question: "What is the \"safety\" of a roof over your head during a thunderstorm?",
    hint: "Listen to the rain and feel the gratitude for the barrier of the ceiling."
  },
  {
    question: "What is a \"skill your parents had\" that they taught you?",
    hint: "Be grateful for the 'living inheritance' of knowledge."
  },
  {
    question: "What is the \"possibility\" of tomorrow being the best day of your life?",
    hint: "Be grateful for the 'infinite potential' of the future."
  },
  {
    question: "What is the \"fact that you are reading the 300th prompt\"?",
    hint: "Be grateful for your own persistence and commitment to finding the good."
  },
  {
    question: "What is the very best thing about being you today?",
    hint: "Don't be humble. Identify one thing that makes your specific life worth living right now."
  },
  // Category: Sublime and Subtle (301-400)
  // Category 1: The Digital Landscape & Modern Tools (301-320)
  {
    question: "What is a \"keyboard shortcut\" that makes you feel like a wizard?",
    hint: "Be grateful for the tiny ways you’ve mastered your tools to save time."
  },
  {
    question: "What is \"Dark Mode\" and how does it protect your eyes at night?",
    hint: "Appreciate the developers who thought about your physical comfort."
  },
  {
    question: "What is the \"Undo\" button (Ctrl+Z) and the peace of mind it provides?",
    hint: "Reflect on the grace of having a digital 'second chance' for mistakes."
  },
  {
    question: "What is a \"high-resolution\" screen and the crispness it brings to your eyes?",
    hint: "Compare it to the grainy screens of the past and appreciate the clarity."
  },
  {
    question: "What is \"noise-canceling\" technology and the sanctuary it creates?",
    hint: "Be grateful for the ability to carry a 'cone of silence' into a loud world."
  },
  {
    question: "What is a \"cloud sync\" that allows you to start a task on one device and finish on another?",
    hint: "Appreciate the invisible threads connecting your digital life."
  },
  {
    question: "What is a \"software update\" that actually made your experience better?",
    hint: "Be grateful for the people who continue to work on improving things you already bought."
  },
  {
    question: "What is a \"Search\" bar’s ability to find one specific email from years ago?",
    hint: "Think of it as a digital 'perfect memory' at your service."
  },
  {
    question: "What is a \"podcaster’s voice\" that feels like a friend in your ear?",
    hint: "Appreciate the intimacy and education provided by modern audio."
  },
  {
    question: "What is the \"Find My Phone\" feature and the heart-stopping relief it provides?",
    hint: "Be grateful for the safety net that finds your most important tool."
  },
  {
    question: "What is \"autocorrect\" or \"predictive text\" when it actually saves you from a typo?",
    hint: "Thank the tiny AI that is trying its best to help you communicate."
  },
  {
    question: "What is an \"ad-blocker\" or a \"do not disturb\" mode?",
    hint: "Appreciate the tools that help you protect your attention."
  },
  {
    question: "What is a \"video call\" and the ability to see a loved one’s micro-expressions from miles away?",
    hint: "Focus on the visual connection that a phone call can't provide."
  },
  {
    question: "What is a \"tutorial\" you watched that helped you fix something yourself?",
    hint: "Be grateful for the global community that shares knowledge for free."
  },
  {
    question: "What is \"Wi-Fi\" in a public place (like a park or cafe)?",
    hint: "Appreciate the invisible data 'air' that keeps you connected."
  },
  {
    question: "What is an \"app\" that helps you track your health or habits?",
    hint: "Be grateful for the mirror that data holds up to your progress."
  },
  {
    question: "What is the \"seamlessness\" of a contactless payment?",
    hint: "Reflect on the speed and magic of paying with a tap."
  },
  {
    question: "What is a \"playlist algorithm\" that introduced you to your new favorite song?",
    hint: "Thank the math that understood your soul's taste."
  },
  {
    question: "What is the \"battery life\" on your current device?",
    hint: "Be grateful for the stored energy that gives you hours of freedom."
  },
  {
    question: "What is \"open-source\" software and the spirit of people building for the common good?",
    hint: "Appreciate the internet's 'gift economy' where people share code for free."
  },
  // Category 2: Aesthetics, Design & Fashion (321-340)
  {
    question: "What is a \"font\" or \"typeface\" (like Georgia or Helvetica) that is easy on your eyes?",
    hint: "Be grateful for the typographers who obsess over the shape of a letter 'g'."
  },
  {
    question: "What is a \"well-designed chair\" and the way it supports your lower back?",
    hint: "Focus on the marriage of art and engineering in everyday objects."
  },
  {
    question: "What is a \"color palette\" in your room that makes you feel a certain way?",
    hint: "Appreciate the intentionality of the colors you choose to live in."
  },
  {
    question: "What is a \"zipper\" and the satisfying way it closes a bag or coat?",
    hint: "Thank the simple mechanical genius of interlocking teeth."
  },
  {
    question: "What is a \"fabric\" (like linen or silk) and the way it feels against your skin?",
    hint: "Be grateful for the natural and synthetic textures that protect us."
  },
  {
    question: "What is the \"branding\" or \"packaging\" of a product that made you feel special opening it?",
    hint: "Acknowledge the care put into the 'unboxing' experience."
  },
  {
    question: "What is a \"logo\" or \"symbol\" that gives you a sense of trust or community?",
    hint: "Appreciate how visual shorthand connects us to ideas."
  },
  {
    question: "What is a \"perfume or cologne\" and the invisible \"vibe\" it projects?",
    hint: "Be grateful for the art of chemistry and scent."
  },
  {
    question: "What is a \"tailored\" item of clothing that fits you perfectly?",
    hint: "Focus on the confidence that comes from something made for your body."
  },
  {
    question: "What is a \"streetscape\" (the way buildings and trees look together)?",
    hint: "Appreciate the urban planners and architects who shaped your view."
  },
  {
    question: "What is the \"symmetry\" in a flower or a building?",
    hint: "Be grateful for the mathematical beauty found in the world."
  },
  {
    question: "What is a \"thrifted\" item and the history it carries with it?",
    hint: "Appreciate the cycle of reuse and the stories of previous owners."
  },
  {
    question: "What is a \"jewelry\" piece you wear every day?",
    hint: "Reflect on why this small object is an essential part of your identity."
  },
  {
    question: "What is the \"minimalism\" of a clean, empty space?",
    hint: "Be grateful for the mental breathing room that 'less' provides."
  },
  {
    question: "What is \"maximalism\"—the joy of having all your favorite things on display?",
    hint: "Celebrate the abundance and personality of a full shelf."
  },
  {
    question: "What is a \"staircase\" that feels like a work of art?",
    hint: "Appreciate the rhythm and elevation of a well-built set of stairs."
  },
  {
    question: "What is a \"window\" that frames a view like a painting?",
    hint: "Thank the designer who decided where the light should come in."
  },
  {
    question: "What is the \"patina\" on an old leather bag or wooden table?",
    hint: "Be grateful for the beauty that only comes with age and use."
  },
  {
    question: "What is \"fashion\" as a way to tell the world who you are without speaking?",
    hint: "Appreciate the creative agency you have every morning when you get dressed."
  },
  {
    question: "What is a \"museum shop\" or a \"boutique\" where everything is curated?",
    hint: "Be grateful for the 'eye' of the person who put those objects together."
  },
  // Category 3: Social Micro-Dynamics (341-360)
  {
    question: "What is the \"shared glance\" with a stranger when something weird happens in public?",
    hint: "Be grateful for the 'silent community' of bystanders."
  },
  {
    question: "What is a \"nod of respect\" from someone who knows you’re working hard?",
    hint: "Focus on the non-verbal validation that keeps you going."
  },
  {
    question: "What is the \"get home safe\" text message?",
    hint: "Appreciate the low-effort, high-impact way people show they care."
  },
  {
    question: "What is someone \"holding the elevator\" for you?",
    hint: "Be grateful for the person who chose to wait so you wouldn't have to."
  },
  {
    question: "What is the \"sound of a loved one's keys\" in the door?",
    hint: "Reflect on the instant feeling of safety that sound provides."
  },
  {
    question: "What is an \"inside joke\" that requires only one word to trigger a laugh?",
    hint: "Thank the shared history that created that mental shortcut."
  },
  {
    question: "What is a \"neighbor\" who takes your trash cans in or waves from the porch?",
    hint: "Be grateful for the 'soft security' of a friendly neighborhood."
  },
  {
    question: "What is the \"silence\" between you and a best friend that isn't awkward?",
    hint: "Acknowledge the depth of comfort required to be quiet together."
  },
  {
    question: "What is a \"handwritten\" note on a sticky pad or a napkin?",
    hint: "Focus on the physical touch and effort of a pen on paper."
  },
  {
    question: "What is someone \"remembering a small detail\" about your life?",
    hint: "Be grateful for the attention they paid when you were talking."
  },
  {
    question: "What is the \"apology\" that was hard for someone to say, but they said it?",
    hint: "Appreciate the humility and the effort to repair the bond."
  },
  {
    question: "What is a \"hug\" that lasts just a few seconds longer than usual?",
    hint: "Feel the physical transfer of support and grounding."
  },
  {
    question: "What is the \"enthusiasm\" someone has when they talk about their hobby?",
    hint: "Be grateful for the 'vicarious joy' of seeing someone else happy."
  },
  {
    question: "What is the \"grace\" someone showed you when you were at your worst?",
    hint: "Reflect on the 'debt of kindness' you now have the power to pay forward."
  },
  {
    question: "What is a \"random compliment\" from a stranger in a bathroom or a queue?",
    hint: "Be grateful for the person who went out of their way to be nice for no reason."
  },
  {
    question: "What is the \"sound of a crowd\" cheering (at a concert or game)?",
    hint: "Appreciate the feeling of being part of a 'collective soul.'"
  },
  {
    question: "What is someone \"offering you their seat\" or \"making space\" for you?",
    hint: "Be grateful for the small sacrifices people make for your comfort."
  },
  {
    question: "What is a \"goodbye\" that feels like a \"see you soon\"?",
    hint: "Thank the relationship for being consistent and reliable."
  },
  {
    question: "What is the \"praise\" you gave someone else that made you feel good?",
    hint: "Acknowledge the 'selfish' benefit of being kind."
  },
  {
    question: "What is the \"humor\" in a tense situation that broke the ice?",
    hint: "Be grateful for the person who had the courage to be funny when it was hard."
  },
  // Category 4: Deeper Biological Systems (361-380)
  {
    question: "What is your \"eyelashes\" and their job as tiny gatekeepers for your eyes?",
    hint: "Thank the small, delicate shield that keeps dust away."
  },
  {
    question: "What is your \"fingerprints\" and the unique texture they give you for gripping?",
    hint: "Appreciate the marriage of identity and functionality."
  },
  {
    question: "What is \"sweat\" and the incredible cooling system it provides?",
    hint: "Reframe a 'gross' feeling as a sign of a high-performance engine."
  },
  {
    question: "What is \"shivering\" and your body’s attempt to create heat from friction?",
    hint: "Be grateful for the 'emergency heater' built into your muscles."
  },
  {
    question: "What is your \"white blood cells\" and the silent battles they win every day?",
    hint: "Imagine the 'inner peace' maintained by your microscopic army."
  },
  {
    question: "What is your \"tongue\" and its ability to distinguish between sweet, salty, sour, and bitter?",
    hint: "Focus on the safety and pleasure provided by this muscle."
  },
  {
    question: "What is \"muscle memory\" (like typing or playing an instrument)?",
    hint: "Be grateful for the 'pre-loaded' skills stored in your physical self."
  },
  {
    question: "What is \"bone density\" and the scaffolding that holds you upright?",
    hint: "Thank the 'living stone' inside you that supports your weight."
  },
  {
    question: "What is \"sleep pressure\" (adenosine) and the way it forces you to rest?",
    hint: "Be grateful for the 'automatic shutdown' that prevents burnout."
  },
  {
    question: "What is \"pupil dilation\" and the way your eyes hunt for light?",
    hint: "Focus on the precision engineering of your vision."
  },
  {
    question: "What is your \"nose\" as a filter and a heater for the air you breathe?",
    hint: "Thank your nose for prepping the air before it hits your lungs."
  },
  {
    question: "What is \"clotting\" and the way a wound stops bleeding on its own?",
    hint: "Be grateful for the 'emergency sealant' in your blood."
  },
  {
    question: "What is \"joint fluid\" (synovial fluid) and the way it greases your movement?",
    hint: "Appreciate the 'internal oil' that allows for smooth motion."
  },
  {
    question: "What is \"fever\" and your body’s attempt to burn out an invader?",
    hint: "Reframe the discomfort as a sign that your system is fighting for you."
  },
  {
    question: "What is \"hormones\" (like oxytocin) and the way they make you feel love?",
    hint: "Be grateful for the 'biological poetry' that connects us to others."
  },
  {
    question: "What is your \"stomach acid\" and its incredible power to break down food?",
    hint: "Thank the 'internal alchemy' that turns lunch into life."
  },
  {
    question: "What is your \"spine\" as a highway for information?",
    hint: "Focus on the 'electrical cables' (nerves) that carry your thoughts to your toes."
  },
  {
    question: "What is your \"sense of smell\" and its direct link to your memory center?",
    hint: "Be grateful for the 'time machine' in your nose."
  },
  {
    question: "What is your \"voice box\" (larynx) and the ability to turn air into song or speech?",
    hint: "Appreciate the 'wind instrument' you were born with."
  },
  {
    question: "What is \"neuroplasticity\" and your ability to literally \"change your mind\"?",
    hint: "Be grateful that your brain is a 'work in progress' until the very end."
  },
  // Category 5: Time, Seasons & Perspectives (381-400)
  {
    question: "What is the \"first day of a new year\" and the feeling of a clean slate?",
    hint: "Be grateful for the 'human invention of time' that allows us to start over."
  },
  {
    question: "What is \"Golden Hour\"—that specific time before sunset?",
    hint: "Focus on how the light changes the value of everything it touches."
  },
  {
    question: "What is the \"wisdom of an elder\" you know?",
    hint: "Appreciate the 'living library' that is an older person's life."
  },
  {
    question: "What is a \"child’s perspective\" on something you find boring?",
    hint: "Be grateful for the 'beginner's mind' that can find joy in a cardboard box."
  },
  {
    question: "What is the \"cycle of the moon\" and the way it grounds you in cosmic time?",
    hint: "Thank the moon for being a consistent 'night light' for the planet."
  },
  {
    question: "What is the \"smell of the air\" right before it snows or rains?",
    hint: "Be grateful for the 'sensory warning' that nature provides."
  },
  {
    question: "What is a \"tradition\" that has been in your family for three generations?",
    hint: "Reflect on the 'unbroken chain' of behavior that connects you to ancestors."
  },
  {
    question: "What is the \"patience\" you’ve developed over the last five years?",
    hint: "Celebrate the 'slow growth' that you didn't even notice happening."
  },
  {
    question: "What is a \"photo of your younger self\" and the kindness you feel for that person?",
    hint: "Be grateful for the version of you that survived so 'current you' could exist."
  },
  {
    question: "What is the \"quietness\" of 3:00 AM?",
    hint: "Appreciate the rare moments when the 'world machine' is at rest."
  },
  {
    question: "What is \"hope\" as a biological survival mechanism?",
    hint: "Thank your brain for the ability to keep looking forward even in the dark."
  },
  {
    question: "What is the \"concept of a weekend\" and the collective permission to rest?",
    hint: "Be grateful for the societal agreement that work isn't everything."
  },
  {
    question: "What is the \"vastness of the ocean\" and the perspective it gives you?",
    hint: "Focus on how 'big problems' feel small when faced with the infinite blue."
  },
  {
    question: "What is \"language\" as a way to share a thought from inside your head to someone else's?",
    hint: "Be grateful for the 'telepathy' we call talking."
  },
  {
    question: "What is \"fire\"—from a candle to a fireplace—and its role in human history?",
    hint: "Thank the element that kept our ancestors warm and safe."
  },
  {
    question: "What is the \"freedom\" to move your body in space?",
    hint: "Whether it’s walking, dancing, or stretching, celebrate the 'yes' of movement."
  },
  {
    question: "What is \"grief\" as a proof of how much you loved someone?",
    hint: "Reframe the pain as the 'receipt' for a high-value relationship."
  },
  {
    question: "What is the \"fact that you are aging\" and what that means for your experience?",
    hint: "Be grateful for the 'accumulated data' of a long life."
  },
  {
    question: "What is \"luck\" and the times it has swung in your favor?",
    hint: "Acknowledge the 'invisible helping hand' you didn't earn."
  },
  {
    question: "What is the \"next breath\" you are about to take?",
    hint: "Be grateful for the 'now'—the only thing that actually exists."
  },
  // User-added set: curiosity, workplace, infrastructure, sensory, philosophical (100 prompts)
  {
    question: "What is a \"fun fact\" you know that always delights people?",
    hint: "Be grateful for your curiosity and your ability to entertain others."
  },
  {
    question: "What is a language (or slang) you’re glad you understand?",
    hint: "Think about how this specific way of speaking connects you to a culture or group."
  },
  {
    question: "What is a complex idea you finally \"clicked\" with recently?",
    hint: "Celebrate the 'Aha!' moment when something difficult became clear."
  },
  {
    question: "Which \"free\" resource (like Wikipedia or a library) do you use most?",
    hint: "Imagine how much harder it would be to learn without this open access."
  },
  {
    question: "What is a specific color combination that makes you feel peaceful?",
    hint: "Notice the art in your daily life, like a sunset against a blue building."
  },
  {
    question: "What is a question someone asked you that made you think deeply?",
    hint: "Be grateful for people who challenge your perspective."
  },
  {
    question: "What is a \"thought experiment\" or philosophy that helps you stay grounded?",
    hint: "Think of ideas like Stoicism, or the 'this too shall pass' mindset."
  },
  {
    question: "What is a piece of \"bad\" art or a \"cheesy\" movie you love anyway?",
    hint: "Appreciate your own unique taste and the joy it brings you."
  },
  {
    question: "What is a scientific discovery that makes you feel safer?",
    hint: "Think of things like germ theory, gravity, or electricity."
  },
  {
    question: "What is a craft or \"DIY\" project you finished, even if it’s not perfect?",
    hint: "Be grateful for the coordination between your mind and your hands."
  },
  {
    question: "What is a mystery in the world that you enjoy not knowing the answer to?",
    hint: "Appreciate the sense of wonder that comes from the unknown."
  },
  {
    question: "What is a metaphor that perfectly describes your life right now?",
    hint: "Be glad for the creative brain that allows you to see patterns."
  },
  {
    question: "What is a podcast or book that makes you feel like you’re part of a conversation?",
    hint: "Acknowledge the 'parasocial' friends who keep you company."
  },
  {
    question: "What is a word in another language that has no English equivalent but you love?",
    hint: "Appreciate how words shape our feelings."
  },
  {
    question: "What is a \"brain game\" or puzzle (like Sudoku or Wordle) you enjoy?",
    hint: "Be grateful for your brain’s desire to solve problems."
  },
  {
    question: "What is a \"historical era\" you’re glad you didn’t have to live through?",
    hint: "Use the past to appreciate the comforts of 2026."
  },
  {
    question: "What is a specific map or GPS feature that has saved you from getting lost?",
    hint: "Think about the invisible satellites working just for you."
  },
  {
    question: "What is a poem or song lyric that feels like it was written for you?",
    hint: "Be grateful for the artist who put your feelings into words."
  },
  {
    question: "What is a \"logical\" part of your brain that you appreciate?",
    hint: "Thank your mind for its ability to organize and plan."
  },
  {
    question: "What is a \"creative\" spark you had this week, even if you didn't act on it?",
    hint: "Appreciate the 'antenna' in your head that picks up new ideas."
  },
  // Category 2: Workplace & Productivity (21-40)
  {
    question: "What is a specific shortcut or 'hack' you use at work?",
    hint: "Be grateful for your own efficiency and cleverness."
  },
  {
    question: "Who is a colleague who makes the workday go by faster?",
    hint: "Focus on the humor or the shared 'struggle' that bonds you."
  },
  {
    question: "What is a piece of stationery (a pen, a notebook) that you love using?",
    hint: "Notice how the right tool makes the work feel more satisfying."
  },
  {
    question: "What is a 'boring' meeting that actually provided a moment of clarity?",
    hint: "Look for the one useful sentence in an hour of talk."
  },
  {
    question: "What is a professional boundary you’ve successfully maintained?",
    hint: "Thank yourself for protecting your time and energy."
  },
  {
    question: "What is a 'work-from-home' (or 'commute') perk you enjoy?",
    hint: "Is it the cozy socks or the specific podcast you listen to on the train?"
  },
  {
    question: "What is a task you’re 'the expert' at in your circle?",
    hint: "Feel the confidence that comes with being the go-to person."
  },
  {
    question: "What is a piece of feedback that was hard to hear but made you better?",
    hint: "Be grateful for the growth that came from the sting."
  },
  {
    question: "What is a 'Friday afternoon' feeling you’ve had recently?",
    hint: "Describe the physical relief of a finished week."
  },
  {
    question: "What is a tool or software that does the 'heavy lifting' for you?",
    hint: "Think of Excel, AI, or even just a calculator."
  },
  {
    question: "What is a 'work win' you didn't tell anyone about?",
    hint: "Celebrate the quiet satisfaction of a job well done."
  },
  {
    question: "What is a clean 'To-Do' list or a cleared inbox feeling like?",
    hint: "Focus on the mental space that opens up when things are done."
  },
  {
    question: "What is a coffee shop or workspace that helps you focus?",
    hint: "Be grateful for the environment that supports your goals."
  },
  {
    question: "What is a mentor who taught you what not to do?",
    hint: "Sometimes seeing a bad example is the best education."
  },
  {
    question: "What is a 'difficult' client or customer who taught you patience?",
    hint: "They are your 'patience gym'—be glad for the workout."
  },
  {
    question: "What is the feeling of taking your work shoes off?",
    hint: "Focus on the literal transition from 'doing' to 'being.'"
  },
  {
    question: "What is a benefit your job provides (health insurance, a paycheck, social time)?",
    hint: "Be grateful for the 'foundation' the job builds for your real life."
  },
  {
    question: "What is a project you finished that you never have to do again?",
    hint: "Feel the sweet relief of 'completion.'"
  },
  {
    question: "What is a way you’ve helped a teammate lately?",
    hint: "Be grateful for the capacity to be a resource for others."
  },
  {
    question: "What is a 'break room' or 'water cooler' conversation that made you smile?",
    hint: "Appreciate the small human moments in a professional setting."
  },
  // Category 3: Invisible Infrastructure (41-60)
  {
    question: "What is a bridge or road you use often that is actually an engineering marvel?",
    hint: "Think about the thousands of people who built it for your convenience."
  },
  {
    question: "What is a public service (trash pickup, mail, fire department) you are glad for?",
    hint: "Imagine your life if these systems stopped for just one week."
  },
  {
    question: "What is a 'standardized' thing (like USB ports or light bulbs) that makes life easy?",
    hint: "Be grateful for the people who agreed on one way to do things."
  },
  {
    question: "What is a 'warning label' that actually helped you stay safe?",
    hint: "Appreciate the hidden 'guardians' who look out for you."
  },
  {
    question: "What is a grocery store 'supply chain' miracle (like eating strawberries in winter)?",
    hint: "Think of the global effort required to put that one item in your hand."
  },
  {
    question: "What is a 'sensor' (like a motion-light or an automatic door) you appreciate?",
    hint: "It’s like a tiny robot waiting to serve you."
  },
  {
    question: "What is the 'cloud' (digital storage) doing for your memories?",
    hint: "Be grateful your photos are safe even if you lose your phone."
  },
  {
    question: "What is a 'quiet' law or rule that keeps your neighborhood peaceful?",
    hint: "Think of noise ordinances or traffic lights."
  },
  {
    question: "What is a 'subscription' that is actually worth every penny?",
    hint: "Does it save you time, or bring you constant joy?"
  },
  {
    question: "What is a 'customer support' person who actually solved your problem?",
    hint: "Remember the relief of talking to a human who cared."
  },
  {
    question: "What is a 'packaging' design that is surprisingly clever?",
    hint: "Think of a 'tear here' strip that actually worked."
  },
  {
    question: "What is a 'public park' or green space maintained by your taxes?",
    hint: "Be grateful for the 'shared backyard' you have access to."
  },
  {
    question: "What is a 'weather forecast' that helped you plan your day?",
    hint: "Appreciate the scientists who predict the future."
  },
  {
    question: "What is a 'refrigerator' noise or a 'fan' hum that means things are working?",
    hint: "Learn to love the 'sounds of a working home.'"
  },
  {
    question: "What is a 'bank app' or 'digital payment' that saves you a trip to the bank?",
    hint: "Think about the hours of 'errand time' you’ve saved."
  },
  {
    question: "What is a 'street performer' or 'public art' you saw recently?",
    hint: "Be grateful for people who add beauty to the streets for free."
  },
  {
    question: "What is a 'drain' or 'gutter' that keeps your house from flooding?",
    hint: "Thank the 'unseen' parts of your home for doing their job."
  },
  {
    question: "What is a 'time zone' that allows you to talk to someone far away?",
    hint: "Be grateful for the math that keeps the world synchronized."
  },
  {
    question: "What is a 'pharmacy' or 'clinic' nearby?",
    hint: "Feel the safety of knowing help is close by if you need it."
  },
  {
    question: "What is a 'seatbelt' or 'airbag' in your car?",
    hint: "Acknowledge the invisible safety net surrounding you while you drive."
  },
  // Category 4: Niche Sensory & Micro-Gratitude (61-80)
  {
    question: "What is the feeling of your head hitting a cool pillow?",
    hint: "Focus on the temperature change and the instant relaxation."
  },
  {
    question: "What is the 'crunch' of a specific food (like a chip or an apple)?",
    hint: "Appreciate the auditory and tactile experience of eating."
  },
  {
    question: "What is the 'new car' or 'new book' smell?",
    hint: "Why does that scent signal a 'fresh start' to you?"
  },
  {
    question: "What is the feeling of a heavy blanket in winter?",
    hint: "Focus on the 'pressure' and how it makes you feel protected."
  },
  {
    question: "What is the sight of 'dust motes' dancing in a sunbeam?",
    hint: "Look for the beauty in the tiny, everyday things."
  },
  {
    question: "What is the sound of 'white noise' (rain, a fan, a hum) while you sleep?",
    hint: "Be grateful for the 'blanket of sound' that drowns out the world."
  },
  {
    question: "What is the taste of 'perfectly cold' water when you are thirsty?",
    hint: "Focus on the sensation of life-giving hydration."
  },
  {
    question: "What is the 'first bite' of a meal when you are truly hungry?",
    hint: "Notice how the flavor is intensified by your body's need."
  },
  {
    question: "What is the feeling of 'stretching' your muscles after sitting too long?",
    hint: "Be grateful for the 'release' and the flexibility of your body."
  },
  {
    question: "What is the sound of your own laughter?",
    hint: "When was the last time you heard it? Be glad it exists."
  },
  {
    question: "What is the feeling of 'clean skin' after a long day?",
    hint: "Appreciate the transition from 'the world' to 'your home.'"
  },
  {
    question: "What is the sight of a 'full moon' or a 'starry night'?",
    hint: "Be grateful for the perspective the universe provides."
  },
  {
    question: "What is the smell of 'baking bread' or 'toasting nuts'?",
    hint: "Why does a warm smell feel like safety?"
  },
  {
    question: "What is the feeling of 'sand between your toes' or 'grass on your feet'?",
    hint: "Acknowledge the direct connection to the earth."
  },
  {
    question: "What is the 'pop' of a cork or the 'fizz' of a soda?",
    hint: "Appreciate the festive sound of a simple pleasure."
  },
  {
    question: "What is the feeling of 'holding hands' with someone you care about?",
    hint: "Focus on the warmth and the silent communication."
  },
  {
    question: "What is the 'steam' rising from a bowl of soup?",
    hint: "Look at the patterns in the vapor—it’s a tiny, temporary dance."
  },
  {
    question: "What is the sight of 'organized' things (like a spice rack or a bookshelf)?",
    hint: "Be grateful for the 'order' you’ve created in your world."
  },
  {
    question: "What is the feeling of a 'hot towel' or 'warm laundry'?",
    hint: "It’s like a hug from a machine."
  },
  {
    question: "What is the sound of 'morning birds' before the traffic starts?",
    hint: "Be grateful for the 'first shift' of nature."
  },
  // Category 5: Philosophical & Time-Based (81-100)
  {
    question: "What is a 'long-term' goal you’ve stopped worrying about?",
    hint: "Be grateful for the 'peace of mind' that comes with letting go."
  },
  {
    question: "What is a 'generational' gift you have (a trait from your grandma, etc.)?",
    hint: "See yourself as a link in a very long, successful chain."
  },
  {
    question: "What is the 'future you' going to thank you for doing today?",
    hint: "Be grateful for your own discipline and foresight."
  },
  {
    question: "What is a 'historical event' you witnessed that changed you?",
    hint: "Acknowledge your role as a witness to history."
  },
  {
    question: "What is a 'secret talent' you have that you rarely use?",
    hint: "Be glad you have 'extra' parts of yourself kept in reserve."
  },
  {
    question: "What is a 'tradition' you started for yourself (not inherited)?",
    hint: "Celebrate your agency to create your own meaning."
  },
  {
    question: "What is a 'deeper truth' you’ve discovered about life?",
    hint: "Be grateful for the wisdom that only comes with time."
  },
  {
    question: "What is a 'person from your past' you haven't seen in years but still think of fondly?",
    hint: "Be grateful for the 'footprint' they left on your soul."
  },
  {
    question: "What is a 'mistake' you are glad you made young?",
    hint: "Thank your younger self for getting that lesson out of the way early."
  },
  {
    question: "What is a 'seasonal' food you can only get right now?",
    hint: "Appreciate the 'scarcity' that makes it taste better."
  },
  {
    question: "What is a 'boring' Sunday afternoon?",
    hint: "Why is 'nothing to do' actually a massive luxury?"
  },
  {
    question: "What is a 'physical object' you want to pass down to someone else one day?",
    hint: "Be grateful for the stories attached to your belongings."
  },
  {
    question: "What is a 'habit' you broke that was holding you back?",
    hint: "Celebrate the 'freedom' of no longer being controlled by it."
  },
  {
    question: "What is a 'compliment' you gave yourself today?",
    hint: "Be grateful for the internal 'best friend' you are becoming."
  },
  {
    question: "What is a 'small coincidence' that felt like a sign?",
    hint: "Even if it’s just luck, be grateful for the 'magic' feeling."
  },
  {
    question: "What is a 'letter' or 'email' you’re glad you didn't send?",
    hint: "Thank your 'cool-down' period for saving you from a mess."
  },
  {
    question: "What is a 'part of your personality' that is exactly like one of your parents?",
    hint: "Look for the 'good' version of that trait and be glad for the inheritance."
  },
  {
    question: "What is a 'city' or 'landscape' you’ve only seen in pictures but want to visit?",
    hint: "Be grateful for the 'wanderlust' that keeps you curious."
  },
  {
    question: "What is the feeling of \"waking up\" before your alarm goes off?",
    hint: "Appreciate the extra 'gift' of time you didn't expect."
  },
  {
    question: "What is the 'one thing' that, if you lost everything else, would still make life worth it?",
    hint: "Identify your 'core' gratitude—the pilot light that never goes out."
  },
  {
    question: "Which of these categories do you think will be the hardest for you to answer honestly?",
    hint: "Acknowledge the challenge and commit to the journey."
  }
];

export default function Journal() {
  const navigate = useNavigate();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<{prompt: string, answer: string, date: string}[]>([
    {
      prompt: "What is a habit you’ve built that you’re proud of?",
      answer: "Not smoking all day",
      date: new Date().toLocaleDateString()
    },
    {
      prompt: "What part of your body do you often overlook but are grateful for today?",
      answer: "My fingers",
      date: new Date().toLocaleDateString()
    },
    {
      prompt: "What is a personality trait of yours that has helped you in a crisis?",
      answer: "I can sell icicles to eskimos and sand to the arrab s also my honesty",
      date: new Date().toLocaleDateString()
    }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNext = () => {
    if (currentPromptIndex < INITIAL_PROMPTS.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    } else {
      setCurrentPromptIndex(0);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const newEntry = {
      prompt: INITIAL_PROMPTS[currentPromptIndex].question,
      answer: answer,
      date: new Date().toLocaleDateString()
    };

    setHistory([newEntry, ...history]);
    setAnswer("");
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      handleNext();
    }, 2000);
  };

  return (
    <div className="min-h-screen stripe-pattern p-4 md:p-8 relative">
      {/* Blessed Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50, rotate: -10 }}
              animate={{ 
                scale: [0.5, 1.2, 1], 
                y: 0, 
                rotate: 0,
                textShadow: [
                  "0 0 20px #FF1493",
                  "0 0 40px #FF1493",
                  "0 0 20px #FF1493"
                ] 
              }}
              className="p-8 border-8 border-neon-pink bg-white shadow-[0_0_50px_#FF1493]"
            >
              <h1 className="text-8xl md:text-9xl font-display font-black text-black italic tracking-tighter uppercase leading-none px-8 py-4">
                Blessed
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto text-black relative z-10">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-black bg-white px-4 py-2 rounded-full font-bold uppercase tracking-tighter mb-8 hover:bg-neon-pink hover:text-white transition-colors border-2 border-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Entry Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black p-8 rounded-3xl border-4 border-neon-pink shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles className="w-12 h-12 text-neon-pink" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-display italic text-neon-pink flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Reflect
              </h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleNext}
                  className="text-xs font-bold uppercase tracking-tighter text-white/50 hover:text-neon-pink transition-colors flex items-center gap-1"
                >
                  Skip Question
                  <SkipForward className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    const seen = new Set(history.map(h => h.prompt));
                    const unseen = INITIAL_PROMPTS
                      .map((p, i) => seen.has(p.question) ? -1 : i)
                      .filter(i => i !== -1) as number[];
                    if (unseen.length === 0) {
                      const rand = Math.floor(Math.random() * INITIAL_PROMPTS.length);
                      setCurrentPromptIndex(rand);
                    } else {
                      const rand = unseen[Math.floor(Math.random() * unseen.length)];
                      setCurrentPromptIndex(rand);
                    }
                  }}
                  className="text-xs font-bold uppercase tracking-tighter text-white/50 hover:text-neon-pink transition-colors flex items-center gap-1"
                >
                  Surprise Me
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromptIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8 min-h-[140px]"
              >
                <p className="text-xl font-bold italic mb-2">"{INITIAL_PROMPTS[currentPromptIndex].question}"</p>
                {INITIAL_PROMPTS[currentPromptIndex].hint && (
                  <p className="text-sm text-neon-pink/80 font-medium italic">
                    Hint: {INITIAL_PROMPTS[currentPromptIndex].hint}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your heart out..."
                className="w-full h-40 bg-white/10 border-2 border-white/20 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-pink transition-colors resize-none"
              />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-neon-pink py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-neon-pink transition-all border-2 border-neon-pink disabled:opacity-50"
                disabled={!answer.trim() || showSuccess}
              >
                {showSuccess ? "Entry Saved!" : "Save Moment"}
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* History Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 p-8 rounded-3xl border-4 border-black shadow-2xl h-fit lg:max-h-[600px] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Your Blessings</h2>
              <span className="bg-black text-white text-xs px-2 py-1 rounded font-bold">{history.length}</span>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {history.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 opacity-40 italic"
                  >
                    <p>Your gratitude journey starts here.</p>
                    <p className="text-sm">Capture a moment above.</p>
                  </motion.div>
                ) : (
                  history.map((entry, index) => (
                    <motion.div 
                      key={`${entry.date}-${index}`}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index === 0 ? 0 : 0 // Only slow for the newest one if desired, but index 0 is newest now
                      }}
                      className="border-l-4 border-neon-pink pl-4 py-1"
                    >
                      <p className="text-[10px] font-bold text-gray-500 uppercase">{entry.date}</p>
                      <p className="text-sm font-bold text-black italic mb-1">Q: {entry.prompt}</p>
                      <p className="text-gray-700 leading-relaxed font-medium">{entry.answer}</p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
