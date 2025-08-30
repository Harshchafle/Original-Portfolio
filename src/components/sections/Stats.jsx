import { Code, Github, ExternalLink } from 'lucide-react';
import FloatingCard from '../common/FloatingCard';
import GlassCard from '../common/GlassCard';
import AnimatedCounter from '../common/AnimatedCounter';
import { useGithubStats } from '../../hooks/useGithubStats';

const Stats = () => {
  const githubStats = useGithubStats();
  
  const leetcodeStats = {
    solved: 500,
    streak: 31,
    rank: 157560,
    rating: 1443,
    loading: false
  };

  return (
    <section id="stats" className="py-32 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <FloatingCard>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Live Statistics
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
        </FloatingCard>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LeetCode Stats */}
          <FloatingCard delay={200}>
            <GlassCard className="p-10 h-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">LeetCode Performance</h3>
                <p className="text-gray-400">Competitive Programming Excellence</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: 'Problems Solved', value: leetcodeStats.solved, color: 'text-green-400', icon: '🎯' },
                  { label: 'Current Streak', value: leetcodeStats.streak, color: 'text-orange-400', icon: '🔥' },
                  { label: 'Global Rank', value: leetcodeStats.rank, color: 'text-red-400', icon: '🏆' },
                  { label: 'Contest Rating', value: leetcodeStats.rating, color: 'text-blue-400', icon: '⚡' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-4xl font-black mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                      {stat.label === 'Global Rank' ? (
                        <AnimatedCounter end={157560} />
                      ) : (
                        <AnimatedCounter end={stat.value} />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://leetcode.com/u/chafleharsh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 inline-flex items-center group"
                >
                  View LeetCode Profile 
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </GlassCard>
          </FloatingCard>

          {/* GitHub Stats */}
          <FloatingCard delay={400}>
            <GlassCard className="p-10 h-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full mb-4">
                  <Github className="w-8 h-8 text-white" />
                  {githubStats.loading && <div className="ml-2 animate-spin">⟳</div>}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">GitHub Activity</h3>
                <p className="text-gray-400">Open Source Contributions</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: 'Repositories', value: githubStats.repos, color: 'text-blue-400', icon: '📁' },
                  { label: 'Stars Earned', value: githubStats.stars, color: 'text-yellow-400', icon: '⭐' },
                  { label: 'Followers', value: githubStats.followers, color: 'text-green-400', icon: '👥' },
                  { label: 'Following', value: githubStats.following, color: 'text-purple-400', icon: '🤝' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-4xl font-black mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                      {githubStats.loading ? '...' : <AnimatedCounter end={stat.value} />}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://github.com/Harshchafle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gray-200 inline-flex items-center group"
                >
                  View GitHub Profile 
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </GlassCard>
          </FloatingCard>
        </div>

        {/* Additional GitHub Insights */}
        <FloatingCard delay={600}>
          <div className="mt-12">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Development Insights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <div className="text-gray-400 mb-2">Total Commits</div>
                  <div className="w-8 h-8 mx-auto text-green-400">📈</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    <AnimatedCounter end={15} suffix="+" />
                  </div>
                  <div className="text-gray-400 mb-2">Pull Requests</div>
                  <div className="w-8 h-8 mx-auto text-blue-400">🔄</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    <AnimatedCounter end={1} suffix=" Year+" />
                  </div>
                  <div className="text-gray-400 mb-2">Active Coding</div>
                  <div className="w-8 h-8 mx-auto text-purple-400">⏰</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </FloatingCard>

        {githubStats.error && (
          <FloatingCard delay={800}>
            <div className="mt-8 text-center">
              <div className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-sm">
                  Unable to load live GitHub stats: {githubStats.error}
                </p>
                <p className="text-xs mt-2 text-gray-400">
                  Displaying cached data. Stats refresh every 5 minutes.
                </p>
              </div>
            </div>
          </FloatingCard>
        )}
      </div>
    </section>
  );
};

export default Stats;
