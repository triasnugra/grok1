import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Lock, ShieldAlert } from "lucide-react";
import {
  cryptoDays,
  defects,
  formatR,
  fullBook,
  judge,
  machines,
  mejaRules,
  presets,
  tnDays,
  type Sim,
  type Verdict,
} from "@/lib/audit";

const verdictTone: Record<Verdict, string> = {
  ditolak: "text-signal",
  belum: "text-signal",
  "tidak-sah": "text-signal",
  "tidak-diukur": "text-muted",
};

export function AuditDesk() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-fg/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-widest text-muted uppercase">Komite risiko · 4–25 Oktober 2026</p>
            <p className="mt-1 font-medium">Meja Audit</p>
          </div>
          <p className="num text-xs text-muted">Empat mesin · satu buku aturan</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <LockBanner />
        <MachineGrid />
        <Facts />
        <DayBook />
        <Defects />
        <Meja />
        <GateTool />
        <NextTest />
        <footer className="mt-14 border-t border-fg/15 pt-6 text-sm text-muted">
          Hasil teoretis dari candle Binance, bukan eksekusi bursa dan bukan nasihat untuk menyetor modal. Satu rezim
          pasar, sekitar tiga minggu. Meja ini menolak memilih pola yang kebetulan hijau di sampel itu.
        </footer>
      </main>
    </div>
  );
}

function LockBanner() {
  return (
    <section className="border border-signal/40 bg-surface">
      <div className="flex flex-col gap-6 px-5 py-6 sm:px-7 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-signal">
            <Lock className="size-4" aria-hidden="true" />
            <p className="text-xs font-medium tracking-widest uppercase">Modal hidup</p>
          </div>
          <h1 className="mt-3 text-3xl leading-tight font-medium sm:text-4xl">Uang beneran masih dikunci.</h1>
          <p className="mt-3 text-base text-muted">
            Yang terukur hanya dua buku, dan keduanya rugi. DeepSeek dan Grok belum punya rekam jejak. Menggabungkan
            keempatnya tidak menghasilkan mesin yang lebih handal — yang handal adalah gerbang yang menolak order
            sebelum bukti ada.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Stat k="Crypto, kohort" v="−0,71 R" bad />
          <Stat k="TN, kohort" v="−0,30 R" bad />
          <Stat k="DeepSeek terisi" v="0" />
          <Stat k="Grok selesai" v="n=1" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ k, v, bad }: { k: string; v: string; bad?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted">{k}</dt>
      <dd className={`num mt-1 text-xl ${bad ? "text-signal" : "text-fg"}`}>{v}</dd>
    </div>
  );
}

