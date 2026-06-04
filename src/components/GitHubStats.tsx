import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Code2, Star, GitFork, ExternalLink } from "lucide-react";

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
}

const GITHUB_USERNAME = "Bhuvangs04";

// Contribution heatmap: simplified 52-week mock grid
const generateContribGrid = () => {
  const grid: number[][] = [];
  for (let week = 0; week < 52; week++) {
    const days: number[] = [];
    for (let day = 0; day < 7; day++) {
      // Random contribution levels 0-4
      const rand = Math.random();
      if (rand < 0.3) days.push(0);
      else if (rand < 0.55) days.push(1);
      else if (rand < 0.75) days.push(2);
      else if (rand < 0.9) days.push(3);
      else days.push(4);
    }
    grid.push(days);
  }
  return grid;
};

const contribColors = [
  "bg-muted/40",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/60",
  "bg-primary/90",
];

// LeetCode stats (static - update these values)
const leetcodeStats = {
  totalSolved: 150,
  easy: 70,
  medium: 65,
  hard: 15,
  contestRating: "—",
};

export const GitHubStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [contribGrid] = useState(() => generateContribGrid());

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!res.ok) throw new Error("GitHub API failed");
        const data = await res.json();

        // Fetch repos for stars count
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        const repos = reposRes.ok ? await reposRes.json() : [];
        const totalStars = Array.isArray(repos)
          ? repos.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0)
          : 0;

        // Compute top languages from repos
        const langMap: Record<string, number> = {};
        if (Array.isArray(repos)) {
          repos.forEach((r: { language: string | null }) => {
            if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
          });
        }
        const totalLangs = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
        const topLanguages = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLangs) * 100),
          }));

        setGithubData({
          publicRepos: data.public_repos || 0,
          followers: data.followers || 0,
          totalStars,
          topLanguages,
        });
      } catch {
        // Fallback data
        setGithubData({
          publicRepos: 15,
          followers: 5,
          totalStars: 10,
          topLanguages: [
            { name: "JavaScript", percentage: 35 },
            { name: "TypeScript", percentage: 25 },
            { name: "Java", percentage: 20 },
            { name: "Python", percentage: 15 },
            { name: "CSS", percentage: 5 },
          ],
        });
      }
    };
    fetchGitHub();
  }, []);

  return (
    <section id="github-stats" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            GitHub & <span className="gradient-text">Coding Stats</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Activity metrics and problem-solving journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GitHub</h3>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  @{GITHUB_USERNAME} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Repositories", value: githubData?.publicRepos ?? "—", icon: GitFork },
                { label: "Stars", value: githubData?.totalStars ?? "—", icon: Star },
                { label: "Followers", value: githubData?.followers ?? "—", icon: Github },
              ].map((stat) => (
                <div key={stat.label} className="text-center glass rounded-xl p-3">
                  <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Contribution Graph */}
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium">
                Contribution Activity
              </p>
              <div className="flex gap-[3px] overflow-x-auto pb-2">
                {contribGrid.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <motion.div
                        key={`${wi}-${di}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: (wi * 7 + di) * 0.001,
                          duration: 0.2,
                        }}
                        className={`contrib-cell w-[10px] h-[10px] ${contribColors[level]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Languages */}
            {githubData?.topLanguages && (
              <div className="mt-5">
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  Top Languages
                </p>
                <div className="space-y-2">
                  {githubData.topLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-3">
                      <span className="text-xs w-24 text-muted-foreground">{lang.name}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${lang.percentage}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">
                        {lang.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LeetCode</h3>
                <p className="text-xs text-muted-foreground">
                  DSA Problem Solving
                </p>
              </div>
            </div>

            {/* Total Solved */}
            <div className="text-center mb-8">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="url(#lcGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 60}`}
                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - leetcodeStats.totalSolved / 300)}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                    animate={
                      isInView
                        ? {
                            strokeDashoffset:
                              2 * Math.PI * 60 * (1 - leetcodeStats.totalSolved / 300),
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, delay: 0.3 }}
                    transform="rotate(-90 70 70)"
                  />
                  <defs>
                    <linearGradient id="lcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-bold">{leetcodeStats.totalSolved}</p>
                  <p className="text-xs text-muted-foreground">Solved</p>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Easy", value: leetcodeStats.easy, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { label: "Medium", value: leetcodeStats.medium, color: "text-amber-400", bg: "bg-amber-400/10" },
                { label: "Hard", value: leetcodeStats.hard, color: "text-red-400", bg: "bg-red-400/10" },
              ].map((diff) => (
                <div key={diff.label} className={`text-center rounded-xl p-3 ${diff.bg}`}>
                  <p className={`text-2xl font-bold ${diff.color}`}>{diff.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{diff.label}</p>
                </div>
              ))}
            </div>

            {/* Contest Rating */}
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Contest Rating</p>
              <p className="text-lg font-bold text-secondary">{leetcodeStats.contestRating}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
