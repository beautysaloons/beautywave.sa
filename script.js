

const WHATSAPP_NUMBER = "966537824751";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function scrollToTopNow(){
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
const navigationEntry = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
const isReload = navigationEntry
  ? navigationEntry.type === "reload"
  : (performance.navigation && performance.navigation.type === 1);

(function(){
  // A refresh should reopen at the top, but normal hash navigation must still work.
  if (isReload && location.hash && history.replaceState){
    history.replaceState(null, "", location.pathname + location.search);
  }
  if (!location.hash) scrollToTopNow();
})();
window.addEventListener("pageshow", (e) => {
  if (e.persisted || isReload) requestAnimationFrame(scrollToTopNow);
});

/* No text / image selection or dragging (form fields stay editable) */
(function(){
  const isField = (t) => {
    const el = t && (t.nodeType === 1 ? t : t.parentElement);
    return !!(el && el.closest && el.closest("input, textarea, select"));
  };
  document.addEventListener("selectstart", (e) => { if (!isField(e.target)) e.preventDefault(); });
  document.addEventListener("dragstart", (e) => { if (!isField(e.target)) e.preventDefault(); });
})();

const LANG_KEY = "beauty-wave-lang";
const rootEl = document.documentElement;
let currentLang = rootEl.lang === "ar" ? "ar" : "en";
let animationsStarted = false;
const isAr = () => currentLang === "ar";

try { localStorage.removeItem(LANG_KEY); } catch (e) { /* ignore */ }

const UI_AR = {
  "meta.title": "بيوتي ويف — خبيرة مكياج واستوديو تجميل",
  "meta.desc": "بيوتي ويف — خدمات الأظافر والشعر والشمع والحواجب. احجزي موعدك الآن.",
  "logo.alt": "بيوتي ويف — بيوتي لاونج",

  "n.about": "من نحن", "n.services": "الخدمات", "n.sig": "المميزات", "n.book": "الحجز", "n.visit": "موقعنا",
  "n.reserve": "احجزي زيارتك",
  "n.switch": "English", "n.switchLabel": "التبديل إلى الإنجليزية", "n.close": "إغلاق القائمة",

  "h.t1": "جمال", "h.t2": "مدروس", "h.t3": "<em>في أدق التفاصيل.</em>",
  "h.sub": "بيوتي ويف مساحة هادئة ومدروسة للعناية بالأظافر والشعر والشمع والحواجب — حيث يمرّ كل موعد بلا استعجال، ويُنجَز كل عمل بإتقان تام.",
  "h.cta2": "تصفحي القائمة",
  "h.tr1": "أكثر من 40 خدمة", "h.tr2": "أسعار واضحة", "h.tr3": "من السبت إلى الخميس، بموعد مسبق",
  "h.badge": "بيوتي ويف · أناقة بلا استعجال · ",   
  "h.c1l": "الحجز متاح الآن", "h.c1v": "مواعيد متاحة لنفس اليوم",
  "h.c2l": "ابتداءً من", "h.c2v": "65 ر.س",
  "h.scroll": "مرّري للأسفل",
  "m.nails": "الأظافر", "m.hair": "الشعر", "m.wax": "الشمع", "m.brows": "الحواجب والوجه",
  "m.k": "كيراستاس", "m.l": "لوريال بروفيشنال", "m.s": "شوارتزكوف",

  "a.eyebrow": "بيوتي ويف · بيوتي لاونج",
  "a.title": "استوديو بُني على حرفة <em>بلا استعجال</em>.",
  "a.p": "كل خدمة في قائمتنا بسعر واضح، وتُنجَز بإتقان — من تغيير طلاء الأظافر في خمس دقائق إلى جلسة تصفيف كاملة للعروس. تعمل مختصاتنا بمنتجات كيراستاس ولوريال بروفيشنال وشوارتزكوف، وجميع الأسعار المعروضة شاملة ضريبة القيمة المضافة.",
  "a.s1": "أقسام للعناية<br>أظافر · شعر · شمع · حواجب",
  "a.s2": "خدمة مدرجة<br>بأسعار شفافة",
  "a.s3u": "دقائق",
  "a.s3": "مساج ووسائد اللافندر<br>مع المانيكير الفاخر",

  "sv.badge": "قائمة الأسعار",
  "sv.sub": "كل خدمة مدرجة أدناه كما هي مطبوعة في قائمتنا داخل الصالون — الأسماء نفسها والأسعار نفسها، وجميعها شاملة ضريبة القيمة المضافة.",

  "sg.badge": "تجارب مميزة",
  "g1t": "مانيكير وباديكير روسي",
  "g1p": "عناية دقيقة بجلد الأظافر مع خيار المساج الفاخر ووسائد اللافندر الدافئة.",
  "g1c": "ابتداءً من 180 ر.س",
  "g2t": "بيبي لايتس وهايلايتس وبالياج",
  "g2p": "تدرجات ناعمة مرسومة يدويًا، تُختتم بسشوار كامل.",
  "g2c": "ابتداءً من 850 ر.س",
  "g3t": "تصفيف شعر العروس",
  "g3p": "يشمل غسل الشعر بالكامل ورذاذ الشعر، بتصفيف يدوم طوال اليوم.",
  "g3c": "ابتداءً من 650 ر.س",
  "g4t": "علاجات البوتوكس و Dr. AN",
  "g4p": "علاجات ترميمية لفروة الرأس وخصلات الشعر، بحسب تقييم المختصة.",
  "g4c": "ابتداءً من 320 ر.س",

  "b.eyebrow": "احجزي زيارتك",
  "b.title": "أخبرينا بما<br><em>تودّين إجراءه.</em>",
  "b.p": "املئي النموذج وسنفتح رسالة واتساب إلى صالوننا بتفاصيلك مكتوبة مسبقًا — ما عليك سوى الضغط على إرسال وسنؤكد لك الموعد.",
  "b.i1": "نعمل من السبت إلى الخميس، بموعد مسبق",
  "b.i2": "يُرجى الحضور قبل الموعد بعشر دقائق",
  "b.i3": "جميع الأسعار المعروضة شاملة ضريبة القيمة المضافة",
  "f.name": "الاسم الكامل", "f.name.ph": "اسمك", "f.name.err": "يرجى إدخال اسمك.",
  "f.phone": "رقم الجوال", "f.phone.err": "يرجى إدخال رقم جوال صحيح.",
  "f.service": "الخدمة", "f.choose": "اختاري الخدمة", "f.service.err": "يرجى اختيار الخدمة.",
  "f.date": "التاريخ", "f.date.err": "يرجى اختيار التاريخ.",
  "f.time": "الوقت", "f.time.err": "يرجى اختيار الوقت.",
  "f.notes": "ملاحظات", "f.opt": "(اختياري)", "f.notes.ph": "هل هناك ما ينبغي أن نعرفه قبل زيارتك؟",
  "f.send": "إرسال عبر واتساب",

  "l.eyebrow": "موقع الصالون",
  "l.title": "تفضّلي <em>بزيارتنا</em>.",
  "l.p": "اضغطي أدناه لفتح الاتجاهات في خرائط جوجل، أو استخدمي الخريطة المضمّنة لمعرفة موقعنا قبل زيارتك.",
  "l.btn": "احصلي على الاتجاهات",
  "l.call": "اتصلي بنا", "l.ig": "انستغرام",
  "l.map": "موقع بيوتي ويف",
  "ft.note": "جميع الأسعار شاملة ضريبة القيمة المضافة · عناصر القائمة معروضة كما هي في الصالون",
  "faq.badge": "الأسئلة الشائعة", "faq.sub": "كل ما تحتاجينه قبل موعدك في بيوتي ويف.",
  "faq.q1": "متى يُفضّل حجز الموعد؟", "faq.a1": "للصبغات والعروس والمواعيد الطويلة، نوصي بالحجز قبل عدة أيام. وقد تتوفر مواعيد في اليوم نفسه للخدمات الأقصر.",
  "faq.q2": "هل الأسعار المعروضة شاملة الضريبة؟", "faq.a2": "نعم، الأسعار المعروضة في القائمة شاملة ضريبة القيمة المضافة. وقد يُحدد سعر الصبغات المعقدة أو الشعر الطويل بعد الاستشارة.",
  "faq.q3": "هل يمكنني طلب استشارة قبل خدمة الصبغة؟", "faq.a3": "بالتأكيد. اذكري النتيجة المطلوبة وحالة شعرك الحالية في ملاحظات الحجز، وسيتم توجيهك قبل تأكيد الخدمة.",
  "faq.q4": "كيف أؤكد موعدي؟", "faq.a4": "أرسلي نموذج الحجز عبر واتساب، وستظهر بياناتك جاهزة للإرسال. بعدها يمكن للصالون تأكيد الموعد مباشرة.",
  "test.badge": "آراء العميلات", "test.sub": "كلمات من عميلات يقدّرن التفاصيل المتقنة والخدمة الهادئة والنتيجة الراقية.",
  "test.t1": "الأجواء هادئة ومدروسة بشكل جميل. تسريحة شعري كانت ناعمة ومتقنة تمامًا كما أردت.", "test.n1": "نورة", "test.s1": "عميلة تصفيف شعر",
  "test.t2": "المانيكير كان دقيقًا والموعد بأكمله كان مريحًا بلا استعجال. أحببت النتيجة النظيفة والأنيقة.", "test.n2": "ليان", "test.s2": "عميلة عناية بالأظافر",
  "test.t3": "تجربة راقية من الحجز حتى النهاية. الفريق استمع بعناية وجعل الخدمة شخصية ومميزة.", "test.n3": "ريم", "test.s3": "عميلة عناية وجمال"
};

const SVC_AR = {
  // sizes & variants
  "Classic": "كلاسيكي", "Russian": "روسي",
  "Short": "قصير", "Middle": "متوسط", "Long": "طويل", "Very Long": "طويل جدًا",
  "Short/Middle": "قصير/متوسط", "Long/Very Long": "طويل/طويل جدًا",
  // groups
  "Manicure & Pedicure": "مانيكير وباديكير", "Color & Polish": "الألوان والطلاء", "Nail Art": "فن الأظافر",
  "French & Specialty": "الفرنش والخدمات الخاصة", "Extensions": "التطويل", "Removal": "الإزالة",
  "Wash & Cut": "الغسل والقص", "Styling": "التصفيف", "Color": "الصبغات", "Treatments": "العلاجات",
  "Advanced Treatments — Dr. AN": "علاجات متقدمة — Dr. AN",
  "Waxing": "إزالة الشعر بالشمع", "Eyebrows": "الحواجب", "Facial Shaving": "إزالة شعر الوجه",
  "Service time is from 30 – 180 minutes": "مدة الخدمة من 30 إلى 180 دقيقة",
  "Service time is from 20 – 40 minutes": "مدة الخدمة من 20 إلى 40 دقيقة",
  "Service time is from 20 minutes": "مدة الخدمة تبدأ من 20 دقيقة",
  // notes
  "trim / shape / buff": "تقليم / تشكيل / تلميع", "w/o color": "بدون طلاء",
  "5 min massage & lavender heated pads, w/o color": "مساج 5 دقائق ووسائد لافندر دافئة، بدون طلاء",
  "10 min massage & lavender heated pads, w/o color": "مساج 10 دقائق ووسائد لافندر دافئة، بدون طلاء",
  "10 min. of massage": "مساج لمدة 10 دقائق", "full set": "طقم كامل",
  "full set, w/o cleaning": "طقم كامل، بدون تنظيف", "per nail": "للظفر الواحد",
  "with Gel / Jelly Gel color": "مع طلاء جل / جيلي", "with cleaning": "مع التنظيف",
  "removal 50%, with cleaning": "إزالة 50%، مع التنظيف",
  "including blowdry — boys cut not available": "يشمل السشوار — قصّات الأولاد غير متوفرة",
  "wet hair": "للشعر المبلل", "price may vary depending on the specialist": "قد يختلف السعر بحسب المختصة",
  "with blow dry": "مع السشوار", "with hair wash and hair mist": "مع غسل الشعر ورذاذ الشعر",
  "on hair base color, with blow dry": "على لون الشعر الأساسي، مع السشوار",
  "with hair color, with blow dry": "مع صبغ الشعر، مع السشوار",
  "deep hair moisturizing": "ترطيب عميق للشعر", "for extremely damaged hair": "للشعر شديد التلف",
  "as per specialist assessment": "بحسب تقييم المختصة",
  "tweezing eyebrows is not available": "نتف الحواجب غير متوفر",
  // nails
  "Express Mani or Pedi": "مانيكير أو باديكير سريع",
  "Classic-Russian Manicure": "مانيكير كلاسيكي / روسي", "Classic-Russian Pedicure": "باديكير كلاسيكي / روسي",
  "Classic-Russian Mani & Pedi": "مانيكير وباديكير كلاسيكي / روسي",
  "Luxury Classic-Russian Manicure": "مانيكير فاخر كلاسيكي / روسي",
  "Luxury Classic-Russian Pedicure": "باديكير فاخر كلاسيكي / روسي",
  "Luxury Classic-Russian Mani & Pedi": "مانيكير وباديكير فاخر كلاسيكي / روسي",
  "Massage — Hands or Feet": "مساج — اليدين أو القدمين", "Callus Removal": "إزالة الجلد الخشن",
  "Nail Color": "طلاء الأظافر", "Nail Color (Gel Couture)": "طلاء الأظافر (جل كوتور)",
  "Gel Color / Jelly Polish": "طلاء جل / جيلي", "Nail Color with Chrome": "طلاء أظافر مع كروم",
  "Chrome": "كروم", "Cateyes": "عين القطة (كات آي)",
  "Simple Nail Art": "رسم أظافر بسيط", "Simple Gel Nail Art": "رسم أظافر جل بسيط",
  "Detailed Gel Nail Art": "رسم أظافر جل مفصّل",
  "French Regular Color": "فرنش بطلاء عادي", "French with Gel Color": "فرنش بطلاء جل",
  "French Cat Eyes Gel Polish": "فرنش عين القطة جل",
  "Plastic Extension with Regular Color": "تركيب أظافر بلاستيك بطلاء عادي",
  "Plastic Extension with Gel Color": "تركيب أظافر بلاستيك بطلاء جل",
  "Biab Extension": "تطويل بياب", "Polygel / Soft Gel": "بولي جل / سوفت جل", "Polygel Refill": "تعبئة بولي جل",
  "Biab": "بياب", "Biab Refill": "تعبئة بياب",
  "Gel Color / Fake Nails Removal": "إزالة طلاء الجل / الأظافر الصناعية",
  "Polygel / Biab Removal": "إزالة البولي جل / البياب",
  // hair
  "Hair Wash (with regular shampoo)": "غسل الشعر (بشامبو عادي)", "Hair Wash (with L'oreal shampoo)": "غسل الشعر (بشامبو لوريال)",
  "Hair Trim": "تقليم أطراف الشعر", "Bangs / Curtain Bangs Cut": "قص الغرة / الغرة الستارة",
  "Full Layers Cut": "قص طبقات كامل", "Hair Drying": "تجفيف الشعر",
  "Blow Dry": "سشوار", "Add Curler or Flat Iron": "إضافة مكواة تجعيد أو فرد", "French Braid": "ضفيرة فرنسية",
  "Simple Hair Style with Braids": "تسريحة بسيطة بالضفائر", "Hair Styles": "تسريحات الشعر",
  "Bride Hair Styling": "تصفيف شعر العروس",
  "One Hair Color w/o Ammonia": "صبغة لون واحد بدون أمونيا", "One Hair Color": "صبغة لون واحد",
  "Babylights | Highlights / Balayage / Ombre, Sombre": "بيبي لايتس | هايلايتس / بالياج / أومبريه، سومبريه",
  "Rinsage": "رينساج", "Hair Contouring": "كونتورينغ الشعر", "Roots w/o Ammonia": "صبغة الجذور بدون أمونيا",
  "Roots": "صبغة الجذور", "Hair Test": "اختبار الشعر",
  "Kerastase Scalp Scrub": "مقشّر فروة الرأس من كيراستاس", "L'oreal Metal Detox": "ميتال ديتوكس من لوريال",
  "L'oreal Absolut Repair": "أبسولوت ريبير من لوريال", "L'oreal Molecular Repair": "مولكيولار ريبير من لوريال",
  "L'oréal Vitamino Color Spectrum Treatment": "علاج فيتامينو كولور سبكتروم من لوريال",
  "Schwarzkoph R2": "شوارتزكوف R2", "Morfosis Hair Reconstruction Treatment": "علاج مورفوسيس لإعادة بناء الشعر",
  "Fusidios Kerastase Ampoules": "أمبولات فيوسيديوس من كيراستاس", "Kerastase Voz Urinals with Mask": "كيراستاس فوز يورينالز مع ماسك",
  "Amino Hair Cream": "كريم الأمينو للشعر", "BB Hair Cream": "كريم BB للشعر", "DR AN Hair Treatment": "علاج Dr. AN للشعر",
  "Mora Mora Hair Treatment": "علاج مورا مورا للشعر", "BPH Hair Treatment": "علاج BPH للشعر",
  "Scalp Detox – Dr. AN": "ديتوكس فروة الرأس – Dr. AN", "Gold / Silver Session – Dr. AN": "جلسة الذهب / الفضة – Dr. AN",
  "Botox Session – Dr. AN": "جلسة البوتوكس – Dr. AN",
  
  "Half Arms Wax": "شمع نصف اليدين", "Half Legs Wax": "شمع نصف الساقين", "Full Arms Wax": "شمع اليدين كاملة",
  "Full Legs Wax": "شمع الساقين كاملة", "Under Arms Wax": "شمع الإبطين", "Back Wax": "شمع الظهر",
  "Abdominal Area Wax": "شمع منطقة البطن",
  "Full Body without Back & Abdominal Wax": "شمع الجسم كاملًا بدون الظهر والبطن", "Full Body Wax": "شمع الجسم كاملًا",
 
  "Eyebrow Bleaching": "تفتيح الحواجب", "Eyebrow Tinting": "صبغ الحواجب", "Eyebrow Tinting & Bleaching": "صبغ وتفتيح الحواجب",
  "Full Face Wax": "شمع الوجه كاملًا", "Full Face Wax without Mustache": "شمع الوجه كاملًا بدون الشارب",
  "Mustache Wax": "شمع الشارب", "Full Face Shaving": "حلاقة الوجه كاملًا",
  "Full Face Shaving without Mustache": "حلاقة الوجه كاملًا بدون الشارب", "Mustache Shaving": "حلاقة الشارب",
  // booking select
  "Not sure yet / please advise": "لستُ متأكدة بعد / أرجو النصيحة",
  "Signature Manicure": "مانيكير سيغنتشر", "Russian Manicure": "مانيكير روسي", "Signature Pedicure": "باديكير سيغنتشر", "Luxury Mani & Pedi": "مانيكير وباديكير فاخر",
  "Classic Nail Color": "طلاء أظافر كلاسيكي", "Gel Color": "طلاء جل", "Chrome Finish": "كروم", "Cat Eye Gel": "جل عين القطة",
  "Minimal Nail Art": "فن أظافر ناعم", "Signature Nail Art": "فن أظافر مميز", "French Finish": "فرنش", "BIAB Full Set": "طقم بياب كامل", "BIAB Refill": "تعبئة بياب", "Soft Gel Extensions": "تطويل سوفت جل", "Extension Removal": "إزالة التطويل",
  "Hair Wash & Blow Dry": "غسل وسشوار", "Signature Hair Cut": "قصّة شعر سيغنتشر", "Curtain Bangs Cut": "قص الغرة الستارة", "Premium Blow Dry": "سشوار فاخر", "Classic Hair Styling": "تصفيف شعر كلاسيكي", "Bridal Hair Styling": "تصفيف شعر العروس",
  "Single Color": "صبغة لون واحد", "Root Color": "صبغة الجذور", "Balayage / Highlights": "بالياج / هايلايتس", "Gloss / Toner": "غلوس / تونر", "Kérastase Ritual": "طقس كيراستاس", "L'Oréal Metal Detox": "ميتال ديتوكس من لوريال", "Molecular Repair Ritual": "طقس الإصلاح الجزيئي", "Premium Hair Repair": "علاج فاخر لإصلاح الشعر",
  "premium salon waxing": "شمع فاخر", "Brow Tint": "صبغ الحواجب", "Brow Tint & Bleach": "صبغ وتفتيح الحواجب", "Brow Styling": "تصفيف الحواجب", "Luxury Mini Facial": "فاشيال فاخر مصغر"
};

const DYN = {
  en: {
    fillAll: "Please fill in every required field correctly.",
    opening: "Opening WhatsApp with your appointment details…",
    hello: "Hello Beauty Wave, I'd like to book an appointment:",
    name: "Name", phone: "Phone", service: "Service", date: "Date", time: "Time", notes: "Notes",
    am: "AM", pm: "PM", money: n => "SAR " + n, locale: "en-GB"
  },
  ar: {
    fillAll: "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
    opening: "جارٍ فتح واتساب بتفاصيل موعدك…",
    hello: "مرحبًا بيوتي ويف، أرغب في حجز موعد:",
    name: "الاسم", phone: "رقم الجوال", service: "الخدمة", date: "التاريخ", time: "الوقت", notes: "ملاحظات",
    am: "ص", pm: "م", money: n => n + " ر.س",
    locale: "ar-SA-u-ca-gregory-nu-latn"   
  }
};
const dyn = key => DYN[currentLang][key];
const tr = text => (isAr() && SVC_AR[text]) || text;                  // translate a menu string
const catName = cat => (isAr() ? cat.ar : cat.label);                 // tab / optgroup label
const toLatinDigits = s => s
  .replace(/[٠-٩]/g, c => c.charCodeAt(0) - 0x660)
  .replace(/[۰-۹]/g, c => c.charCodeAt(0) - 0x6F0);                  // accept Arabic-Indic digits in the phone field


const enContent = new Map();
const enAttrs = new Map();

function translateStatic(){
  document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(el => {
    const asHtml = el.hasAttribute("data-i18n-html");
    const key = asHtml ? el.dataset.i18nHtml : el.dataset.i18n;
    if (!enContent.has(el)) enContent.set(el, asHtml ? el.innerHTML : el.textContent);
    const text = isAr() && UI_AR[key] !== undefined ? UI_AR[key] : enContent.get(el);
    if (asHtml) el.innerHTML = text; else el.textContent = text;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    if (!enAttrs.has(el)) enAttrs.set(el, {});
    const saved = enAttrs.get(el);
    el.dataset.i18nAttr.split(";").forEach(pair => {
      const [attr, key] = pair.split("=");
      if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
      el.setAttribute(attr, isAr() && UI_AR[key] !== undefined ? UI_AR[key] : saved[attr]);
    });
  });
}


function fitBadgeText(){
  const tp = document.querySelector(".hero-badge-ring textPath");
  if (!tp) return;
  tp.style.wordSpacing = "";
  if (!isAr()) return;                                   
  const ring = 2 * Math.PI * 78;                         
  const unit = UI_AR["h.badge"];
  tp.textContent = unit;
  const one = tp.getComputedTextLength();
  if (!one) return;                                     
  tp.textContent = unit.repeat(Math.max(1, Math.floor(ring / one)));
  const spaces = (tp.textContent.match(/ /g) || []).length;
  tp.style.wordSpacing = Math.max(0, (ring - tp.getComputedTextLength()) / spaces) + "px";
}
let badgeFrame = 0;
let badgeWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth === badgeWidth) return;
  badgeWidth = window.innerWidth;
  cancelAnimationFrame(badgeFrame); badgeFrame = requestAnimationFrame(fitBadgeText);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBadgeText);  

