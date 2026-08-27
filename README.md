# Playwright TypeScript Automation Framework

RealWorld/Conduit uygulaması için Playwright ve TypeScript kullanılarak hazırlanmış API ve UI otomasyon framework'ü.

## Gereksinimler

- Node.js 20 veya üzeri
- npm

## Kurulum

```bash
npm ci
npx playwright install
```

## Testleri çalıştırma

```bash
# Tüm testler
npm test

# Sadece UI testleri
npm run test:ui

# Sadece API testleri
npm run test:api

# Belirli bir tarayıcı projesi
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Testleri daha kararlı ve sıralı çalıştırmak için:

```bash
npx playwright test --workers=1
```

## Proje yapısı

```text
tests/
├── api/       API testleri
├── fixtures/  Ortak Playwright fixture'ları
├── pages/     Page Object Model sınıfları
├── schemas/   Zod response şemaları
├── ui/        UI testleri
└── utils/     API yardımcı fonksiyonları
```

API testleri `api.realworld.show`, UI testleri ise `demo.realworld.show` üzerinde çalışır. API adresini değiştirmek için `API_BASE_URL` environment variable'ı kullanılabilir.

## Raporlar

Test tamamlandıktan sonra HTML raporunu açmak için:

```bash
npm run report
```

Başarısız testlerde trace ve ekran görüntüleri `test-results/` altında tutulur. Bu klasörler git'e eklenmez.

## CI/CD

GitHub Actions workflow'u `.github/workflows/playwright.yml` konumundadır. `main` veya `master` branch'ine yapılan push ve pull request işlemlerinde otomatik olarak:

1. Node.js kurulumu yapılır.
2. `npm ci` ile lockfile üzerinden bağımlılıklar yüklenir.
3. Chromium, Firefox ve WebKit kurulup test edilir.
4. HTML raporu ve test sonuçları artifact olarak yüklenir.

Workflow sonucu GitHub Actions run sayfasındaki **Artifacts** bölümünden `playwright-report` ve `playwright-test-results` dosyaları indirilebilir.