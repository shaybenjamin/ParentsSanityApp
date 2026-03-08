import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Settings ───────────────────────────────────────────────────────────
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      language: 'he',
      childName: 'Ori',
      childAgeMonths: 19,
      householdName: 'משפחת לוי',
    },
  });

  // ─── Routine Template ───────────────────────────────────────────────────
  const template = await prisma.routineTemplate.create({
    data: {
      name: 'Weekday Routine',
      nameHe: 'שגרת יום חול',
      isDefault: true,
      items: {
        create: [
          { title: 'Wake up & diaper change', titleHe: 'קימה והחלפת חיתול', startTime: '07:00', endTime: '07:15', segment: 'MORNING', icon: '☀️', order: 0 },
          { title: 'Breakfast', titleHe: 'ארוחת בוקר', startTime: '07:15', endTime: '07:45', segment: 'MORNING', icon: '🍌', order: 1 },
          { title: 'Free play', titleHe: 'משחק חופשי', startTime: '07:45', endTime: '09:00', segment: 'MORNING', icon: '🧸', order: 2 },
          { title: 'Outdoor walk or balcony time', titleHe: 'טיול קצר או זמן מרפסת', startTime: '09:00', endTime: '09:45', segment: 'MORNING', icon: '🌿', order: 3 },
          { title: 'Quiet activity / books', titleHe: 'פעילות שקטה / ספרים', startTime: '09:45', endTime: '10:15', segment: 'MORNING', icon: '📚', order: 4 },
          { title: 'Snack', titleHe: 'חטיף בוקר', startTime: '10:15', endTime: '10:30', segment: 'MORNING', icon: '🍎', order: 5 },
          { title: 'Music / sensory play', titleHe: 'מוזיקה / משחק חושי', startTime: '10:30', endTime: '11:15', segment: 'MORNING', icon: '🎵', order: 6 },
          { title: 'Lunch', titleHe: 'ארוחת צהריים', startTime: '11:30', endTime: '12:00', segment: 'AFTERNOON', icon: '🍲', order: 7 },
          { title: 'Nap time', titleHe: 'שינת צהריים', startTime: '12:00', endTime: '14:00', segment: 'AFTERNOON', icon: '😴', order: 8 },
          { title: 'Snack & TV time', titleHe: 'חטיף וזמן טלוויזיה', startTime: '14:00', endTime: '14:30', segment: 'AFTERNOON', icon: '📺', order: 9 },
          { title: 'Creative play', titleHe: 'משחק יצירתי', startTime: '14:30', endTime: '15:30', segment: 'AFTERNOON', icon: '🎨', order: 10 },
          { title: 'Bath time', titleHe: 'אמבטיה', startTime: '17:30', endTime: '18:00', segment: 'EVENING', icon: '🛁', order: 11 },
          { title: 'Dinner', titleHe: 'ארוחת ערב', startTime: '18:00', endTime: '18:30', segment: 'EVENING', icon: '🍽️', order: 12 },
          { title: 'Wind-down / stories', titleHe: 'הרגעה / סיפורים', startTime: '18:30', endTime: '19:00', segment: 'EVENING', icon: '🌙', order: 13 },
          { title: 'Bedtime', titleHe: 'שינה', startTime: '19:00', endTime: '07:00', segment: 'NIGHT', icon: '⭐', order: 14 },
        ],
      },
    },
  });

  console.log(`✅ Created routine template: ${template.name}`);

  // ─── Activities ─────────────────────────────────────────────────────────
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        title: 'Sensory bin with rice',
        titleHe: 'ארגז חושי עם אורז',
        description: 'Fill a container with rice and small toys. Let the toddler explore with hands.',
        descriptionHe: 'מלאו קופסה באורז וצעצועים קטנים. תנו לילד לחקור עם הידיים.',
        category: 'SENSORY',
        durationMin: 20,
        energyLevel: 'LOW',
        isIndoor: true,
        materials: ['Large container', 'Rice', 'Small cups', 'Small toys'],
        materialsHe: ['קופסה גדולה', 'אורז', 'כוסות קטנות', 'צעצועים קטנים'],
        needsSupervision: true,
        ageMinMonths: 12,
        ageMaxMonths: 36,
        isFavorite: true,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Water play in basin',
        titleHe: 'משחק מים בסיר',
        description: 'A small basin with water, cups, and spoons. Great on warm days on the balcony.',
        descriptionHe: 'מגש עם מים, כוסות וכפות. נהדר לימים חמים במרפסת.',
        category: 'SENSORY',
        durationMin: 25,
        energyLevel: 'MEDIUM',
        isIndoor: false,
        materials: ['Basin', 'Water', 'Cups', 'Spoons', 'Towel'],
        materialsHe: ['מגש', 'מים', 'כוסות', 'כפות', 'מגבת'],
        needsSupervision: true,
        ageMinMonths: 12,
        ageMaxMonths: 48,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Stacking blocks',
        titleHe: 'בניית מגדלים מקוביות',
        description: 'Stack blocks as high as possible, then knock them down. Endless fun.',
        descriptionHe: 'הערמת קוביות לגובה ואז הפלתן. מהנה ללא גבול.',
        category: 'COGNITIVE',
        durationMin: 15,
        energyLevel: 'LOW',
        isIndoor: true,
        materials: ['Soft blocks or wooden blocks'],
        materialsHe: ['קוביות רכות או עץ'],
        needsSupervision: false,
        ageMinMonths: 12,
        ageMaxMonths: 36,
        isFavorite: true,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Dance party',
        titleHe: 'מסיבת ריקודים',
        description: 'Put on upbeat music and dance together. Great energy release.',
        descriptionHe: 'שימו מוזיקה ורקדו ביחד. שחרור אנרגיה מצוין.',
        category: 'PHYSICAL',
        durationMin: 10,
        energyLevel: 'HIGH',
        isIndoor: true,
        materials: ['Music player'],
        materialsHe: ['רמקול / מכשיר מוזיקה'],
        needsSupervision: false,
        ageMinMonths: 12,
        ageMaxMonths: 60,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Reading picture books',
        titleHe: 'קריאת ספרי תמונות',
        description: 'Pick 2-3 board books and read together. Point to pictures and name things.',
        descriptionHe: 'בחרו 2-3 ספרים וקראו ביחד. הצביעו על תמונות ותנו שמות לדברים.',
        category: 'QUIET',
        durationMin: 15,
        energyLevel: 'LOW',
        isIndoor: true,
        materials: ['Board books'],
        materialsHe: ['ספרי קרטון לתינוקות'],
        needsSupervision: false,
        ageMinMonths: 6,
        ageMaxMonths: 48,
        isFavorite: true,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Finger painting',
        titleHe: 'ציור באצבעות',
        description: 'Use baby-safe finger paints. Cover the table and let creativity flow.',
        descriptionHe: 'השתמשו בצבעי אצבעות בטוחים. כסו את השולחן ותנו לאמנות לזרום.',
        category: 'CREATIVE',
        durationMin: 20,
        energyLevel: 'LOW',
        isIndoor: true,
        materials: ['Finger paints (baby-safe)', 'Large paper', 'Old clothes / bib', 'Wipes'],
        materialsHe: ['צבעי אצבעות בטוחים לתינוקות', 'נייר גדול', 'בגדים ישנים / סינר', 'מגבונים'],
        needsSupervision: true,
        ageMinMonths: 12,
        ageMaxMonths: 48,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Balcony exploration',
        titleHe: 'חקרנות במרפסת',
        description: 'Take some small toys or a watering can to the balcony. Let the child explore.',
        descriptionHe: 'קחו צעצועים קטנים או קנקן השקיה למרפסת. תנו לילד לחקור.',
        category: 'OUTDOOR',
        durationMin: 20,
        energyLevel: 'MEDIUM',
        isIndoor: false,
        materials: ['Toys', 'Watering can (optional)'],
        materialsHe: ['צעצועים', 'קנקן השקיה (אופציונלי)'],
        needsSupervision: true,
        ageMinMonths: 12,
        ageMaxMonths: 48,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Shape sorter',
        titleHe: 'מיון צורות',
        description: 'Classic shape sorter toy. Great for focused quiet play.',
        descriptionHe: 'משחק מיון צורות קלאסי. מצוין למשחק שקט ממוקד.',
        category: 'COGNITIVE',
        durationMin: 15,
        energyLevel: 'LOW',
        isIndoor: true,
        materials: ['Shape sorter toy'],
        materialsHe: ['צעצוע מיון צורות'],
        needsSupervision: false,
        ageMinMonths: 12,
        ageMaxMonths: 36,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Bubble play',
        titleHe: 'משחק עם בועות סבון',
        description: 'Blow bubbles and let the child chase and pop them. Works indoor and outdoor.',
        descriptionHe: 'נפחו בועות ותנו לילד לרדוף ולפוצץ אותן. מתאים גם בבית וגם בחוץ.',
        category: 'PHYSICAL',
        durationMin: 15,
        energyLevel: 'MEDIUM',
        isIndoor: false,
        materials: ['Bubble solution', 'Wand'],
        materialsHe: ['תמיסת בועות', 'מקל בועות'],
        needsSupervision: false,
        ageMinMonths: 10,
        ageMaxMonths: 60,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Cooking observation',
        titleHe: 'צפייה בבישול',
        description: 'Bring the toddler to the kitchen in a safe spot. Narrate what you\'re doing and let them smell herbs.',
        descriptionHe: 'הביאו את הילד למטבח למקום בטוח. ספרו מה אתם עושים ותנו לו להריח עשבי תיבול.',
        category: 'COGNITIVE',
        durationMin: 10,
        energyLevel: 'LOW',
        isIndoor: true,
        materials: ['Safe high chair near kitchen'],
        materialsHe: ['כסא בטוח ליד המטבח'],
        needsSupervision: true,
        ageMinMonths: 12,
        ageMaxMonths: 48,
      },
    }),
  ]);

  console.log(`✅ Created ${activities.length} activities`);

  // ─── Playlists ──────────────────────────────────────────────────────────
  const calmPlaylist = await prisma.playlist.create({
    data: {
      title: 'Calm Morning Tunes',
      titleHe: 'מנגינות בוקר רגועות',
      type: 'MUSIC',
      mood: 'CALM',
      isFavorite: true,
      items: {
        create: [
          { title: 'Twinkle Twinkle Little Star', titleHe: 'כוכב קטן', url: 'https://www.youtube.com/watch?v=yCjJyiqpAuU', order: 0 },
          { title: 'You Are My Sunshine', titleHe: 'אתה השמש שלי', url: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I', order: 1 },
          { title: 'Somewhere Over the Rainbow', titleHe: 'מעבר לקשת', url: 'https://www.youtube.com/watch?v=V1bFr2SWP1I', order: 2 },
          { title: 'Lullaby Medley', titleHe: 'מדלי ניגוני ערש', url: 'https://www.youtube.com/watch?v=ZLFHpKilPYE', order: 3 },
        ],
      },
    },
  });

  const energeticPlaylist = await prisma.playlist.create({
    data: {
      title: 'Dance & Move',
      titleHe: 'לרקוד ולזוז',
      type: 'MUSIC',
      mood: 'ENERGETIC',
      items: {
        create: [
          { title: 'Baby Shark Dance', titleHe: 'כריש תינוק', url: 'https://www.youtube.com/watch?v=XqZsoesa55w', order: 0 },
          { title: 'The Wheels on the Bus', titleHe: 'הגלגלים של האוטובוס', url: 'https://www.youtube.com/watch?v=e_04ZrNroTo', order: 1 },
          { title: 'Head, Shoulders, Knees and Toes', titleHe: 'ראש כתפיים ברכיים', url: 'https://www.youtube.com/watch?v=h4eueDYPTIg', order: 2 },
          { title: 'If You\'re Happy and You Know It', titleHe: 'אם אתה שמח', url: 'https://www.youtube.com/watch?v=l4WNrvVjiTw', order: 3 },
        ],
      },
    },
  });

  const bedtimePlaylist = await prisma.playlist.create({
    data: {
      title: 'Sleepy Time',
      titleHe: 'זמן שינה',
      type: 'MUSIC',
      mood: 'BEDTIME',
      isFavorite: true,
      items: {
        create: [
          { title: 'Brahms Lullaby', titleHe: 'ניגון ערש של ברהמס', url: 'https://www.youtube.com/watch?v=6lNmYXRTB-4', order: 0 },
          { title: 'Rock-a-bye Baby', titleHe: 'ינוק ישן', url: 'https://www.youtube.com/watch?v=f5HRQR5j77A', order: 1 },
          { title: 'Hush Little Baby', titleHe: 'שקט תינוקלה', url: 'https://www.youtube.com/watch?v=2OEL4P1Rz04', order: 2 },
        ],
      },
    },
  });

  const videoPlaylist = await prisma.playlist.create({
    data: {
      title: 'Learning Videos',
      titleHe: 'סרטוני למידה',
      type: 'VIDEO',
      mood: 'BACKGROUND',
      items: {
        create: [
          { title: 'Colors for Kids', titleHe: 'צבעים לילדים', url: 'https://www.youtube.com/watch?v=tkQ06UIwFEs', order: 0 },
          { title: 'Animal Sounds', titleHe: 'קולות חיות', url: 'https://www.youtube.com/watch?v=GNKWJT5sPIc', order: 1 },
          { title: 'Shape Songs', titleHe: 'שירי צורות', url: 'https://www.youtube.com/watch?v=OEbRDtCAFdU', order: 2 },
        ],
      },
    },
  });

  console.log(`✅ Created playlists: ${[calmPlaylist.title, energeticPlaylist.title, bedtimePlaylist.title, videoPlaylist.title].join(', ')}`);

  // ─── Recipes ────────────────────────────────────────────────────────────
  const recipes = await Promise.all([
    prisma.recipe.create({
      data: {
        title: 'Banana Oat Pancakes',
        titleHe: 'פנקייקים בננה שיבולת שועל',
        description: 'Simple 3-ingredient pancakes. No sugar needed.',
        descriptionHe: 'פנקייקים פשוטים עם 3 מרכיבים. אין צורך בסוכר.',
        mealType: 'BREAKFAST',
        difficulty: 'EASY',
        prepMinutes: 15,
        toddlerFriendly: true,
        ingredients: ['1 ripe banana', '1 egg', '3 tbsp rolled oats', 'Butter or oil for pan'],
        ingredientsHe: ['1 בננה בשלה', '1 ביצה', '3 כפות שיבולת שועל', 'חמאה או שמן למחבת'],
        tags: ['quick', 'no-sugar', 'finger-food'],
        steps: {
          create: [
            { order: 1, instruction: 'Mash the banana with a fork until smooth.', instructionHe: 'מעכו את הבננה עם מזלג עד לאחידות.', durationMin: 2 },
            { order: 2, instruction: 'Add egg and oats. Mix well.', instructionHe: 'הוסיפו ביצה ושיבולת שועל. ערבבו היטב.', durationMin: 2 },
            { order: 3, instruction: 'Heat pan on medium. Drop spoonfuls of batter.', instructionHe: 'חממו מחבת על אש בינונית. שפכו כפות של הבלילה.', durationMin: 1 },
            { order: 4, instruction: 'Cook 2-3 min per side until golden.', instructionHe: 'בשלו 2-3 דקות לכל צד עד שמזהיב.', durationMin: 6 },
            { order: 5, instruction: 'Cool slightly before serving. Cut into strips for easy grabbing.', instructionHe: 'צננו מעט לפני הגשה. חתכו לרצועות לאחיזה קלה.', durationMin: 2 },
          ],
        },
      },
    }),
    prisma.recipe.create({
      data: {
        title: 'Avocado Toast Fingers',
        titleHe: 'אצבעות טוסט אבוקדו',
        description: 'Quick, nutritious breakfast that toddlers love to hold.',
        descriptionHe: 'ארוחת בוקר מהירה ומזינה שפעוטות אוהבים לאחוז.',
        mealType: 'BREAKFAST',
        difficulty: 'EASY',
        prepMinutes: 5,
        toddlerFriendly: true,
        ingredients: ['1 slice whole grain bread', '½ ripe avocado', 'Pinch of salt (optional)'],
        ingredientsHe: ['1 פרוסת לחם מחיטה מלאה', '½ אבוקדו בשל', 'קמצוץ מלח (אופציונלי)'],
        tags: ['quick', 'no-cook', 'finger-food'],
        steps: {
          create: [
            { order: 1, instruction: 'Toast the bread.', instructionHe: 'צנמו את הלחם.', durationMin: 2 },
            { order: 2, instruction: 'Scoop and mash the avocado.', instructionHe: 'הוציאו וערכו את האבוקדו.', durationMin: 1 },
            { order: 3, instruction: 'Spread avocado on toast. Cut into strips.', instructionHe: 'מרחו את האבוקדו על הלחם. חתכו לרצועות.', durationMin: 1 },
          ],
        },
      },
    }),
    prisma.recipe.create({
      data: {
        title: 'Pasta with Butter and Parmesan',
        titleHe: 'פסטה עם חמאה ופרמז\'ן',
        description: 'The reliable toddler classic. Fast, warm, always accepted.',
        descriptionHe: 'הקלאסיקה הבטוחה לפעוטות. מהיר, חם, תמיד מתקבל.',
        mealType: 'LUNCH',
        difficulty: 'EASY',
        prepMinutes: 12,
        toddlerFriendly: true,
        ingredients: ['Small pasta (penne or fusilli)', 'Butter', 'Grated parmesan', 'Salt'],
        ingredientsHe: ['פסטה קטנה (פנה או פוזילי)', 'חמאה', 'פרמז\'ן מגורר', 'מלח'],
        tags: ['quick', 'reliable', 'warm'],
        steps: {
          create: [
            { order: 1, instruction: 'Boil salted water. Cook pasta per package.', instructionHe: 'הרתיחו מים מומלחים. בשלו פסטה לפי החבילה.', durationMin: 10 },
            { order: 2, instruction: 'Drain pasta. Return to pot.', instructionHe: 'סננו פסטה. החזירו לסיר.', durationMin: 1 },
            { order: 3, instruction: 'Add butter and stir until melted.', instructionHe: 'הוסיפו חמאה וערבבו עד שנמס.', durationMin: 1 },
            { order: 4, instruction: 'Serve with parmesan on top. Let cool before giving to toddler.', instructionHe: 'הגישו עם פרמז\'ן מעל. תנו להתקרר לפני ההגשה לילד.', durationMin: 2 },
          ],
        },
      },
    }),
    prisma.recipe.create({
      data: {
        title: 'Lentil Soup',
        titleHe: 'מרק עדשים',
        description: 'Warming, nutritious soup. Batch cook and refrigerate.',
        descriptionHe: 'מרק מחמם ומזין. בשלו כמות גדולה ושמרו במקרר.',
        mealType: 'LUNCH',
        difficulty: 'MEDIUM',
        prepMinutes: 30,
        toddlerFriendly: true,
        ingredients: ['1 cup red lentils', '1 carrot', '1 potato', '1 onion', 'Olive oil', 'Salt', 'Cumin (optional)', '4 cups water or broth'],
        ingredientsHe: ['1 כוס עדשים כתומות', 'גזר', 'תפוח אדמה', 'בצל', 'שמן זית', 'מלח', 'כמון (אופציונלי)', '4 כוסות מים או ציר'],
        tags: ['batch-cook', 'warm', 'nutritious'],
        steps: {
          create: [
            { order: 1, instruction: 'Dice onion, carrot, potato.', instructionHe: 'קצצו בצל, גזר ותפוח אדמה.', durationMin: 5 },
            { order: 2, instruction: 'Sauté onion in olive oil until soft.', instructionHe: 'טגנו בצל בשמן זית עד שמתרכך.', durationMin: 5 },
            { order: 3, instruction: 'Add lentils, carrot, potato, and water. Bring to boil.', instructionHe: 'הוסיפו עדשים, גזר, תפוח אדמה ומים. הביאו לרתיחה.', durationMin: 5 },
            { order: 4, instruction: 'Simmer 20 minutes until everything is soft.', instructionHe: 'בשלו על אש קטנה 20 דקות עד שהכל מתרכך.', durationMin: 20 },
            { order: 5, instruction: 'Blend or mash to desired consistency. Season lightly.', instructionHe: 'בלנדרו או עגנו לסמיכות הרצויה. תבלו בעדינות.', durationMin: 3 },
          ],
        },
      },
    }),
    prisma.recipe.create({
      data: {
        title: 'Cheese Quesadilla Strips',
        titleHe: 'רצועות קסדייה גבינה',
        description: 'Quick, soft, cheesy. Cut into strips for easy toddler eating.',
        descriptionHe: 'מהיר, רך וגבינתי. חתכו לרצועות לאכילה קלה לפעוטות.',
        mealType: 'SNACK',
        difficulty: 'EASY',
        prepMinutes: 5,
        toddlerFriendly: true,
        ingredients: ['1 small flour tortilla', 'Shredded mild cheese'],
        ingredientsHe: ['1 טורטייה קטנה', 'גבינה מגורדת עדינה'],
        tags: ['quick', 'finger-food', 'no-fuss'],
        steps: {
          create: [
            { order: 1, instruction: 'Sprinkle cheese on half the tortilla. Fold over.', instructionHe: 'פזרו גבינה על חצי הטורטייה. קפלו.', durationMin: 1 },
            { order: 2, instruction: 'Cook in dry pan 2 min per side until golden.', instructionHe: 'בשלו במחבת יבשה 2 דקות לכל צד עד שמזהיב.', durationMin: 4 },
            { order: 3, instruction: 'Cool, cut into strips. Serve.', instructionHe: 'צננו, חתכו לרצועות. הגישו.', durationMin: 1 },
          ],
        },
      },
    }),
    prisma.recipe.create({
      data: {
        title: 'Yogurt with Fruit',
        titleHe: 'יוגורט עם פירות',
        description: 'No prep needed. Just mix and serve.',
        descriptionHe: 'אין צורך בהכנה. פשוט ערבבו והגישו.',
        mealType: 'SNACK',
        difficulty: 'EASY',
        prepMinutes: 2,
        toddlerFriendly: true,
        ingredients: ['Plain whole milk yogurt', 'Soft fruits (banana, mango, strawberry)'],
        ingredientsHe: ['יוגורט חלב מלא טבעי', 'פירות רכים (בננה, מנגו, תות)'],
        tags: ['no-cook', 'quick', 'probiotic'],
        steps: {
          create: [
            { order: 1, instruction: 'Mash or chop fruit into small pieces.', instructionHe: 'עגנו או חתכו פרי לחתיכות קטנות.', durationMin: 1 },
            { order: 2, instruction: 'Mix with yogurt. Serve.', instructionHe: 'ערבבו עם יוגורט. הגישו.', durationMin: 1 },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${recipes.length} recipes`);
  console.log('🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