const langSwitch = document.getElementById("langSwitch");
const langModal = document.getElementById("langModal");

function applyLanguage(lang){
  currentLang = lang;
  rootEl.lang = lang;
  rootEl.dir = lang === "ar" ? "rtl" : "ltr";
  translateStatic();
  fitBadgeText();
  renderServices();
  renderBookingSelect();
  langSwitch.lang = isAr() ? "en" : "ar";        
  const note = document.getElementById("formNote");
  note.textContent = "";
  note.className = "form-note";
}

function closeLangModal(){
  langModal.classList.add("is-closing");
  setTimeout(() => {
    rootEl.classList.remove("lang-pending");
    langModal.classList.remove("is-closing");
  }, 350);
}

langModal.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-lang-choice]");
  if (!btn) return;
  applyLanguage(btn.dataset.langChoice);
  closeLangModal();
  scrollToTopNow();
  startAnimations();
});
langModal.addEventListener("keydown", (e) => {          
  if (e.key !== "Tab") return;
  const btns = Array.from(langModal.querySelectorAll("button"));
  const i = btns.indexOf(document.activeElement);
  e.preventDefault();
  btns[(i + (e.shiftKey ? btns.length - 1 : 1)) % btns.length].focus();
});

langSwitch.addEventListener("click", () => {
  const anchor = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
  const section = anchor && anchor.closest("section");
  const before = section ? section.getBoundingClientRect().top : 0;
  applyLanguage(isAr() ? "en" : "ar");
  if (section) window.scrollBy({ top: section.getBoundingClientRect().top - before, behavior: "instant" });
  buildDirectionalAnimations();
});

