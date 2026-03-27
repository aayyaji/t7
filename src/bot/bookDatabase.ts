export interface ShiaBook {
  id: string;
  title: string;
  author: string;
  description: string;
  keywords: string[];
  pdfUrl: string;
  source: string;
  sizeMb: number;
  linkOnly?: boolean;
}

// Base URL for the verified arabic_shia_books collection on archive.org
const BASE = "https://archive.org/download/arabic_shia_books/";

export const SHIA_BOOKS_DATABASE: ShiaBook[] = [

  // ══════════════ نهج البلاغة ══════════════
  {
    id: "nahjul-balagha",
    title: "نهج البلاغة",
    author: "الإمام علي بن أبي طالب عليه السلام — جمع الشريف الرضي",
    description: "خطب وكتب وحكم أمير المؤمنين الإمام علي عليه السلام",
    keywords: ["نهج البلاغة", "نهج", "البلاغة", "خطب علي", "الإمام علي", "امير المومنين", "نهج البلاغه"],
    pdfUrl: BASE + "Nahaj Al-Balagah.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 21,
  },

  // ══════════════ مفاتيح الجنان ══════════════
  {
    id: "mafatih-jinan",
    title: "مفاتيح الجنان",
    author: "الشيخ عباس القمي",
    description: "كتاب الأدعية والزيارات المأثورة عن أهل البيت عليهم السلام",
    keywords: ["مفاتيح الجنان", "مفاتيح", "القمي", "عباس القمي", "الجنان", "ادعية", "أدعية", "زيارات", "مفاتيح الجنه"],
    pdfUrl: "https://archive.org/download/mafatih_al_jinan/mafatih_al_jinan.pdf",
    source: "Internet Archive — mafatih_al_jinan",
    sizeMb: 7,
  },

  // ══════════════ الصحيفة السجادية ══════════════
  {
    id: "sahifa-sajjadiya",
    title: "الصحيفة السجادية الكاملة",
    author: "الإمام علي بن الحسين زين العابدين عليه السلام",
    description: "مجموعة أدعية الإمام السجاد عليه السلام — زبور آل محمد",
    keywords: ["الصحيفة السجادية", "صحيفة سجادية", "زين العابدين", "السجاد", "صحيفة", "ادعية السجاد", "الصحيفه السجاديه"],
    pdfUrl: BASE + "Saheefa Sajjadiyah Kamilah.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 22,
  },

  // ══════════════ الكافي ══════════════
  {
    id: "alkafi",
    title: "الكافي",
    author: "الشيخ محمد بن يعقوب الكليني",
    description: "الجامع الحديثي الشيعي الأعظم — أصول الكافي وفروعه وروضته",
    keywords: ["الكافي", "كافي", "الكليني", "كليني", "اصول الكافي", "أصول الكافي", "فروع الكافي"],
    pdfUrl: BASE + "Al-Kafi.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 132,
    linkOnly: true,
  },

  // ══════════════ الإرشاد ══════════════
  {
    id: "irshad-mufid",
    title: "الإرشاد في معرفة حجج الله على العباد",
    author: "الشيخ المفيد",
    description: "تاريخ الأئمة الاثني عشر عليهم السلام وسيرتهم",
    keywords: ["الإرشاد", "ارشاد", "المفيد", "الشيخ المفيد", "تاريخ الائمة", "سيرة الأئمة"],
    pdfUrl: BASE + "Al-Irshad.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 11,
  },

  // ══════════════ الغيبة ══════════════
  {
    id: "ghaybah-nomani",
    title: "الغيبة",
    author: "الشيخ محمد بن إبراهيم النعماني",
    description: "في غيبة الإمام المهدي عجّل الله فرجه وعلامات ظهوره",
    keywords: ["الغيبة", "غيبة", "النعماني", "المهدي", "الظهور", "علامات الظهور"],
    pdfUrl: BASE + "Al-Ghaybah.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 9,
  },

  // ══════════════ كتاب سليم بن قيس ══════════════
  {
    id: "kitab-sulaym",
    title: "كتاب سليم بن قيس الهلالي",
    author: "سليم بن قيس الهلالي",
    description: "أقدم كتاب شيعي في التاريخ — يروي أحداث السقيفة ومظالم أهل البيت",
    keywords: ["سليم بن قيس", "كتاب سليم", "السقيفة", "سليم الهلالي", "غصب الخلافة"],
    pdfUrl: BASE + "Kitab Salaim Ibn Qais Hilali.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 44,
  },

  // ══════════════ مقتل الحسين ══════════════
  {
    id: "maqtal-hussain",
    title: "مقتل الحسين عليه السلام",
    author: "أبو مخنف الأزدي",
    description: "رواية مقتل الإمام الحسين عليه السلام وواقعة كربلاء",
    keywords: ["مقتل الحسين", "مقتل", "كربلاء", "عاشوراء", "الحسين", "ابو مخنف"],
    pdfUrl: BASE + "Maqtal-e-Hussain(as).pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 4,
  },

  // ══════════════ حقائق السقيفة ══════════════
  {
    id: "haqaiq-saqifa",
    title: "حقائق السقيفة في صحيح رواية أبي مخنف",
    author: "أبو مخنف الأزدي — تحقيق",
    description: "وثائق ما جرى في السقيفة بعد وفاة النبي صلى الله عليه وآله",
    keywords: ["السقيفة", "سقيفة", "حقائق السقيفة", "ابو مخنف", "غصب الخلافة", "الخلفاء"],
    pdfUrl: BASE + "Haqaiq Saqifa Fi Sahih Riwayat Abi Mukhanif.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 6,
  },

  // ══════════════ وسائل الشيعة ══════════════
  {
    id: "wasail-shia",
    title: "وسائل الشيعة",
    author: "الشيخ محمد بن الحسن الحر العاملي",
    description: "الموسوعة الفقهية الحديثية الكبرى للشيعة الإمامية",
    keywords: ["وسائل الشيعة", "وسائل", "الحر العاملي", "العاملي", "فقه"],
    pdfUrl: BASE + "Wasail-us Shi'a.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 269,
    linkOnly: true,
  },

  // ══════════════ بحار الأنوار ══════════════
  {
    id: "bihar-anwar",
    title: "بحار الأنوار الجامعة لدرر أخبار الأئمة الأطهار",
    author: "العلامة الشيخ محمد باقر المجلسي",
    description: "الموسوعة الحديثية الشيعية الكبرى في عشرات المجلدات",
    keywords: ["بحار الأنوار", "بحار", "المجلسي", "مجلسي", "انوار", "بحار الانوار"],
    pdfUrl: BASE + "Bihar-ul Anwaar - Mosusat Aaelmi Al-Matbu'at [Beruit - Lebanon].pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 403,
    linkOnly: true,
  },

  // ══════════════ تهذيب الأحكام ══════════════
  {
    id: "tahdhib-ahkam",
    title: "تهذيب الأحكام",
    author: "الشيخ محمد بن الحسن الطوسي",
    description: "أحد الكتب الحديثية الأربعة الأصلية عند الشيعة في الفقه",
    keywords: ["تهذيب الأحكام", "التهذيب", "الطوسي", "شيخ الطائفة"],
    pdfUrl: BASE + "Tehzeeb Al-Ahkam.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 195,
    linkOnly: true,
  },

  // ══════════════ الاستبصار ══════════════
  {
    id: "istibsar",
    title: "الاستبصار فيما اختُلف من الأخبار",
    author: "الشيخ محمد بن الحسن الطوسي",
    description: "أحد الكتب الحديثية الأربعة الأصلية — جمع الأحاديث الفقهية",
    keywords: ["الاستبصار", "استبصار", "الطوسي"],
    pdfUrl: BASE + "Al-Istibsar.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 56,
    linkOnly: true,
  },

  // ══════════════ الخصال ══════════════
  {
    id: "khisal",
    title: "الخصال",
    author: "الشيخ الصدوق محمد بن علي بن بابويه",
    description: "أحاديث في الأخلاق والعقيدة مرتبة عدديًا",
    keywords: ["الخصال", "خصال", "الصدوق", "ابن بابويه"],
    pdfUrl: BASE + "Al-Khisaal.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 30,
  },

  // ══════════════ أمالي الصدوق ══════════════
  {
    id: "amali-sadooq",
    title: "الأمالي",
    author: "الشيخ الصدوق محمد بن علي بن بابويه",
    description: "مجالس إملاء الشيخ الصدوق في الحديث والعقيدة والفضائل",
    keywords: ["أمالي الصدوق", "امالي", "الصدوق", "ابن بابويه"],
    pdfUrl: BASE + "Amali - Sheikh Sadooq.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 20,
  },

  // ══════════════ دلائل الإمامة ══════════════
  {
    id: "dalail-imama",
    title: "دلائل الإمامة",
    author: "الشيخ محمد بن جرير الطبري الشيعي",
    description: "معجزات ودلائل أئمة أهل البيت عليهم السلام",
    keywords: ["دلائل الإمامة", "دلائل", "الإمامة", "إمامة", "معجزات الأئمة"],
    pdfUrl: BASE + "Dalail Imamat.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 7,
  },

  // ══════════════ إيمان أبي طالب ══════════════
  {
    id: "iman-abi-talib",
    title: "إيمان أبي طالب عليه السلام",
    author: "الشيخ المفيد وآخرون",
    description: "إثبات إيمان أبي طالب سيد البطحاء ناصر النبي عليه السلام",
    keywords: ["إيمان أبي طالب", "ابو طالب", "أبي طالب", "سيد البطحاء"],
    pdfUrl: BASE + "Imaan Abi Talib(as).pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 12,
  },

  // ══════════════ وقعة الجمل ══════════════
  {
    id: "waqat-jamal",
    title: "الجمل ونصرة العترة في حرب البصرة",
    author: "الشيخ المفيد",
    description: "تفصيل حرب الجمل وموقف أمير المؤمنين عليه السلام",
    keywords: ["الجمل", "حرب الجمل", "البصرة", "عائشة", "وقعة الجمل"],
    pdfUrl: BASE + "Al-Jamal.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 17,
  },

  // ══════════════ وقعة صفين ══════════════
  {
    id: "waqat-siffin",
    title: "وقعة صفين",
    author: "نصر بن مزاحم المنقري",
    description: "تفصيل موقعة صفين وحرب الإمام علي مع معاوية",
    keywords: ["صفين", "وقعة صفين", "معاوية", "حرب صفين"],
    pdfUrl: BASE + "Waqa'at Sifeen.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 17,
  },

  // ══════════════ نهج الحق وكشف الصدق ══════════════
  {
    id: "nahj-haq",
    title: "نهج الحق وكشف الصدق",
    author: "العلامة الحلي الحسن بن يوسف المطهر",
    description: "كتاب جامع في العقيدة الشيعية والرد على المخالفين",
    keywords: ["نهج الحق", "كشف الصدق", "العلامة الحلي", "الحلي", "عقيدة"],
    pdfUrl: BASE + "Nahaj Al-Haq Wa Kashaf Al-Sadaq.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 22,
  },

  // ══════════════ شرح خطبة الزهراء ══════════════
  {
    id: "sharh-khutba-zahra",
    title: "شرح خطبة الصديقة فاطمة الزهراء عليها السلام",
    author: "علماء الشيعة",
    description: "شرح الخطبة الفدكية الكاملة للسيدة فاطمة الزهراء عليها السلام",
    keywords: ["خطبة فاطمة", "الخطبة الفدكية", "فدك", "فاطمة الزهراء", "الزهراء", "خطبة الزهراء"],
    pdfUrl: BASE + "Sharh Khutba Sideeqa Fatima Zehra(sa).pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 8,
  },

  // ══════════════ مسند فاطمة الزهراء ══════════════
  {
    id: "musnad-zahra",
    title: "مسند فاطمة الزهراء عليها السلام",
    author: "حسين توسركاني",
    description: "جمع مرويات السيدة فاطمة الزهراء عليها السلام",
    keywords: ["فاطمة الزهراء", "الزهراء", "مسند فاطمة", "السيدة فاطمة"],
    pdfUrl: BASE + "Masnad Fatima Zehra(sa) - Hussain Tausarkani.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 13,
  },

  // ══════════════ إرشاد القلوب ══════════════
  {
    id: "irshad-quloob",
    title: "إرشاد القلوب",
    author: "الشيخ أبو محمد الحسن الديلمي",
    description: "في الآداب والأخلاق والمواعظ من أهل البيت عليهم السلام",
    keywords: ["إرشاد القلوب", "الديلمي", "مواعظ", "أخلاق"],
    pdfUrl: BASE + "Irshad Al-Quloob.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 9,
  },

  // ══════════════ معاني الأخبار ══════════════
  {
    id: "maani-akhbar",
    title: "معاني الأخبار",
    author: "الشيخ الصدوق محمد بن علي بن بابويه",
    description: "شرح غريب الأحاديث ومعاني الروايات المشكلة",
    keywords: ["معاني الأخبار", "الصدوق", "غريب الحديث"],
    pdfUrl: BASE + "Ma'aani Al-Akhbar.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 22,
  },

  // ══════════════ المقنعة ══════════════
  {
    id: "muqanah",
    title: "المقنعة",
    author: "الشيخ المفيد",
    description: "رسالة فقهية جامعة في أحكام الشريعة الإسلامية",
    keywords: ["المقنعة", "مقنعة", "المفيد", "فقه"],
    pdfUrl: BASE + "Al-Muqanah.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 26,
  },

  // ══════════════ تصحيح اعتقادات الإمامية ══════════════
  {
    id: "tashih-itiqadat",
    title: "تصحيح اعتقادات الإمامية",
    author: "الشيخ المفيد",
    description: "تصحيح عقائد الشيخ الصدوق في رسالة الاعتقادات",
    keywords: ["تصحيح الاعتقادات", "الاعتقادات", "عقيدة الشيعة", "المفيد"],
    pdfUrl: BASE + "Tasheeh Aetiqadat Al-Imamia.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 4,
  },

  // ══════════════ أوائل المقالات ══════════════
  {
    id: "awail-maqalat",
    title: "أوائل المقالات في المذاهب والمختارات",
    author: "الشيخ المفيد",
    description: "مقالات في عقائد الشيعة الإمامية ومسائل الكلام",
    keywords: ["أوائل المقالات", "المقالات", "المفيد", "عقيدة"],
    pdfUrl: BASE + "Awail Al-Maqalat.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 10,
  },

  // ══════════════ الغارات ══════════════
  {
    id: "gharat",
    title: "الغارات",
    author: "إبراهيم بن محمد الثقفي",
    description: "أحداث الغارات التي شنّها معاوية على بلاد الإمام علي عليه السلام",
    keywords: ["الغارات", "غارات معاوية", "معاوية", "ظلم الإمام علي"],
    pdfUrl: BASE + "Al-Gharaat.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 12,
  },

  // ══════════════ إعلام الورى ══════════════
  {
    id: "ilam-wara",
    title: "إعلام الورى بأعلام الهدى",
    author: "الشيخ أمين الإسلام الطبرسي",
    description: "سيرة النبي والأئمة الاثني عشر عليهم السلام",
    keywords: ["إعلام الورى", "اعلام الورى", "الطبرسي", "سيرة الأئمة"],
    pdfUrl: BASE + "Aelam Al-Wara.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 43,
  },

  // ══════════════ مناقب آل أبي طالب ══════════════
  {
    id: "manaqib-al-abi-talib",
    title: "مناقب آل أبي طالب عليهم السلام",
    author: "ابن شهرآشوب المازندراني",
    description: "مناقب وفضائل أهل البيت عليهم السلام",
    keywords: ["مناقب", "آل أبي طالب", "ابن شهرآشوب", "فضائل أهل البيت"],
    pdfUrl: BASE + "Manaqib Aal Abi Talib(as).pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 45,
  },

  // ══════════════ فرق الشيعة ══════════════
  {
    id: "firaq-shia",
    title: "فرق الشيعة",
    author: "الحسن بن موسى النوبختي",
    description: "تاريخ الفرق الشيعية وعقائدها من أقدم المصادر",
    keywords: ["فرق الشيعة", "الفرق", "النوبختي", "تاريخ الشيعة"],
    pdfUrl: BASE + "Firaq-ul Shi'a.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 5,
  },

  // ══════════════ الاختصاص ══════════════
  {
    id: "ikhtisas",
    title: "الاختصاص",
    author: "الشيخ المفيد",
    description: "فضائل الأئمة ومناقب الشيعة وأحاديث متفرقة",
    keywords: ["الاختصاص", "اختصاص", "المفيد"],
    pdfUrl: BASE + "Al-Ikhtisas.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 18,
  },

  // ══════════════ بشارة المصطفى ══════════════
  {
    id: "bisharat-mustafa",
    title: "بشارة المصطفى لشيعة المرتضى",
    author: "محمد بن أبي القاسم الطبري",
    description: "أحاديث في فضل الشيعة وموالاة أهل البيت عليهم السلام",
    keywords: ["بشارة المصطفى", "شيعة المرتضى", "فضل الشيعة", "موالاة أهل البيت"],
    pdfUrl: BASE + "Basharat Al-Mustafa(saww) Li Shi'at Al-Murtaza(as).pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 13,
  },

  // ══════════════ مجمع البيان ══════════════
  {
    id: "majmaul-bayan",
    title: "مجمع البيان لعلوم القرآن",
    author: "الشيخ أبو علي الفضل الطبرسي",
    description: "التفسير الشيعي الكلاسيكي المعتمد للقرآن الكريم",
    keywords: ["مجمع البيان", "مجمع", "البيان", "الطبرسي", "تفسير"],
    pdfUrl: BASE + "Majma Al-Bayaan Fi Tafseer Al-Qur'an.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 169,
    linkOnly: true,
  },

  // ══════════════ نور الأبصار ══════════════
  {
    id: "noor-absar",
    title: "نور الأبصار في مناقب آل بيت النبي المختار",
    author: "الشبلنجي",
    description: "مناقب أهل البيت النبوي من مصادر متنوعة",
    keywords: ["نور الأبصار", "مناقب أهل البيت", "الشبلنجي"],
    pdfUrl: BASE + "Noor Al-Absar Fi Manaqib Ahl-e-Bait(as).pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 9,
  },

  // ══════════════ مصباح الشريعة ══════════════
  {
    id: "misbah-sharia",
    title: "مصباح الشريعة",
    author: "منسوب إلى الإمام جعفر الصادق عليه السلام",
    description: "أحاديث في الآداب والأخلاق والسلوك الروحي",
    keywords: ["مصباح الشريعة", "الصادق", "آداب", "أخلاق"],
    pdfUrl: BASE + "Misbah Al-Shariyat.pdf",
    source: "Internet Archive — arabic_shia_books",
    sizeMb: 6,
  },
];

