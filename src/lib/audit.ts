export type Verdict = "ditolak" | "belum" | "tidak-sah" | "tidak-diukur";

export type Machine = {
  id: string;
  name: string;
  file: string;
  verdict: Verdict;
  verdictLabel: string;
  summary: string;
  rows: { k: string; v: string }[];
};

export const machines: Machine[] = [
  {
    id: "crypto",
    name: "Mesin Crypto",
    file: "engine.mjs · 4H dan 1D",
    verdict: "ditolak",
    verdictLabel: "Ditolak",
    summary:
      "Kohort independen rugi 0,71R per trade. Batas atas win rate masih di bawah titik impas, jadi ini bukan soal sampel yang belum cukup.",
    rows: [
      { k: "Terbit / terpicu", v: "213 / 87" },
      { k: "TP / SL", v: "4 / 75" },
      { k: "Win rate", v: "5,1% (n=79)" },
      { k: "Expectancy", v: "−0,71 R" },
      { k: "Total / max DD", v: "−55,9 / 55,9 R" },
    ],
  },
  {
    id: "tn",
    name: "Mesin TN",
    file: "jurnal Eliz harian · dievaluasi ox",
    verdict: "belum",
    verdictLabel: "Belum layak",
    summary:
      "Rugi 0,30R pada 60 trade independen. Belum cukup untuk mengubur idenya selamanya, sudah cukup untuk tidak menyetor uang.",
    rows: [
      { k: "Terbit / terpicu", v: "196 / 77" },
      { k: "TP / SL", v: "14 / 46" },
      { k: "Win rate", v: "23,3% (n=60)" },
      { k: "Expectancy", v: "−0,30 R" },
      { k: "Total / max DD", v: "−18 / 22 R" },
    ],
  },
  {
    id: "deepseek",
    name: "Mesin DeepSeek",
    file: "core.mjs · protokol baru 20 Okt",
    verdict: "tidak-sah",
    verdictLabel: "Tidak sah",
    summary:
      "Filter “professional” dipasang setelah melihat kerugian, lalu protokol forward direset. Jurnal tersegel masih menunggu. Kartu 100% adalah satu trade.",
    rows: [
      { k: "Sesuai hash protokol", v: "2 sinyal" },
      { k: "Trade terisi / selesai", v: "0 / 0" },
      { k: "Diabaikan, hash lain", v: "1 baris" },
      { k: "Kartu kompilasi", v: "1 TP, n=1" },
      { k: "CI win rate", v: "21% – 100%" },
    ],
  },
  {
    id: "grok",
    name: "Mesin Grok",
    file: "eliz.ts · Monday sweep + box",
    verdict: "tidak-diukur",
    verdictLabel: "Tidak diukur",
    summary:
      "Pola yang sama dengan keranjang rugi terbesar mesin lain: sweep Monday lalu reclaim. Satu TP tidak mengukur apa pun. Tidak ada rantai hash.",
    rows: [
      { k: "Terbit / terpicu", v: "7 / 2" },
      { k: "TP / SL", v: "1 / 0" },
      { k: "Sampel selesai", v: "n=1" },
      { k: "Expectancy kartu", v: "+1,75 R" },
      { k: "CI win rate", v: "21% – 100%" },
    ],
  },
];

export const cohort = {
  note: "Angka Excel dan benchmark ox. Satu setup per klaster near-duplicate. Biaya belum dipotong.",
  crypto: { n: 79, exp: -0.707, total: -55.87, dd: 55.87, wr: 0.051, wins: 4 },
  tn: { n: 60, exp: -0.3, total: -18, dd: 22, wr: 0.233, wins: 14 },
  diff: -0.407,
  diffCi: [-0.831, 0.086] as const,
};

export const fullBook = {
  note: "Semua kartu terekam di setups.json, termasuk kembar. Inilah P&L jika setiap kartu diambil 1R.",
  crypto: {
    published: 442,
    triggered: 204,
    resolved: 181,
    exp: -0.423,
    total: -76.54,
    dd: 88.22,
    wr: 0.105,
    wins: 19,
    avgWin: 4.5,
    beWr: 0.182,
    p: 0.003,
    weeks: 2,
    ci: [-0.93, -0.15] as const,
    fillPct: 46,
    expiredTpFirst: 107,
    expiredTtl: 56,
  },
  tn: {
    published: 237,
    triggered: 95,
    resolved: 75,
    exp: -0.28,
    total: -20.99,
    dd: 23.99,
    wr: 0.24,
    wins: 18,
    avgWin: 2,
    beWr: 0.333,
    p: 0.053,
    weeks: 4,
    ci: [-0.65, 0.29] as const,
    fillPct: 40,
    expiredTpFirst: 115,
    expiredTtl: 10,
  },
};