function initLanguage(){
  applyLanguage("en");                       
  rootEl.classList.remove("i18n-loading");
  langModal.querySelector("button").focus({ preventScroll: true });
}

const SERVICES = {
  nails: { label: "Nails", ar: "الأظافر", groups: [
    { name: "Manicure & Pedicure", items: [
      { name: "Signature Manicure", note: "shape, cuticle care & finish", price: 140 },
      { name: "Russian Manicure", note: "precision cuticle care", price: 180 },
      { name: "Signature Pedicure", note: "care, scrub & finish", price: 180 },
      { name: "Luxury Mani & Pedi", note: "scrub, massage & premium finish", price: 320 }]},
    { name: "Color & Polish", items: [
      { name: "Classic Nail Color", price: 65 }, { name: "Gel Color", price: 120 },
      { name: "Chrome Finish", price: 160 }, { name: "Cat Eye Gel", price: 150 }]},
    { name: "Nail Art", items: [
      { name: "Minimal Nail Art", note: "per nail", price: 25 }, { name: "Signature Nail Art", note: "per nail", price: 40 }, { name: "French Finish", price: 75 }]},
    { name: "Extensions", items: [
      { name: "BIAB Full Set", price: 360 }, { name: "BIAB Refill", price: 260 }, { name: "Soft Gel Extensions", price: 420 }, { name: "Extension Removal", price: 90 }]}
  ]},
  hair: { label: "Hair", ar: "الشعر", groups: [
    { name: "Wash & Cut", items: [
      { name: "Hair Wash & Blow Dry", price: 120 }, { name: "Signature Hair Cut", price: 220 }, { name: "Curtain Bangs Cut", price: 90 }]},
    { name: "Styling", items: [
      { name: "Premium Blow Dry", sizes: { Short: 120, Middle: 150, Long: 180, "Very Long": 220 } },
      { name: "Classic Hair Styling", sizes: { Short: 220, Middle: 280, Long: 350, "Very Long": 420 } },
      { name: "Bridal Hair Styling", sizes: { Short: 650, Middle: 800, Long: 950, "Very Long": 1100 }}]},
    { name: "Color", items: [
      { name: "Single Color", sizes: { Short: 450, Middle: 600, Long: 750 } }, { name: "Root Color", price: 300 },
      { name: "Balayage / Highlights", sizes: { Short: 850, Middle: 1250, Long: 1650 } }, { name: "Gloss / Toner", sizes: { Short: 250, Middle: 320, Long: 390 }}]},
    { name: "Treatments", items: [
      { name: "Kérastase Ritual", price: 320 }, { name: "L'Oréal Metal Detox", price: 350 }, { name: "Molecular Repair Ritual", price: 420 }, { name: "Premium Hair Repair", price: 480 }]}
  ]},
  wax: { label: "Wax", ar: "الشمع", groups: [{ name: "Waxing", note: "premium salon waxing", items: [
    { name: "Half Arms Wax", price: 80 }, { name: "Full Arms Wax", price: 130 }, { name: "Half Legs Wax", price: 100 }, { name: "Full Legs Wax", price: 180 }, { name: "Under Arms Wax", price: 55 }, { name: "Full Body Wax", price: 450 }]}]},
  face: { label: "Brows & Face", ar: "الحواجب والوجه", groups: [
    { name: "Eyebrows", items: [{ name: "Brow Tint", price: 70 }, { name: "Brow Tint & Bleach", price: 95 }, { name: "Brow Styling", price: 110 }]},
    { name: "Facial Care", items: [{ name: "Full Face Wax", price: 65 }, { name: "Full Face Shaving", price: 75 }, { name: "Luxury Mini Facial", price: 220 }]}
  ]}
};