function MachineGrid() {
  return (
    <section className="mt-10" aria-labelledby="mesin">
      <h2 id="mesin" className="text-xs font-medium tracking-widest text-muted uppercase">
        Vonis per mesin
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {machines.map((m) => (
          <article key={m.id} className="border border-fg/15 bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">{m.name}</h3>
                <p className="mt-1 text-xs text-muted">{m.file}</p>
              </div>
              <p className={`text-sm font-medium ${verdictTone[m.verdict]}`}>{m.verdictLabel}</p>
            </div>
            <p className="mt-3 text-sm text-muted">{m.summary}</p>
            <dl className="mt-4 grid grid-cols-2 gap-y-2">
              {m.rows.map((row) => (
                <div key={row.k} className="contents">
                  <dt className="text-xs text-muted">{row.k}</dt>
                  <dd className="num text-right text-sm">{row.v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        Benchmark ox sendiri menyimpulkan kedua buku yang terukur tidak berbeda secara signifikan (selisih expectancy
        −0,41R, CI −0,83 sampai +0,09). Kalimat itu artinya dua-duanya kalah, bukan dua-duanya aman.
      </p>
    </section>
  );
}

function Facts() {
  const c = fullBook.crypto;
  const t = fullBook.tn;
  return (
    <section className="mt-12" aria-labelledby="bukti">
      <h2 id="bukti" className="text-xs font-medium tracking-widest text-muted uppercase">
        Mengapa “tunggu sampel” tidak cukup untuk Crypto
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Kohort Excel sudah membuang kartu kembar: Crypto −55,9R pada 79 trade, TN −18R pada 60. Buku mentah di bawah
        ini menghitung setiap kartu. Keduanya dipakai. Tidak ada yang dipilih karena lebih enak dibaca.
      </p>
      <div className="mt-4 overflow-x-auto border border-fg/15">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Buku penuh</th>
              <th className="px-4 py-3 font-medium">Crypto</th>
              <th className="px-4 py-3 font-medium">TN</th>
            </tr>
          </thead>
          <tbody className="num">
            <Row k="Terbit / terpicu" a={`${c.published} / ${c.triggered}`} b={`${t.published} / ${t.triggered}`} />
            <Row k="TP + SL" a={String(c.resolved)} b={String(t.resolved)} />
            <Row k="Expectancy" a={formatR(c.exp)} b={formatR(t.exp)} bad />
            <Row k="Total R" a={formatR(c.total)} b={formatR(t.total)} bad />
            <Row k="Max drawdown" a={`${formatR(-c.dd)} dari puncak`} b={`${formatR(-t.dd)} dari puncak`} />
            <Row k="Rata menang" a={`${formatR(c.avgWin)} R`} b={`${formatR(t.avgWin)} R`} />
            <Row k="Win rate vs impas" a="10,5% vs 18,2%" b="24% vs 33,3%" />
            <Row k="Peluang hasil seburuk ini bila sebenarnya impas" a="0,3%" b="5,3%" />
            <Row k="CI95 expectancy, bootstrap per minggu" a="−0,93 sampai −0,15" b="−0,65 sampai +0,29" />
            <Row k="TP kena sebelum entry terisi" a={`${c.expiredTpFirst} setup`} b={`${t.expiredTpFirst} setup`} />
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Untuk Crypto, interval minggu seluruhnya di bawah nol dan win rate — bahkan di batas optimistis — tidak
        mencapai titik impas pada payoff yang diamati. Mesin itu, dalam bentuk yang dijalankan, ditolak. TN belum
        tertolak secara formal (batas atas CI masih menyeberang nol) dan tetap rugi. Keduanya jauh dari syarat mesin
        sendiri: 150 trade terisi dan 20 minggu.
      </p>
    </section>
  );
}

function Row({ k, a, b, bad }: { k: string; a: string; b: string; bad?: boolean }) {
  const tone = bad ? "text-signal" : "text-fg";
  return (
    <tr className="border-t border-fg/10">
      <th className="px-4 py-3 text-left font-sans text-sm font-normal text-muted">{k}</th>
      <td className={`px-4 py-3 ${tone}`}>{a}</td>
      <td className={`px-4 py-3 ${tone}`}>{b}</td>
    </tr>
  );
}

function DayBook() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <section className="mt-12" aria-labelledby="hari">
      <h2 id="hari" className="text-xs font-medium tracking-widest text-muted uppercase">
        Buku harian, jika setiap kartu adalah 1R
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Hari hijau Crypto cuma satu. Itu 21 Oktober, +76R dari 21 kartu pada 4 simbol — lalu hari-hari lain kembali
        berhenti di stop. Tanpa tumpukan itu, satu ide per hari (rata-rata R hari itu) membuat Crypto −3,9R dalam 10
        hari. Tetap rugi, tetapi rekening tidak mati dalam sehari.
      </p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <DayChart title="Crypto, jumlah R per hari hasil" data={cryptoDays} ready={ready} />
        <DayChart title="TN, jumlah R per hari hasil" data={tnDays} ready={ready} />
      </div>
    </section>
  );
}

function DayChart({
  title,
  data,
  ready,
}: {
  title: string;
  data: { d: string; r: number }[];
  ready: boolean;
}) {
  return (
    <figure className="border border-fg/15 bg-surface p-4">
      <figcaption className="text-sm">{title}</figcaption>
      <div className="mt-3 h-52">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="d" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                width={36}
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="r" isAnimationActive={false}>
                {data.map((row) => (
                  <Cell key={row.d} fill={row.r < 0 ? "var(--color-signal)" : "var(--color-fg)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted">Memuat buku harian.</p>
        )}
      </div>
    </figure>
  );
}

function Defects() {
  return (
    <section className="mt-12" aria-labelledby="cacat">
      <h2 id="cacat" className="text-xs font-medium tracking-widest text-muted uppercase">
        Cacat di mesin, bukan di pasar semata
      </h2>
      <ol className="mt-4 grid gap-3 lg:grid-cols-2">
        {defects.map((d) => (
          <li key={d.title} className="border border-fg/15 p-5">
            <p className="text-xs text-muted">{d.machine}</p>
            <h3 className="mt-1 font-medium">{d.title}</h3>
            <p className="mt-2 text-sm text-muted">{d.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Meja() {
  return (
    <section className="mt-12" aria-labelledby="meja">
      <h2 id="meja" className="text-xs font-medium tracking-widest text-muted uppercase">
        Yang membuatnya layak disebut profesional
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Bukan mesin kelima yang mematikan baris merah. Setiap filter yang dipilih setelah melihat Oktober akan lulus
        di masa lalu dan gagal di depan. Meja v1 hanya berisi aturan yang benar meskipun sinyalnya tetap buruk:
        jangan menumpuk, jangan mencampur versi, jangan membesar sebelum CI bersih.
      </p>
      <ol className="mt-4 divide-y divide-fg/10 border border-fg/15">
        {mejaRules.map((rule) => (
          <li key={rule.n} className="grid gap-2 px-5 py-4 sm:grid-cols-[4rem_1fr] sm:gap-4">
            <p className="num text-sm text-signal">{rule.n}</p>
            <div>
              <h3 className="font-medium">{rule.title}</h3>
              <p className="mt-1 text-sm text-muted">{rule.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function GateTool() {
  const [sim, setSim] = useState<Sim>(presets[0].sim);
  const [active, setActive] = useState(presets[0].id);
  const verdict = useMemo(() => judge(sim), [sim]);
  const equity = 1000;
  const rawLoss = equity * (sim.riskPct / 100) * Math.max(sim.sameDaySignals, 1);
  const deskLoss = equity * (sim.riskPct / 100);

  function apply(id: string) {
    const found = presets.find((p) => p.id === id);
    if (!found) return;
    setActive(id);
    setSim(found.sim);
  }

  function patch(partial: Partial<Sim>) {
    setActive("custom");
    setSim((prev) => ({ ...prev, ...partial }));
  }

  return (
    <section className="mt-12" aria-labelledby="gerbang">
      <h2 id="gerbang" className="text-xs font-medium tracking-widest text-muted uppercase">
        Gerbang order
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Isi dengan kondisi yang benar-benar akan dijalankan. Default-nya adalah buku yang ada hari ini, dan hasilnya
        tolak.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => apply(p.id)}
            className={`min-h-11 border px-3 text-sm ${
              active === p.id ? "border-fg bg-fg text-bg" : "border-fg/20 bg-surface text-fg"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-fg/15 bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Trade terisi pada hash ini">
              <input
                className="num w-full border border-fg/20 bg-bg px-3 py-2 text-fg"
                inputMode="numeric"
                value={sim.filled}
                onChange={(e) => patch({ filled: clampInt(e.target.value, 0, 500) })}
              />
            </Field>
            <Field label="Minggu independen">
              <input
                className="num w-full border border-fg/20 bg-bg px-3 py-2 text-fg"
                inputMode="numeric"
                value={sim.weeks}
                onChange={(e) => patch({ weeks: clampInt(e.target.value, 0, 80) })}
              />
            </Field>
            <Field label="Sinyal searah hari ini">
              <input
                className="num w-full border border-fg/20 bg-bg px-3 py-2 text-fg"
                inputMode="numeric"
                value={sim.sameDaySignals}
                onChange={(e) => patch({ sameDaySignals: clampInt(e.target.value, 1, 80) })}
              />
            </Field>
            <Field label="Risiko per setup, % ekuitas">
              <input
                className="num w-full border border-fg/20 bg-bg px-3 py-2 text-fg"
                inputMode="decimal"
                value={sim.riskPct}
                onChange={(e) => patch({ riskPct: clampNum(e.target.value, 0.1, 5) })}
              />
            </Field>
            <Field label="R keranjang minggu ini">
              <input
                className="num w-full border border-fg/20 bg-bg px-3 py-2 text-fg"
                inputMode="decimal"
                value={sim.weekR}
                onChange={(e) => patch({ weekR: clampNum(e.target.value, -80, 40) })}
              />
            </Field>
            <div className="flex flex-col justify-end gap-3 pb-1">
              <Toggle
                on={sim.hashFrozen}
                label="Hash masih hash yang disegel"
                onChange={(hashFrozen) => patch({ hashFrozen })}
              />
              <Toggle
                on={sim.ciAboveZero}
                label="Batas bawah CI95 bersih di atas nol"
                onChange={(ciAboveZero) => patch({ ciAboveZero })}
              />
            </div>
          </div>
        </div>

        <div className="border border-fg/15 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-5 text-signal" aria-hidden="true" />
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">{verdict.live ? "Ukuran kecil" : "Tolak"}</p>
              <p className="mt-1 text-lg font-medium">{verdict.reason}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {verdict.checks.map((c) => (
              <li key={c.name} className="flex gap-3 text-sm">
                <span className={`num w-10 shrink-0 ${c.ok ? "text-fg" : "text-signal"}`}>{c.ok ? "lulus" : "gagal"}</span>
                <span>
                  <span className="font-medium">{c.name}. </span>
                  <span className="text-muted">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-fg/15 pt-4 text-sm">
            <p className="text-muted">Pada rekening 1.000 USDT, bila hari ini semua sinyal kena stop:</p>
            <p className="num mt-2 text-signal">
              Ditumpuk: −{money(rawLoss)} ({sim.sameDaySignals} × {String(sim.riskPct).replace(".", ",")}%)
            </p>
            <p className="num mt-1">
              Aturan meja, 1 ide: −{money(deskLoss)}
            </p>
            {rawLoss >= equity ? (
              <p className="mt-2 text-signal">Tumpukan itu menghabiskan rekening di hari yang sama.</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ on, label, onChange }: { on: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex min-h-11 items-center gap-3 text-left text-sm"
    >
      <span className={`num w-12 shrink-0 border px-2 py-1 text-center ${on ? "border-fg text-fg" : "border-signal text-signal"}`}>
        {on ? "ya" : "tidak"}
      </span>
      <span>{label}</span>
    </button>
  );
}

function NextTest() {
  return (
    <section className="mt-12 border border-fg/15 bg-surface p-5 sm:p-7" aria-labelledby="uji">
      <h2 id="uji" className="text-xs font-medium tracking-widest text-muted uppercase">
        Satu uji yang boleh dibuka — bukan yang hijau
      </h2>
      <h3 className="mt-3 text-xl font-medium">H1. Entry konfirmasi close lawan entry sentuh limit.</h3>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Hipotesis ini keluar dari mekanik order, bukan dari baris yang menang. Ratusan setup kedaluwarsa karena harga
        sudah menyentuh target sebelum limit terisi. Yang tersisa adalah setup yang terus berjalan melewati stop.
      </p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted">A, kontrol</dt>
          <dd className="mt-1 text-sm">Isi saat harga menyentuh level. Aturan sekarang.</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">B, perlakuan</dt>
          <dd className="mt-1 text-sm">Tunggu close 4H kembali melewati level, masuk di open berikutnya. SL dan TP harga tidak diubah.</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Lulus</dt>
          <dd className="mt-1 text-sm">Batas bawah CI95 selisih B−A, setelah biaya, di atas nol. Minimal 150 isi pada B dan 20 minggu. Unitnya minggu, bukan trade.</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Yang dilarang selama uji</dt>
          <dd className="mt-1 text-sm">Membuang SHORT atau LONG, mengganti target, atau menghapus Monday Low karena Oktober. Gagal berarti keduanya tetap di luar uang beneran.</dd>
        </div>
      </dl>
    </section>
  );
}

function clampInt(raw: string, min: number, max: number) {
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function clampNum(raw: string, min: number, max: number) {
  const n = Number(raw);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function money(n: number) {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}