export const cryptoDays = [
  { d: "16", r: 0.3 },
  { d: "17", r: -10.9 },
  { d: "18", r: -48 },
  { d: "19", r: -10 },
  { d: "20", r: -14.3 },
  { d: "21", r: 76.4 },
  { d: "22", r: -36 },
  { d: "23", r: -13 },
  { d: "24", r: -20 },
  { d: "25", r: -1 },
];

export const tnDays = [
  { d: "04", r: -1 },
  { d: "05", r: 2 },
  { d: "07", r: 2 },
  { d: "08", r: -1 },
  { d: "14", r: -3 },
  { d: "15", r: -11 },
  { d: "16", r: 2 },
  { d: "17", r: -1 },
  { d: "18", r: -8 },
  { d: "19", r: 3 },
  { d: "20", r: 3 },
  { d: "21", r: -4 },
  { d: "22", r: 3 },
  { d: "23", r: 4 },
  { d: "24", r: -11 },
];

export const defects = [
  {
    machine: "Crypto",
    title: "Satu ide dihitung berkali-kali",
    body: "18 Oktober: 48 stop dalam sehari, −48R. 21 Oktober yang kelihatan menyelamatkan buku (+76R) hanya 4 simbol, dan pemenang terbesarnya MSTRB yang tercatat berulang. Altcoin bergerak bersama. Itu satu taruhan beta, bukan 48 observasi.",
  },
  {
    machine: "Crypto dan TN",
    title: "Limit di level yang jelas memilih yang kalah",
    body: "107 setup Crypto dan 115 setup TN kedaluwarsa karena TP tercapai sebelum entry tersentuh. Order yang bagus tidak terisi. Yang terisi lanjut menembus stop. Ini adverse selection, bukan nasib beberapa koin.",
  },
  {
    machine: "Crypto",
    title: "Stop sumbu, bukan close",
    body: "Materi Eliz membatalkan setup bila candle penutup melewati level. Default engine memotong pada sumbu plus 0,25 ATR. Di 4 jam, sumbu adalah noise. Mode close-stop ada di kode, tetapi tidak yang dijalankan.",
  },
  {
    machine: "TN / DeepSeek",
    title: "Versi dicampur, protokol disobek",
    body: "20 Oktober core.mjs ditambah filter karena pola tertentu 0%. Protokol lama diarsipkan, yang baru mulai dari nol, lalu satu baris jurnal sudah pakai hash mesin lain dan dibuang protokol. Buku −18R dan kartu 100% bukan mesin yang sama.",
  },
  {
    machine: "TN",
    title: "Kantong hijau adalah rezim, bukan izin",
    body: "SHORT 19 trade, +0,89R. LONG 41 trade, −0,85R. Hampir seluruh LONG yang telanjang adalah sweep Monday Low. Mematikan LONG setelah melihat Oktober, lalu menyebut sisanya edge, adalah memilih sel yang menang. Protokol mesin sendiri melarang itu.",
  },
  {
    machine: "Grok",
    title: "Catatan risiko tidak menjadi gerbang",
    body: "Kode menulis “risk ≤ 0,75%, maksimal 4 ide”. Tidak ada yang menolak order bila aturan itu dilanggar, tidak ada biaya, tidak ada baseline, tidak ada cap panas portofolio. Skor 72 ke atas langsung jadi rekomendasi.",
  },
];

export const mejaRules = [
  {
    n: "01",
    title: "Meja tidak menerbitkan sinyal",
    body: "Ia hanya memberi izin. Empat mesin boleh mengusulkan. Tidak satu pun yang boleh dieksekusi sebelum gerbang di bawah lulus pada hash yang sama.",
  },
  {
    n: "02",
    title: "Satu ide, bukan satu koin",
    body: "Semua sinyal searah pada hari yang sama berbagi 1R. Dua puluh altcoin searah adalah satu taruhan. Risiko dibagi, tidak dikalikan.",
  },
  {
    n: "03",
    title: "Satu tiket per simbol per 24 jam",
    body: "Level yang bergeser sedikit bukan setup baru. Ini sudah tertulis di protokol benchmark, tetapi tidak dijalankan sebagai batas order.",
  },
  {
    n: "04",
    title: "Biaya selalu masuk angka",
    body: "0,05% fee per sisi ditambah 0,05% slippage pada trade yang terisi. Trade yang tidak terisi tidak dikenai biaya, dan tidak dihitung sebagai menang.",
  },
  {
    n: "05",
    title: "Ukuran sebelum ada bukti",
    body: "0,25% ekuitas per ide. Naik ke 0,5% hanya setelah gerbang bukti lulus. Tidak ada leverage “karena yakin pada pola”.",
  },
  {
    n: "06",
    title: "Saklar mati mingguan",
    body: "Keranjang minggu ini ≤ −4R: semua ide ditutup dari daftar sampai Senin berikutnya. Tidak ada “balas dendam” di hari yang sama.",
  },
  {
    n: "07",
    title: "Hash beku",
    body: "Mengubah engine, filter, atau target memulai protokol baru. Baris lama tidak boleh digabung. Menghapus Monday Low karena 0% di Oktober tidak membuat sisa sampel jadi bukti.",
  },
];