function money(n){ return DYN[currentLang].money(n); }

function buildPriceMarkup(item){
  if (item.variants){
    return `<div class="svc-variants">
      <div class="svc-variant"><span class="svc-variant-label">${tr("Classic")}</span><span class="svc-variant-price">${money(item.variants.Classic)}</span></div>
      <div class="svc-variant is-russian"><span class="svc-variant-label">${tr("Russian")}</span><span class="svc-variant-price">${money(item.variants.Russian)}</span></div>
    </div>`;
  }
  if (item.sizes){
    return `<div class="svc-size-table">${Object.entries(item.sizes).map(([label, val]) => `
      <div class="svc-size"><span class="svc-size-label">${tr(label)}</span><span class="svc-size-price">${money(val)}</span></div>
    `).join("")}</div>`;
  }
  return `<span class="svc-price">${money(item.price)}</span>`;
}

function renderServices(){
  const tabsEl = document.getElementById("serviceTabs");
  const panelsEl = document.getElementById("tabPanels");
  const keys = Object.keys(SERVICES);
  const activeBtn = tabsEl.querySelector(".tab-btn.is-active");
  const activeKey = activeBtn ? activeBtn.dataset.tab : keys[0];   // survive a language switch

  tabsEl.innerHTML = keys.map((key, i) => `
    <button class="tab-btn${key === activeKey ? " is-active" : ""}" data-tab="${key}" role="tab" aria-selected="${key === activeKey}">
      ${catName(SERVICES[key])}
    </button>
  `).join("");

  panelsEl.innerHTML = keys.map((key, i) => {
    const cat = SERVICES[key];
    const groupsHtml = cat.groups.map(group => `
      <div class="svc-group" data-group>
        <div class="svc-group-head">
          <h3>${tr(group.name)}</h3>
          ${group.note ? `<span class="svc-group-note">${tr(group.note)}</span>` : ""}
        </div>
        <div class="svc-group-body">
          ${group.items.map(item => `
            <div class="svc-row">
              <div class="svc-info">
                <span class="svc-name">${tr(item.name)}</span>
                ${item.note ? `<span class="svc-note">${tr(item.note)}</span>` : ""}
              </div>
              <span class="svc-leader" aria-hidden="true"></span>
              ${buildPriceMarkup(item)}
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    return `<div class="tab-panel${key === activeKey ? " is-active" : ""}" data-panel="${key}">${groupsHtml}</div>`;
  }).join("");
}

function renderBookingSelect(){
  const select = document.getElementById("fService");
  const previous = select.value;
  Array.from(select.children).slice(1).forEach(node => node.remove());   // keep the placeholder option
  Object.values(SERVICES).forEach(cat => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = catName(cat);
    cat.groups.forEach(group => {
      group.items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.name;              
        opt.textContent = tr(item.name);
        optgroup.appendChild(opt);
      });
    });
    select.appendChild(optgroup);
  });
  const otherOpt = document.createElement("option");
  otherOpt.value = "Not sure yet / please advise";
  otherOpt.textContent = tr("Not sure yet / please advise");
  select.appendChild(otherOpt);
  if (previous) select.value = previous;
}


