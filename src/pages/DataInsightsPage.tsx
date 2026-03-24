import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Layout from "@/components/Layout";
import { sampleData } from "@/lib/sampleData";
import { useI18n } from "@/lib/i18n";

const COLORS = ["hsl(150,50%,50%)", "hsl(80,50%,50%)", "hsl(40,80%,55%)", "hsl(20,80%,55%)", "hsl(0,70%,55%)"];

// Age group vs Depression rate
const ageGroups = [
  { range: "18-20", total: 0, depressed: 0 },
  { range: "21-23", total: 0, depressed: 0 },
  { range: "24-27", total: 0, depressed: 0 },
];
sampleData.forEach((d) => {
  const idx = d.age <= 20 ? 0 : d.age <= 23 ? 1 : 2;
  ageGroups[idx].total++;
  if (d.depression === 1) ageGroups[idx].depressed++;
});
const ageData = ageGroups.map(g => ({ range: g.range, rate: g.total ? Math.round((g.depressed / g.total) * 100) : 0 }));

// Depression distribution
const depressedCount = sampleData.filter(d => d.depression === 1).length;
const notDepressedCount = sampleData.filter(d => d.depression === 0).length;
const depressionDist = [
  { name: "Depressed", value: depressedCount },
  { name: "Not Depressed", value: notDepressedCount },
];

// Academic Pressure vs Depression rate
const pressureData = [1, 2, 3, 4, 5].map(p => {
  const items = sampleData.filter(d => d.academicPressure === p);
  const dep = items.filter(d => d.depression === 1).length;
  return { pressure: p, rate: items.length ? Math.round((dep / items.length) * 100) : 0 };
});

// Gender-wise depression rate
const genderData = ["Male", "Female"].map(g => {
  const items = sampleData.filter(d => d.gender === g);
  const dep = items.filter(d => d.depression === 1).length;
  return { gender: g, rate: items.length ? Math.round((dep / items.length) * 100) : 0 };
});

// Sleep Duration vs Depression
const sleepCategories = ["Less than 5 hours", "5-6 hours", "7-8 hours", "More than 8 hours"];
const sleepData = sleepCategories.map(s => {
  const items = sampleData.filter(d => d.sleepDuration === s);
  const dep = items.filter(d => d.depression === 1).length;
  return { sleep: s.replace(" hours", "h"), rate: items.length ? Math.round((dep / items.length) * 100) : 0 };
});

// Financial Stress vs Depression
const finStressData = [1, 2, 3, 4, 5].map(f => {
  const items = sampleData.filter(d => d.financialStress === f);
  const dep = items.filter(d => d.depression === 1).length;
  return { stress: f, rate: items.length ? Math.round((dep / items.length) * 100) : 0 };
});

const DataInsightsPage = () => {
  const { t } = useI18n();
  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-3 text-center">{t.dataInsights.title}</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">{t.dataInsights.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.ageVsDep}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="rate" fill="hsl(340,60%,85%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.levelDist}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={depressionDist} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    <Cell fill={COLORS[4]} />
                    <Cell fill={COLORS[0]} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.pressureVsDep}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={pressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="pressure" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Line type="monotone" dataKey="rate" stroke="hsl(200,50%,60%)" strokeWidth={2} dot={{ fill: "hsl(200,50%,60%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.genderAvg}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={genderData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="gender" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="rate" fill="hsl(200,50%,85%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.sleepVsDep}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sleep" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="rate" fill="hsl(270,50%,75%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.finStressVsDep}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={finStressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="stress" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Line type="monotone" dataKey="rate" stroke="hsl(30,80%,55%)" strokeWidth={2} dot={{ fill: "hsl(30,80%,55%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-12">
            <h3 className="font-semibold text-foreground mb-4">{t.dataInsights.sampleDataset}</h3>
            <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    {t.dataInsights.headers.map(h => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((d) => (
                    <tr key={d.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{d.age}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.gender}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.city}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.cgpa}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.academicPressure}/5</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.sleepDuration}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.financialStress}/5</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.dietaryHabits}</td>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{d.depression === 1 ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default DataInsightsPage;
