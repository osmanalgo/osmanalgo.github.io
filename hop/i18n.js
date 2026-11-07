/* hop! · osman.algo — 3 dil (ar / tr / en)
 * Dil sırası: ?lang= → kayıtlı seçim → telefon dili (ar→ar, tr→tr, diğer→en)
 * Kullanım: data-i18n (metin), data-i18n-html, data-i18n-ph (placeholder), data-i18n-aria
 *           t('anahtar', {n: 5}) · <div data-lng></div> dil düğmesi · window.onLang() yeniden çizim
 */
(function () {
  const SUP = ['ar', 'tr', 'en'];
  const S = {
    /* ---------- ortak ---------- */
    'c.powered': { tr: 'ile ücretsiz · osman.algo', ar: 'مجاني · osman.algo', en: 'free · osman.algo' },
    'c.demoName': { tr: 'Kafem', ar: 'مقهاي', en: 'My Café' },
    'c.min': { tr: 'dk', ar: 'دقيقة', en: 'min' },

    /* ---------- müşteri ---------- */
    'm.title': { tr: 'hop! · Sipariş Takibi', ar: 'hop! · تتبّع الطلب', en: 'hop! · Order tracking' },
    'm.yourNo': { tr: 'Sipariş numaranız', ar: 'رقم طلبك', en: 'Your order number' },
    'm.start': { tr: 'Takibi başlat', ar: 'ابدأ التتبّع', en: 'Start tracking' },
    'm.startHint': { tr: 'Siparişiniz hazır olunca telefonunuz çalacak. Bu sayfayı açık bırakın, ekran kendiliğinden kapanmaz.', ar: 'سيرنّ هاتفك عندما يجهز طلبك. اترك هذه الصفحة مفتوحة، ولن تنطفئ الشاشة من تلقاء نفسها.', en: "Your phone will ring when your order is ready. Keep this page open — the screen won't turn off by itself." },
    'm.order': { tr: 'Sipariş', ar: 'الطلب', en: 'Order' },
    'm.preparing': { tr: 'Hazırlanıyor', ar: 'قيد التحضير', en: 'Preparing' },
    'm.queue': { tr: 'sıradaki konumunuz', ar: 'ترتيبك في الدور', en: 'your place in line' },
    'm.eta': { tr: 'tahmini süre', ar: 'الوقت المتوقع', en: 'estimated time' },
    'm.live': { tr: 'Canlı takip açık', ar: 'التتبّع المباشر يعمل', en: 'Live tracking on' },
    'm.waitConn': { tr: 'Bağlantı bekleniyor…', ar: 'بانتظار الاتصال…', en: 'Waiting for connection…' },
    'm.approx': { tr: '~{n} dk', ar: '\u2066~{n}\u2069 دقيقة', en: '~{n} min' },
    'm.soon': { tr: 'az kaldı', ar: 'قريباً جداً', en: 'almost ready' },
    'm.readyH': { tr: 'Siparişiniz hazır', ar: 'طلبك جاهز', en: 'Your order is ready' },
    'm.number': { tr: 'Numara', ar: 'الرقم', en: 'Number' },
    'm.counter': { tr: 'Lütfen tezgâha gelin.', ar: 'تفضّل إلى الكاونتر.', en: 'Please come to the counter.' },
    'm.gotIt': { tr: 'Aldım, sesi kapat', ar: 'استلمته، أوقف الصوت', en: 'Got it, stop the sound' },
    'm.muted': { tr: 'Ses kapatıldı', ar: 'تم إيقاف الصوت', en: 'Sound off' },
    'm.enjoy': { tr: 'Afiyet olsun', ar: 'بالهناء والشفاء', en: 'Enjoy!' },
    'm.thanks': { tr: 'Bizi tercih ettiğiniz için teşekkürler.', ar: 'شكراً لاختيارك لنا.', en: 'Thanks for choosing us.' },
    'm.nfT': { tr: 'Sipariş bulunamadı', ar: 'لم يتم العثور على الطلب', en: 'Order not found' },
    'm.nfM': { tr: 'Numara bugün için kayıtlı değil. QR kodu tekrar okutun ya da kasaya danışın.', ar: 'هذا الرقم غير مسجّل اليوم. امسح رمز QR مرة أخرى أو اسأل عند الكاشير.', en: "This number isn't registered today. Scan the QR code again or ask at the counter." },
    'm.cancT': { tr: 'Sipariş iptal edildi', ar: 'تم إلغاء الطلب', en: 'Order cancelled' },
    'm.cancM': { tr: 'Bu sipariş kafe tarafından iptal edildi. Bir sorun varsa kasaya danışın.', ar: 'ألغى المكان هذا الطلب. إذا كان هناك خطأ، اسأل عند الكاشير.', en: "The café cancelled this order. If something's wrong, please ask at the counter." },
    'm.badT': { tr: 'Geçersiz bağlantı', ar: 'رابط غير صالح', en: 'Invalid link' },
    'm.badM': { tr: 'Bu sayfa kasadaki QR kod ile açılmalı.', ar: 'يجب فتح هذه الصفحة بمسح رمز QR عند الكاشير.', en: 'Open this page by scanning the QR code at the counter.' },
    'm.nTitle': { tr: 'hop! Siparişiniz hazır', ar: 'hop! طلبك جاهز', en: 'hop! Your order is ready' },
    'm.nBody': { tr: 'Sipariş #{n} hazır, tezgâha gelin.', ar: 'الطلب #{n} جاهز، تفضّل إلى الكاونتر.', en: 'Order #{n} is ready — come to the counter.' },
    'm.tReady': { tr: '🔔 hop! HAZIR', ar: '🔔 hop! جاهز', en: '🔔 hop! READY' },
    'm.tOrder': { tr: 'Sipariş #{n}', ar: 'الطلب #{n}', en: 'Order #{n}' },

    /* ---------- kafe (kasa) ---------- */
    'k.title': { tr: 'hop! · Kafe Ekranı', ar: 'hop! · شاشة الكاشير', en: 'hop! · Cashier screen' },
    'k.setupH': { tr: 'Kafe ekranını bağlayın', ar: 'اربط شاشة الكاشير', en: 'Connect the cashier screen' },
    'k.setupHint': { tr: "Google Sheet'te yayınladığınız web uygulaması bağlantısını yapıştırın. Bu cihaz bağlantıyı hatırlar, bir daha sorulmaz.", ar: 'الصق رابط تطبيق الويب الذي نشرته من Google Sheet. سيتذكّر هذا الجهاز الرابط ولن يطلبه مرة أخرى.', en: "Paste the web app link you deployed from your Google Sheet. This device remembers it — you won't be asked again." },
    'k.connect': { tr: 'Bağlan', ar: 'اتصال', en: 'Connect' },
    'k.checking': { tr: 'Kontrol ediliyor…', ar: 'جارٍ التحقق…', en: 'Checking…' },
    'k.badUrl': { tr: 'Bağlantı tanınmadı. "/exec" ile biten adresi yapıştırın.', ar: 'لم يتم التعرّف على الرابط. الصق العنوان الذي ينتهي بـ ‎/exec', en: 'Link not recognised. Paste the address ending in "/exec".' },
    'k.connFail': { tr: 'Bağlanılamadı. Dağıtımda erişimin "Herkes" olduğundan emin olun.', ar: 'تعذّر الاتصال. تأكد أن صلاحية الوصول في النشر هي "أي شخص" (Anyone).', en: 'Couldn\'t connect. Make sure access is set to "Anyone" in the deployment.' },
    'k.pinEnter': { tr: 'PIN girin', ar: 'أدخل رمز PIN', en: 'Enter PIN' },
    'k.pinHint': { tr: 'Kafe ekranı PIN ile korunur.', ar: 'شاشة الكاشير محمية برمز PIN.', en: 'The cashier screen is protected by a PIN.' },
    'k.pinSet': { tr: 'PIN belirleyin', ar: 'اختر رمز PIN', en: 'Set a PIN' },
    'k.pinSetHint': { tr: 'Kafe ekranını korumak için 4–12 haneli bir PIN seçin.', ar: 'اختر رمزاً من 4 إلى 12 رقماً لحماية شاشة الكاشير.', en: 'Choose a 4–12 digit PIN to protect the cashier screen.' },
    'k.pinAgain': { tr: 'PIN tekrar', ar: 'أعد إدخال الرمز', en: 'PIN again' },
    'k.pinAgainHint': { tr: "Aynı PIN'i bir kez daha girin.", ar: 'أدخل الرمز نفسه مرة أخرى.', en: 'Enter the same PIN once more.' },
    'k.pinMismatch': { tr: "PIN'ler eşleşmedi", ar: 'الرمزان غير متطابقين', en: "PINs don't match" },
    'k.min4': { tr: 'En az 4 rakam', ar: '4 أرقام على الأقل', en: 'At least 4 digits' },
    'k.saveFail': { tr: 'Kaydedilemedi', ar: 'تعذّر الحفظ', en: "Couldn't save" },
    'k.netErr': { tr: 'Bağlantı hatası', ar: 'خطأ في الاتصال', en: 'Connection error' },
    'k.pinWrong': { tr: 'PIN yanlış', ar: 'رمز PIN خاطئ', en: 'Wrong PIN' },
    'k.ok': { tr: 'Tamam', ar: 'تم', en: 'OK' },
    'k.live': { tr: 'Canlı', ar: 'مباشر', en: 'Live' },
    'k.noConn': { tr: 'Bağlantı yok, tekrar deneniyor', ar: 'لا يوجد اتصال، جارٍ إعادة المحاولة', en: 'No connection, retrying' },
    'k.settings': { tr: 'Ayarlar', ar: 'الإعدادات', en: 'Settings' },
    'k.newOrder': { tr: 'Yeni sipariş', ar: 'طلب جديد', en: 'New order' },
    'k.colPrep': { tr: 'Hazırlanıyor', ar: 'قيد التحضير', en: 'Preparing' },
    'k.colReady': { tr: 'Hazır · çağrılıyor', ar: 'جاهز · جارٍ النداء', en: 'Ready · calling' },
    'k.stat': { tr: 'Bugün {n} sipariş teslim edildi', ar: 'تم تسليم {n} طلب اليوم', en: '{n} orders delivered today' },
    'k.orderNo': { tr: 'Sipariş numarası', ar: 'رقم الطلب', en: 'Order number' },
    'k.qrHint': { tr: 'Müşteri telefon kamerasıyla okutsun. Hazır olunca telefonu çalacak.', ar: 'يمسح الزبون الرمز بكاميرا هاتفه، وسيرنّ هاتفه عندما يجهز الطلب.', en: "The customer scans it with their phone camera. Their phone rings when it's ready." },
    'k.prepTime': { tr: 'Hazırlama süresi (dk)', ar: 'وقت التحضير (دقيقة)', en: 'Prep time (min)' },
    'k.notePh': { tr: 'Not (isteğe bağlı): 2 latte, masa 5…', ar: 'ملاحظة (اختياري): 2 لاتيه، طاولة 5…', en: 'Note (optional): 2 lattes, table 5…' },
    'k.cancelOrder': { tr: 'İptal et', ar: 'إلغاء الطلب', en: 'Cancel order' },
    'k.sure': { tr: 'Emin misiniz?', ar: 'متأكد؟', en: 'Are you sure?' },
    'k.setupDone': { tr: 'Kurulum tamam ✓', ar: 'اكتمل الإعداد ✓', en: 'Setup complete ✓' },
    'k.transferH': { tr: 'Tablete aktar', ar: 'انقلها إلى التابلت', en: 'Move to tablet' },
    'k.transferHint': { tr: "Kasadaki tabletin kamerasıyla bu karekodu okutun. Kafe ekranı bağlı olarak açılır, sadece PIN'i girin.", ar: 'امسح هذا الرمز بكاميرا التابلت الموجود عند الكاشير. ستفتح الشاشة مربوطة وجاهزة، أدخل رمز PIN فقط.', en: 'Scan this code with the tablet at the counter. The cashier screen opens already connected — just enter the PIN.' },
    'k.continueHere': { tr: 'Bu cihazda devam et', ar: 'المتابعة على هذا الجهاز', en: 'Continue on this device' },
    'k.transferBtn': { tr: '📲 Tablete / başka cihaza aktar', ar: '📲 انقلها إلى تابلت / جهاز آخر', en: '📲 Move to tablet / another device' },
    'k.lang': { tr: 'Dil', ar: 'اللغة', en: 'Language' },
    'k.tvLink': { tr: 'TV / bekleme ekranı bağlantısı', ar: 'رابط شاشة التلفزيون / الانتظار', en: 'TV / waiting screen link' },
    'k.copy': { tr: 'Kopyala', ar: 'نسخ', en: 'Copy' },
    'k.copied': { tr: 'Kopyalandı', ar: 'تم النسخ', en: 'Copied' },
    'k.pinChange': { tr: 'PIN değiştir (4–12 rakam)', ar: 'تغيير رمز PIN (4–12 رقماً)', en: 'Change PIN (4–12 digits)' },
    'k.newPin': { tr: 'Yeni PIN', ar: 'رمز جديد', en: 'New PIN' },
    'k.save': { tr: 'Kaydet', ar: 'حفظ', en: 'Save' },
    'k.pinRule': { tr: 'PIN 4–12 rakam olmalı', ar: 'يجب أن يكون الرمز من 4 إلى 12 رقماً', en: 'PIN must be 4–12 digits' },
    'k.pinChanged': { tr: 'PIN değiştirildi', ar: 'تم تغيير الرمز', en: 'PIN changed' },
    'k.logout': { tr: 'Çıkış yap', ar: 'تسجيل الخروج', en: 'Log out' },
    'k.unlink': { tr: 'Bağlantıyı değiştir', ar: 'تغيير الربط', en: 'Change link' },
    'k.instH': { tr: "hop!'ı uygulama olarak yükleyin", ar: 'ثبّت hop! كتطبيق', en: 'Install hop! as an app' },
    'k.instT': { tr: 'Ana ekrandan tek dokunuşla, tam ekran açılır.', ar: 'يفتح بلمسة واحدة من الشاشة الرئيسية، بملء الشاشة.', en: 'Opens full-screen from your home screen in one tap.' },
    'k.instIosH': { tr: "hop!'ı ana ekrana ekleyin", ar: 'أضف hop! إلى الشاشة الرئيسية', en: 'Add hop! to your Home Screen' },
    'k.instIosT': { tr: "Safari'de alttaki <em>Paylaş</em> ⬆︎ simgesine, sonra <em>Ana Ekrana Ekle</em>'ye dokunun.", ar: 'في Safari اضغط أيقونة <em>مشاركة</em> ⬆︎ في الأسفل، ثم <em>إضافة إلى الشاشة الرئيسية</em>.', en: 'In Safari, tap the <em>Share</em> ⬆︎ icon at the bottom, then <em>Add to Home Screen</em>.' },
    'k.install': { tr: 'Yükle', ar: 'تثبيت', en: 'Install' },
    'k.close': { tr: 'Kapat', ar: 'إغلاق', en: 'Close' },
    'k.qrEdit': { tr: 'QR · düzenle', ar: 'QR · تعديل', en: 'QR · edit' },
    'k.cancel': { tr: 'İptal', ar: 'إلغاء', en: 'Cancel' },
    'k.readyBtn': { tr: 'Hazır ✓', ar: 'جاهز ✓', en: 'Ready ✓' },
    'k.calling': { tr: 'Müşteri çağrılıyor', ar: 'جارٍ نداء الزبون', en: 'Calling customer' },
    'k.undo': { tr: 'Geri al', ar: 'تراجع', en: 'Undo' },
    'k.delivered': { tr: 'Teslim edildi', ar: 'تم التسليم', en: 'Delivered' },
    'k.empty1': { tr: 'Bekleyen sipariş yok.<br>"Yeni sipariş" ile başlayın.', ar: 'لا توجد طلبات قيد الانتظار.<br>ابدأ بزر "طلب جديد".', en: 'No pending orders.<br>Start with "New order".' },
    'k.empty2': { tr: 'Hazır sipariş yok.', ar: 'لا توجد طلبات جاهزة.', en: 'No ready orders.' },
    'k.called': { tr: 'hop! #{n} çağrıldı', ar: 'hop! تم نداء #{n}', en: 'hop! #{n} called' },
    'k.cancelled': { tr: '#{n} iptal edildi', ar: 'تم إلغاء #{n}', en: '#{n} cancelled' },
    'k.actFail': { tr: 'İşlem yapılamadı, tekrar deneyin', ar: 'تعذّر تنفيذ العملية، حاول مرة أخرى', en: "Couldn't do that, please try again" },
    'k.newFail': { tr: 'Sipariş oluşturulamadı, tekrar deneyin', ar: 'تعذّر إنشاء الطلب، حاول مرة أخرى', en: "Couldn't create the order, try again" },
    'k.gettingNo': { tr: 'Sipariş numarası alınıyor…', ar: 'جارٍ الحصول على رقم الطلب…', en: 'Getting order number…' },
    'k.saveRetry': { tr: 'Kaydedilemedi, tekrar deneyin', ar: 'تعذّر الحفظ، حاول مرة أخرى', en: "Couldn't save, try again" },
    'k.demoN1': { tr: '2 latte, 1 tost', ar: '2 لاتيه، 1 توست', en: '2 lattes, 1 toastie' },
    'k.demoN2': { tr: 'Masa 5 · acısız', ar: 'طاولة 5 · بدون حار', en: 'Table 5 · not spicy' },

    /* ---------- TV ---------- */
    'v.title': { tr: 'hop! · Sipariş Ekranı', ar: 'hop! · شاشة الطلبات', en: 'hop! · Order board' },
    'v.prep': { tr: 'Hazırlanıyor', ar: 'قيد التحضير', en: 'Preparing' },
    'v.ready': { tr: 'Hazır · gelin alın', ar: 'جاهز · تفضّلوا بالاستلام', en: 'Ready · please collect' },
    'v.foot': { tr: 'Numaranız hazır olunca burada ve <b>telefonunuzda</b> görünür', ar: 'يظهر رقمك هنا وعلى <b>هاتفك</b> عندما يجهز', en: 'Your number appears here and on <b>your phone</b> when ready' },
    'v.callP': { tr: 'Siparişiniz hazır, tezgâha gelin', ar: 'طلبك جاهز، تفضّل إلى الكاونتر', en: 'Your order is ready — come to the counter' },
    'v.start': { tr: 'Ekranı başlat', ar: 'تشغيل الشاشة', en: 'Start screen' },
    'v.startHint': { tr: 'Sesli anons için bir kez dokunun. Ekran açık kalır, tam ekrana geçer.', ar: 'المس مرة واحدة لتفعيل التنبيه الصوتي. تبقى الشاشة مضاءة وتنتقل إلى ملء الشاشة.', en: 'Tap once to enable sound alerts. The screen stays on and goes full-screen.' },
    'v.emptyPrep': { tr: 'Şu an hazırlanan sipariş yok', ar: 'لا توجد طلبات قيد التحضير الآن', en: 'No orders being prepared right now' },
    'v.emptyReady': { tr: 'Hazır sipariş bekleniyor', ar: 'بانتظار الطلبات الجاهزة', en: 'Waiting for ready orders' },
    'v.badLink': { tr: 'Bu ekran kafe ekranındaki Ayarlar bölümünden alınan bağlantıyla açılmalı.', ar: 'يجب فتح هذه الشاشة من الرابط الموجود في الإعدادات بشاشة الكاشير.', en: 'Open this screen with the link from Settings on the cashier screen.' }
  };

  const store = {
    get() { try { return localStorage.getItem('hop_lang'); } catch (_) { return null; } },
    set(v) { try { localStorage.setItem('hop_lang', v); } catch (_) {} }
  };
  function detect() {
    const p = new URLSearchParams(location.search).get('lang');
    if (SUP.includes(p)) return p;
    const s = store.get();
    if (SUP.includes(s)) return s;
    const l = String((navigator.languages && navigator.languages[0]) || navigator.language || 'en').slice(0, 2).toLowerCase();
    return l === 'ar' || l === 'tr' ? l : 'en';
  }

  let LANG = detect();

  function t(k, v) {
    const e = S[k];
    let s = e ? (e[LANG] || e.en || e.tr) : k;
    if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]);
    return s;
  }

  function apply(root) {
    root = root || document;
    const h = document.documentElement;
    h.lang = LANG; h.dir = LANG === 'ar' ? 'rtl' : 'ltr';
    root.querySelectorAll('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
    root.querySelectorAll('[data-i18n-html]').forEach(e => { e.innerHTML = t(e.dataset.i18nHtml); });
    root.querySelectorAll('[data-i18n-ph]').forEach(e => { e.placeholder = t(e.dataset.i18nPh); });
    root.querySelectorAll('[data-i18n-aria]').forEach(e => { e.setAttribute('aria-label', t(e.dataset.i18nAria)); });
    root.querySelectorAll('[data-lng] button').forEach(b => b.classList.toggle('on', b.dataset.l === LANG));
  }

  function set(l) {
    if (!SUP.includes(l) || l === LANG) return;
    LANG = l; store.set(l); apply();
    if (typeof window.onLang === 'function') window.onLang(l);
  }

  // Dil düğmesi: <div class="lng" data-lng></div>
  function mount() {
    document.querySelectorAll('[data-lng]').forEach(w => {
      if (w.childElementCount) return;
      w.setAttribute('dir', 'ltr');
      w.innerHTML = '<button type="button" data-l="ar">ع</button><button type="button" data-l="tr">TR</button><button type="button" data-l="en">EN</button>';
      w.addEventListener('click', e => { const b = e.target.closest('button'); if (b) set(b.dataset.l); });
    });
    apply();
  }

  window.I18N = { t, set, apply, get lang() { return LANG; } };
  window.t = t;
  // ilk boyama öncesi yön/dil
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr';
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