document.getElementById("fDate").min = new Date().toISOString().split("T")[0];

// Tabs interaction
document.getElementById("serviceTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  const key = btn.dataset.tab;

  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("is-active", b === btn));
  document.querySelectorAll(".tab-panel").forEach(p => {
    const active = p.dataset.panel === key;
    if (active){
      p.classList.add("is-active");
      if (window.gsap) gsap.fromTo(p, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, ease: "power2.out" });
    } else {
      p.classList.remove("is-active");
    }
  });
  if (window.ScrollTrigger && animationsStarted) requestAnimationFrame(() => ScrollTrigger.refresh());
});


const siteNav = document.getElementById("siteNav");
let navScrolled = false;
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 30;
  if (scrolled === navScrolled) return;
  navScrolled = scrolled;
  siteNav.classList.toggle("is-scrolled", scrolled);
}, { passive: true });

/* pause the endless hero CSS animations while the hero is off-screen */
if ("IntersectionObserver" in window){
  const heroEl = document.querySelector(".hero");
  if (heroEl){
    new IntersectionObserver((entries) => {
      heroEl.classList.toggle("is-offscreen", !entries[0].isIntersecting);
    }, { rootMargin: "120px 0px" }).observe(heroEl);
  }
}

const navBurger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
const navClose = document.getElementById("navClose");