export function searchBook(query: string): ShiaBook[] {
  const normalize = (s: string) =>
    s
      .trim()
      .replace(/[أإآ]/g, "ا")
      .replace(/[ةه]/g, "ه")
      .replace(/ى/g, "ي")
      .toLowerCase();

  const normalizedQuery = normalize(query);
  const results: Array<{ book: ShiaBook; score: number }> = [];

  for (const book of SHIA_BOOKS_DATABASE) {
    let score = 0;

    if (normalize(book.title).includes(normalizedQuery)) score += 100;
    if (normalize(book.author).includes(normalizedQuery)) score += 60;

    for (const keyword of book.keywords) {
      const nk = normalize(keyword);
      if (nk === normalizedQuery) {
        score += 90;
      } else if (nk.includes(normalizedQuery) || normalizedQuery.includes(nk)) {
        score += 50;
      }
    }

    if (score > 0) results.push({ book, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3).map((r) => r.book);
}

export function isBookRequest(text: string): string | null {
  const patterns = [
    /(?:أرسل|ارسل|ابعث|أعطني|اعطني|احتاج|أريد|اريد|أبغى|ابغى|أبي|ابي|هات|نزل|حمل)\s+(?:لي\s+)?(?:كتاب|مؤلف|كتيب|ملف)\s+(.+)/i,
    /(?:كتاب|مؤلف)\s+(.+?)\s+(?:بي دي اف|pdf|PDF|بيدي اف)/i,
    /^\/كتاب\s+(.+)/i,
    /\/book\s+(.+)/i,
    /(?:أريد|اريد|احتاج)\s+(.+?)\s+(?:بي دي اف|pdf|PDF|بيدي اف|كتاب)/i,
    /(?:نزلي|حملي|ارفعلي|ابعثلي)\s+(?:كتاب\s+)?(.+)/i,
    /(?:ممكن|تقدر|قدر)\s+(?:ترسل|تبعث|تعطيني|تنزل|تحمل)\s+(?:لي\s+)?(?:كتاب\s+)?(.+?)(?:\s+بيدي اف|\s+pdf|\s+PDF)?/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) return match[1].trim();
  }

  return null;
}