export type Sim = {
  filled: number;
  weeks: number;
  ciAboveZero: boolean;
  hashFrozen: boolean;
  sameDaySignals: number;
  riskPct: number;
  weekR: number;
};

export const presets: { id: string; label: string; sim: Sim }[] = [
  {
    id: "tn",
    label: "TN sekarang",
    sim: {
      filled: 60,
      weeks: 3,
      ciAboveZero: false,
      hashFrozen: false,
      sameDaySignals: 14,
      riskPct: 1,
      weekR: -11,
    },
  },
  {
    id: "crypto",
    label: "Crypto sekarang",
    sim: {
      filled: 79,
      weeks: 2,
      ciAboveZero: false,
      hashFrozen: true,
      sameDaySignals: 48,
      riskPct: 1,
      weekR: -48,
    },
  },
  {
    id: "grok",
    label: "Grok / DeepSeek",
    sim: {
      filled: 1,
      weeks: 1,
      ciAboveZero: false,
      hashFrozen: false,
      sameDaySignals: 2,
      riskPct: 0.75,
      weekR: 1.75,
    },
  },
  {
    id: "lulus",
    label: "Jika gerbang lulus",
    sim: {
      filled: 150,
      weeks: 20,
      ciAboveZero: true,
      hashFrozen: true,
      sameDaySignals: 1,
      riskPct: 0.25,
      weekR: 0.4,
    },
  },
];

export type Check = { ok: boolean; name: string; detail: string };

export function judge(s: Sim): { checks: Check[]; live: boolean; paper: boolean; reason: string } {
  const evidence =
    s.hashFrozen && s.filled >= 150 && s.weeks >= 20 && s.ciAboveZero;
  const sizeOk = evidence ? s.riskPct > 0 && s.riskPct <= 0.5 : s.riskPct > 0 && s.riskPct <= 0.25;
  const heatOk = s.sameDaySignals <= 1;
  const alive = s.weekR > -4;
  const checks: Check[] = [
    {
      ok: s.hashFrozen,
      name: "Hash mesin beku",
      detail: s.hashFrozen ? "Satu versi, tidak diubah setelah melihat hasil." : "Versi tercampur atau protokol sudah direset.",
    },
    {
      ok: s.filled >= 150,
      name: "150 trade terisi",
      detail: `${s.filled} dari 150 pada hash ini.`,
    },
    {
      ok: s.weeks >= 20,
      name: "20 minggu independen",
      detail: `${s.weeks} dari 20. Trade satu hari bukan 20 observasi.`,
    },
    {
      ok: s.ciAboveZero,
      name: "Batas bawah CI95 > 0",
      detail: "Bootstrap per minggu, expectancy bersih setelah biaya.",
    },
    {
      ok: sizeOk,
      name: "Ukuran posisi",
      detail: evidence ? "Maks 0,5% per ide setelah bukti." : "Maks 0,25% per ide selama bukti belum ada.",
    },
    {
      ok: heatOk,
      name: "Satu ide per hari",
      detail: heatOk
        ? "Tidak menumpuk koin searah."
        : `${s.sameDaySignals} sinyal searah = 1 ide. Risiko dibagi, bukan dikali.`,
    },
    {
      ok: alive,
      name: "Saklar mati",
      detail: alive ? "Keranjang minggu ini masih di atas −4R." : "Minggu ini sudah ≤ −4R. Flat sampai Senin.",
    },
  ];
  const paper = checks.filter((c) => c.name !== "Satu ide per hari").every((c) => c.ok) && sizeOk;
  const live = evidence && checks.every((c) => c.ok);
  let reason = "Ditolak. Jangan pasang order.";
  if (live) reason = "Ukuran kecil boleh. Ini bukan izin memperbesar.";
  else if (!alive) reason = "Saklar mati. Tidak ada order sampai Senin.";
  else if (!evidence) reason = "Bukti belum ada. Uang beneran tetap di luar.";
  else if (!sizeOk) reason = "Bukti ada, tetapi ukuran posisi melebihi 0,5%.";
  else if (!heatOk) reason = "Bukti ada, tetapi sinyal hari ini masih ditumpuk. Gabungkan jadi satu ide dulu.";
  return { checks, live, paper, reason };
}

export function formatR(n: number, digits = 2): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  return sign + Math.abs(n).toFixed(digits).replace(".", ",");
}

export function formatPct(n: number): string {
  return (n * 100).toFixed(1).replace(".", ",") + "%";
}