function setMenu(open){
  navLinks.classList.toggle("is-open", open);
  navBurger.classList.toggle("is-open", open);
  navBurger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
  if (open){
    if (window.gsap){
      gsap.fromTo("#navLinks a", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .06, ease: "power2.out" });
    }
    setTimeout(() => navClose.focus({ preventScroll: true }), 60);
  } else if (navLinks.contains(document.activeElement)){
    navBurger.focus({ preventScroll: true });
  }
}
navBurger.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navClose.addEventListener("click", () => setMenu(false));
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("is-open")) setMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 980 && navLinks.classList.contains("is-open")) setMenu(false);
});

if ("IntersectionObserver" in window){
  const navAnchors = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navAnchors)
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.toggle("is-active-link", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(sec => spy.observe(sec));
}

if (!window.gsap || !window.ScrollTrigger){
  document.documentElement.classList.add("no-gsap");
}

function startAnimations(){
  if (animationsStarted) return;
  animationsStarted = true;
  if (!(window.gsap && window.ScrollTrigger)){
    document.querySelectorAll(".stat-num-val").forEach(el => { el.textContent = el.dataset.value || 0; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion){
    document.documentElement.classList.add("motion-reduced");
    gsap.set(".hero-title .reveal,.hero-reveal,.hero-ring,.hero-badge,.hero-card,.hero-visual-core,.hero-orbit,.about-text > *, .about-art,.about-orbit,.draw-path,.draw-dot,.petal,.about-spark", { clearProps: "all" });
    document.querySelectorAll(".stat-num-val").forEach(el => { el.textContent = el.dataset.value || 0; });
    ScrollTrigger.refresh();
    return;
  }

  // Hero animation: content is never hidden by GSAP; motion reveals and elevates it.
  gsap.set(".hero-title .reveal", { yPercent: 105, rotateX: -16, transformOrigin: "50% 100%" });
  gsap.set(".hero-reveal", { y: 22, filter: "blur(7px)" });
  gsap.set(".hero-ring", { scale: .72, opacity: .2, transformOrigin: "50% 50%" });
  gsap.set(".hero-ring--in", { scale: .62, rotation: -24 });
  gsap.set(".hero-badge", { scale: .72, rotation: -20, transformOrigin: "50% 50%" });
  gsap.set(".hero-card", { y: 34, rotate: 2 });
  gsap.set(".hero-visual-core", { scale: .65, rotation: -20 });
  gsap.set(".hero-orbit--1", { scale: .7, rotation: -40 });
  gsap.set(".hero-orbit--2", { scale: .7, rotation: 48 });
  gsap.set(".hero-spotlight", { scale: .75, opacity: .2 });

  const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
  heroTl
    .to(".hero-spotlight", { scale: 1.15, opacity: 1, duration: 1.8 }, 0)
    .to(".hero-ring", { scale: 1, opacity: 1, duration: 1.65, stagger: .08 }, .05)
    .to(".hero-ring--in", { scale: 1, rotation: 0, duration: 1.35 }, .16)
    .to(".hero-title .reveal", { yPercent: 0, rotateX: 0, duration: 1.2, stagger: .13, ease: "power4.out" }, .24)
    .to(".hero-reveal", { y: 0, filter: "blur(0px)", duration: .95, stagger: .09, ease: "power3.out" }, .62)
    .to(".hero-visual-core", { scale: 1, rotation: 0, duration: 1.25, ease: "back.out(1.5)" }, .38)
    .to(".hero-orbit--1", { scale: 1, rotation: 24, duration: 1.45 }, .38)
    .to(".hero-orbit--2", { scale: 1, rotation: -31, duration: 1.45 }, .44)
    .to(".hero-badge", { scale: 1, rotation: 0, duration: 1.1, ease: "back.out(1.7)" }, .72)
    .to(".hero-card", { y: 0, rotate: 0, duration: .9, stagger: .12, ease: "back.out(1.4)" }, .88);

  // Continuous, restrained luxury motion inside the hero.
  gsap.to(".hero-visual-core", { rotation: 360, duration: 28, repeat: -1, ease: "none" });
  gsap.to(".hero-orbit--1", { rotation: "+=360", duration: 32, repeat: -1, ease: "none" });
  gsap.to(".hero-orbit--2", { rotation: "-=360", duration: 38, repeat: -1, ease: "none" });
  gsap.to(".hero-badge-ring", { rotation: 360, duration: 24, repeat: -1, ease: "none" });
  gsap.to(".hero-card--float", { y: "-=10", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".hero-card--price", { y: "+=9", duration: 4.1, repeat: -1, yoyo: true, ease: "sine.inOut" });

  // Hero becomes a layered parallax composition as the visitor scrolls.
  gsap.to(".hero-ring", { y: -80, rotation: 10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
  gsap.to(".hero-visual", { y: -55, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
  gsap.to(".hero-orb--1", { y: -140, x: 55, scale: 1.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 } });
  gsap.to(".hero-orb--2", { y: 90, x: -40, scale: .9, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 } });

  // About animation: editorial text reveal + drawn botanical geometry + orbital motion.
  gsap.set(".about-text > *", { y: 34, opacity: 0, filter: "blur(6px)" });
  gsap.set(".about-art", { opacity: 0, scale: .82, rotate: -7 });
  gsap.set(".draw-path", { strokeDasharray: 900, strokeDashoffset: 900 });
  gsap.set(".draw-dot", { opacity: 0, scale: .2 });
  gsap.set(".petal", { opacity: 0, scale: .25, transformOrigin: "210px 250px" });
  gsap.set(".about-orbit", { opacity: 0, scale: .65 });
  gsap.set(".about-spark", { opacity: 0, scale: .2 });

  const aboutTl = gsap.timeline({ scrollTrigger: { trigger: ".about", start: "top 78%", end: "top 22%", toggleActions: "play none none reverse" } });
  aboutTl
    .to(".about-text > *", { opacity: 1, y: 0, filter: "blur(0px)", duration: .9, stagger: .1, ease: "power3.out" })
    .to(".about-art", { opacity: 1, scale: 1, rotate: 0, duration: 1.25, ease: "expo.out" }, .12)
    .to(".about-orbit", { opacity: 1, scale: 1, duration: 1.15, stagger: .12, ease: "power3.out" }, .35)
    .to(".draw-path", { strokeDashoffset: 0, duration: 1.8, stagger: .18, ease: "power2.inOut" }, .38)
    .to(".draw-dot", { opacity: 1, scale: 1, duration: .55, stagger: .12, ease: "back.out(2)" }, "-=.85")
    .to(".petal", { opacity: 1, scale: 1, duration: .75, stagger: .14, ease: "back.out(1.8)" }, "-=.55")
    .to(".about-spark", { opacity: 1, scale: 1, duration: .5, stagger: .16, ease: "back.out(2)" }, "-=.5");

  gsap.to(".about-orbit--outer", { rotation: "+=360", duration: 30, repeat: -1, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: false } });
  gsap.to(".about-orbit--inner", { rotation: "-=360", duration: 38, repeat: -1, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: false } });
  gsap.to(".about-spark--1", { y: -12, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".about-spark--2", { y: 10, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: .4 });

  const statVals = gsap.utils.toArray(".stat-num-val").map(el => ({
    node: el.firstChild || el.appendChild(document.createTextNode("0")),
    target: Number(el.dataset.value || 0), val: 0, shown: 0
  }));
  if (statVals.length){
    ScrollTrigger.create({
      trigger: ".about-stats", start: "top 88%", once: true,
      onEnter: () => statVals.forEach(s => gsap.to(s, {
        val: s.target, duration: 2.2, ease: "power2.out", overwrite: true,
        onUpdate: () => {
          const n = Math.round(s.val);
          if (n !== s.shown){ s.shown = n; s.node.nodeValue = n; }   // touch the DOM only when the number changes
        },
        onComplete: () => { s.node.nodeValue = s.target; }
      }))
    });
  }

  gsap.utils.toArray(".section-head").forEach(head => {
    gsap.from(head.children, {
      opacity: 0, y: 24, duration: .9, stagger: .1, ease: "power2.out",
      scrollTrigger: { trigger: head, start: "top 82%" }
    });
  });

  gsap.from("#serviceTabs .tab-btn", {
    opacity: 0, y: 14, duration: .6, stagger: .06, ease: "power2.out",
    scrollTrigger: { trigger: "#serviceTabs", start: "top 85%" }
  });
 
  gsap.utils.toArray(".sig-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: i % 2 === 0 ? 46 : 26, rotate: i % 2 === 0 ? -2 : 2,
      duration: .9, ease: "power2.out",
      scrollTrigger: { trigger: ".signature-grid", start: "top 82%" },
      delay: i * .1
    });
  });

  
  gsap.from(".booking-form", {
    opacity: 0, y: 34, scale: .98, duration: .9, ease: "power2.out",
    scrollTrigger: { trigger: ".booking-form", start: "top 82%" }
  });

  gsap.utils.toArray(".faq-item").forEach((item, i) => gsap.from(item, {
    opacity: 0, y: 28, scale: .98, duration: .75, delay: i * .08, ease: "power3.out",
    scrollTrigger: { trigger: item, start: "top 88%" }
  }));
  gsap.utils.toArray(".testimonial-card").forEach((card, i) => gsap.from(card, {
    opacity: 0, y: 36, rotate: i % 2 ? 1.5 : -1.5, duration: .9, delay: i * .1, ease: "power3.out",
    scrollTrigger: { trigger: ".testimonial-grid", start: "top 82%" }
  }));

 
  gsap.from(".location-map", {
    opacity: 0, scale: .96, duration: 1, ease: "power2.out",
    scrollTrigger: { trigger: ".location-map", start: "top 85%" }
  });

  buildDirectionalAnimations();

  gsap.from(".footer-inner > *, .footer-note", {
    opacity: 0, y: 16, duration: .8, stagger: .08, ease: "power2.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 92%" }
  });

  document.addEventListener("visibilitychange", () => {
    if (!window.gsap) return;
    if (document.hidden) gsap.globalTimeline.pause();
    else {
      gsap.globalTimeline.resume();
      if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  });

  if (document.fonts && document.fonts.addEventListener){
    let fontTimer;
    document.fonts.addEventListener("loadingdone", () => {
      clearTimeout(fontTimer);
      fontTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
  }
}

let directionalCtx = null;
function buildDirectionalAnimations(){
  if (!animationsStarted || !(window.gsap && window.ScrollTrigger)) return;
  if (directionalCtx) directionalCtx.revert();
  const flip = rootEl.dir === "rtl" ? -1 : 1;

  const slide = (px) => (i, el) => {
    if (Math.sign(px) !== flip) return px;   // unchanged
    const r = el.getBoundingClientRect();
    const room = flip > 0 ? rootEl.clientWidth - r.right : r.left;
    return flip * Math.min(Math.abs(px), Math.max(0, room));
  };

  directionalCtx = gsap.context(() => {
    // Services — each menu group alternates in from either side
    gsap.utils.toArray(".tab-panel.is-active .svc-group").forEach((group, i) => {
      gsap.from(group, {
        opacity: 0, x: slide((i % 2 === 0 ? -28 : 28) * flip), duration: .8, ease: "power2.out",
        scrollTrigger: { trigger: group, start: "top 85%" }
      });
    });

    // Booking + Location text
    gsap.from(".booking-info > *", {
      opacity: 0, x: -28 * flip, duration: .8, stagger: .1, ease: "power2.out",
      scrollTrigger: { trigger: ".booking-info", start: "top 80%" }
    });
    gsap.from(".location-text > *", {
      opacity: 0, x: -28 * flip, duration: .8, stagger: .1, ease: "power2.out",
      scrollTrigger: { trigger: ".location-text", start: "top 82%" }
    });
  });

  ScrollTrigger.refresh();
}

// Booking form validation -> WhatsApp handoff
const bookingForm = document.getElementById("bookingForm");
const formNote = document.getElementById("formNote");

function setError(fieldId, hasError){
  const field = document.getElementById(fieldId).closest(".field");
  field.classList.toggle("has-error", hasError);
}

function isValidPhone(value){
  const digits = toLatinDigits(value).replace(/\D/g, "");
  return digits.length >= 8;
}

function formatDate(iso){
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString(dyn("locale"), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(t){
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? dyn("pm") : dyn("am");
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fName").value.trim();
  const phone = document.getElementById("fPhone").value.trim();
  const service = document.getElementById("fService").value;
  const date = document.getElementById("fDate").value;
  const time = document.getElementById("fTime").value;
  const notes = document.getElementById("fNotes").value.trim();

  const checks = [
    ["fName", name.length < 2],
    ["fPhone", !isValidPhone(phone)],
    ["fService", !service],
    ["fDate", !date],
    ["fTime", !time]
  ];

  let hasError = false;
  checks.forEach(([id, bad]) => {
    setError(id, bad);
    if (bad) hasError = true;
  });

  if (hasError){
    formNote.textContent = dyn("fillAll");
    formNote.className = "form-note is-error";
    if (window.gsap){
      gsap.fromTo(bookingForm, { x: -6 }, { x: 0, duration: .4, ease: "elastic.out(1, .4)" });
    }
    return;
  }

  formNote.textContent = "";
  formNote.className = "form-note";

  const lines = [
    dyn("hello"),
    "",
    `${dyn("name")}: ${name}`,
    `${dyn("phone")}: ${toLatinDigits(phone)}`,
    `${dyn("service")}: ${tr(service)}`,
    `${dyn("date")}: ${formatDate(date)}`,
    `${dyn("time")}: ${formatTime(time)}`
  ];
  if (notes) lines.push(`${dyn("notes")}: ${notes}`);

  const text = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  formNote.textContent = dyn("opening");
  formNote.className = "form-note is-success";

  window.open(url, "_blank", "noopener");
});

/* clear a field's error state as the person types */
bookingForm.querySelectorAll("input, select, textarea").forEach(el => {
  el.addEventListener("input", () => setError(el.id, false));
});


initLanguage();
